const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PROT || 5000;

// midleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://next-estate-ccc96.web.app',
        'https://next-estate-ccc96.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const usersCollection = client.db('nextEstateDB').collection('users');
        const propertyCollection = client.db('nextEstateDB').collection('property');
        const reviewsCollection = client.db('nextEstateDB').collection('reviews');
        const wishlistCollection = client.db('nextEstateDB').collection('wishlist');
        const makeOfferCollection = client.db('nextEstateDB').collection('makeOffer');
        const blogsCollection = client.db('nextEstateDB').collection('blogs');
        const paymentsCollection = client.db('nextEstateDB').collection('payments');


        // jwt releted api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
            res.send({ token });
        });

        const verifyToken = (req, res, next) => {
            // console.log('user header', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'forbidden access' });
            }
            const token = req.headers.authorization.split(' ')[1]

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(403).send({ message: 'forbidden access' });
                }
                req.decoded = decoded;
                next();
            })
        }

        // use verify admin middleware
        const verifyAdmin = async (req, res, next) => {
        }

        // users apis

        // all user getting api
        app.get('/users', verifyToken, async (req, res) => {
            try {
                const result = await usersCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load users data:", error);
                res.status(500).send({
                    message: "Failed to load users data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // get user info by specific user email
        app.get('/users/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const result = await usersCollection.findOne({ email });
                res.send(result);
            } catch (error) {
                console.error('Error user info getting:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // users post api
        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                const query = { email: user?.email }
                const existingUser = await usersCollection.findOne(query);

                if (existingUser) {
                    return res.send({ message: "User Already Exist" })
                }
                const result = await usersCollection.insertOne(user);
                res.send(result);
            } catch (error) {
                console.error('Error submitting review:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // check user fasttime login or not and store user data in bd
        app.put('/user', async (req, res) => {
            const user = req.body;
            // check if user already exist in db
            const isExist = await usersCollection.findOne({ email: user?.email });
            if (isExist) {
                return res.send(isExist)
            }
            const option = { upsert: true };
            const query = { email: user?.email };
            const updatedDoc = {
                $set: {
                    ...user,
                    timestamp: Date.now(),
                }
            };
            const result = await usersCollection.updateOne(query, updatedDoc, option);
            res.send(result);
        });

        // set user role using email
        app.patch('/users/update/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const { role } = req.body;
                const query = { email };
                const updatedDoc = {
                    $set: { role }
                };
                const result = await usersCollection.updateOne(query, updatedDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        //update agent fraud 
        app.patch('/users/updatefraud/:email', verifyToken, async (req, res) => {
            try {
                const email = req.params.email;
                const { fraud } = req.body;
                const query = { email };
                const updatedDoc = {
                    $set: { fraud }
                };
                const result = await usersCollection.updateOne(query, updatedDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // delete a specifice user from db 
        app.delete('/users/:id', verifyToken, async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await usersCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.error('Error Deleting users:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // property getting api
        app.get('/property', async (req, res) => {
            try {
                const result = await propertyCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load property data:", error);
                res.status(500).send({
                    message: "Failed to load property data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // sort and search api
        app.get('/allproperty', async (req, res) => {
            try {
                const { search = '', sort = '' } = req.query;

                const query = {};
                if (search) {
                    query.location = { $regex: search, $options: 'i' };
                }

                let sortOption = {};
                if (sort === 'minprice') {
                    sortOption = { minprice: 1 }; 
                } else if (sort === 'maxprice') {
                    sortOption = { maxprice: -1 }; 
                }

                const result = await propertyCollection.find(query).sort(sortOption).toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load property data:", error);
                res.status(500).send({
                    message: "Failed to load property data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // property details page using id
        app.get('/property/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) }
                const result = await propertyCollection.findOne(query);
                res.send(result);
            } catch (error) {
                console.error("Failed to load property data:", error);
                res.status(500).send({
                    message: "Failed to load property data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // get agent added properties
        app.get('/properties/:email', async (req, res) => {
            try {
                const email = req.params.email
                const query = { agentemail: email }
                const result = await propertyCollection.find(query).toArray();

                res.send(result)
            } catch (error) {
                console.error("Failed to load property data:", error);
                res.status(500).send({
                    message: "Failed to load property data.",
                    error: error.message || "Internal Server Error"
                });
            }
        })

        // psot new property api
        app.post('/property', async (req, res) => {
            try {
                const property = req.body;
                const result = await propertyCollection.insertOne(property);
                res.send(result)
            } catch (error) {
                console.error('Error submitting property:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // properties item update api
        app.patch('/propertyupdate/:id', async (req, res) => {
            try {
                const item = req.body;
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) }
                const updatedDoc = {
                    $set: {
                        name: item.name,
                        price: item.price,
                        recipe: item.recipe,
                        category: item.category,
                        image: item.image,
                    }
                }
                const result = await propertyCollection.updateOne(filter, updatedDoc);
                res.send(result)
            } catch (error) {
                console.error("Error fetching menu:", error);
                res.status(500).send("Error fetching menu");
            }
        });

        // change property verify status
        app.put('/propertystatus/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { verification_status } = req.body;
                const query = { _id: new ObjectId(id) };
                const updatedDoc = {
                    $set: { verification_status }
                };

                const result = await propertyCollection.updateOne(query, updatedDoc);

                res.send(result);
            } catch (error) {
                console.error('Error updating property status:', error);
                res.status(500).send({ error: error.message });
            }
        });

        // change property verify status
        app.put('/propertyadvertise/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { advertise } = req.body;
                const query = { _id: new ObjectId(id) };
                const updatedDoc = {
                    $set: { advertise }
                };

                const result = await propertyCollection.updateOne(query, updatedDoc);

                res.send(result);
            } catch (error) {
                console.error('Error updating property status:', error);
                res.status(500).send({ error: error.message });
            }
        });

        // properties delete method
        app.delete('/properties/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await propertyCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.error('Error Deleting propery:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // properties delete method
        app.delete('/propertie/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await propertyCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.error('Error Deleting propery:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // reviews api
        app.get('/reviews', async (req, res) => {
            try {
                const result = await reviewsCollection.find().sort({ date: -1 }).toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load reviews data:", error);
                res.status(500).send({
                    message: "Failed to load reviews data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // get own reviews data by specific user
        app.get('/reviews/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const query = { userEmail: email };
                const result = await reviewsCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // post review 
        app.post('/reviews', async (req, res) => {
            try {
                const reviewItem = req.body;
                const result = await reviewsCollection.insertOne(reviewItem);
                res.send(result)
            } catch (error) {
                console.error('Error submitting review:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // reviews delete method
        app.delete('/reviews/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await reviewsCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.error('Error Deleting reviews:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        //wishlist api
        // get wishlist data
        app.get('/wishlist', async (req, res) => {
            try {
                const result = await wishlistCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load wishlist data:", error);
                res.status(500).send({
                    message: "Failed to load wishlist data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // get own reviews data by specific user
        app.get('/wishlist/:email', async (req, res) => {
            try {
                const email = req.params.email;

                const query = { userEmail: email };
                const result = await wishlistCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load wishlist data:", error);
                res.status(500).send({
                    message: "Failed to load wishlist data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        // wishlist item post
        app.post('/wishlist', async (req, res) => {
            try {
                const wishlistItem = req.body;

                const result = await wishlistCollection.insertOne(wishlistItem);
                res.send(result)
            } catch (error) {
                console.error('Error submitting wishlist:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // wishlist delete method
        app.delete('/wishlist/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await wishlistCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.error('Error Deleting wishlist:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // make offers apis
        app.get('/makeoffer', async (req, res) => {
            try {
                const result = await makeOfferCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load make offer data:", error);
                res.status(500).send({
                    message: "Failed to load make offer data.",
                    error: error.message || "Internal Server Error"

                });
            }
        });

        // get make offer data by specifice user 
        app.get('/makeoffer/:email', async (req, res) => {
            try {
                const email = req.params.email;

                const query = { buyerEmail: email };
                const result = await makeOfferCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error('Error submitting make offer:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // get make offer data for Payment specifice property 
        app.get('/offerpay/:id', async (req, res) => {
            try {
                const id = req.params.id;

                const query = { _id: new ObjectId(id) };
                const result = await makeOfferCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error('Error submitting make offer:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // get make offer data by specifice Agent 
        app.get('/offered/:email', async (req, res) => {
            try {
                const email = req.params.email;

                const query = { agentemail: email };
                const result = await makeOfferCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error('Error submitting make offer:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        })

        // make offer post api
        app.post('/makeoffer', async (req, res) => {
            try {
                const offerItem = req.body;

                const result = await makeOfferCollection.insertOne(offerItem);
                res.send(result);
            } catch (error) {
                console.error('Error submitting make offer:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });

        // -------------------
        // payment releted apis 
        // stripe payment apis
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);


            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });


        //  agent propery sould apis
        app.get('/payments/:email', async (req, res) => {
            try {
                const email = req.params.email

                const query = { agentemail: email }
                const result = await paymentsCollection.find(query).toArray();

                res.send(result)
            } catch (error) {
                console.error("Failed to load make offer data:", error);
                res.status(500).send({
                    message: "Failed to load make offer data.",
                    error: error.message || "Internal Server Error"

                });
            }
        });

        // post property payment history
        app.post('/payments', async (req, res) => {
            try {
                const payment = req.body;
                const paymentResult = await paymentsCollection.insertOne(payment);

                res.send({ paymentResult })
            } catch (error) {
                console.error('Error submitting property:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });


        // update propety status using email
        app.patch('/offeredaccept/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { status, transactionId } = req.body;
                const query = { _id: new ObjectId(id) };
                const updatedDoc = {
                    $set: { status, transactionId }
                };
                const result = await makeOfferCollection.updateOne(query, updatedDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // all user getting api
        app.get('/blogs', async (req, res) => {
            try {
                const result = await blogsCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load blogs data:", error);
                res.status(500).send({
                    message: "Failed to load blogs data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });






        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Next Estate Server Is Running')
})

app.listen(port, () => {
})
