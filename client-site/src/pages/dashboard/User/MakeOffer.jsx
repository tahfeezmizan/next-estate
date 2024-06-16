import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import verified from "../../../assets/slider/verifid.png"
import { toast } from "react-toastify";

const MakeOffer = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const [card, setCard] = useState();

    useEffect(() => {
        axiosSecure.get(`/property/${id}`)
            .then(res => {
                setCard(res.data)
            })
    }, [id]);

    if (!card) {
        return <p>Loading...</p>;
    }
    const { title, agentemail, image, location, maxprice, minprice, agentname, verification_status } = card;

    const handleOffer = (e) => {
        e.preventDefault();
        const form = e.target;
        const offerprice = form.offerprice.value;
        const buyerEmail = user?.email;
        const buyerName = user?.displayName;

        const today = new Date();
        const date = today.getTime();

        const offeredValue = {
            title,
            date,
            location,
            image,
            agentname,
            agentemail,
            verification_status,
            status: 'pending',
            offeredAmound: parseFloat(offerprice),
            buyerEmail,
            buyerName,
        }

        axiosSecure.post('/makeoffer', offeredValue)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Send Offere Request');
                }
            })
            .catch(error => {
                console.error('Error adding review:', error);
                toast.error('Failed to add review');
            });
    }


    return (

        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
                <p className="text-xl font-medium">Property Summary</p>
                <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <img className="m-2 w-40 rounded-md border object-cover object-center" src={image} alt="" />
                        <div className="flex w-full flex-col px-4 py-4">
                            <div className="flex gap-2 items-center">
                                <h2 className="font-semibold text-lg font-Roboto leading-10">{title}</h2>
                                {
                                    verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                                }
                            </div>
                            <span className="float-right text-gray-400">{location}</span>
                            <p className='font-semibold text-lg '><span className="rounded">
                                ${minprice}</span> - <span>${maxprice}
                                </span></p>
                            <h2 className="font-semibold leading-8"><span className="text-gray-400 ">Agent Name: </span>{agentname}</h2>

                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-gray-50 p-10 lg:mt-0">
                <p className="text-xl font-medium">Offer Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>

                <div className="">
                    <div className="flex gap-2 items-center">
                        <h2 className="font-semibold text-lg font-Roboto leading-10">{title}</h2>
                        {
                            verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                        }
                    </div>
                    <p className='font-semibold text-lg pb-3'><span className="rounded">
                        ${minprice}</span> - <span>${maxprice}
                        </span></p>

                    <p className="text-xl font-medium">Buyer Details</p>

                    <p className='font-semibold text-lg'><span className="rounded">{user?.displayName || 'No Name'}</span></p>
                    <p className='text-lg pb-3'><span className="rounded">{user?.email}</span></p>

                </div>
                <form onSubmit={handleOffer}>
                    <div className="">
                        <label htmlFor="card-holder" className="mt-4 mb-2 block  font-medium">Please Put Your Price?</label>
                        <div className="">
                            <input type="number" name="offerprice" placeholder="Please Put Your Price?" required className="input input-bordered w-full rounded-none " />
                        </div>
                    </div>

                    <button className="mt-4 mb-8 w-full rounded-md bg-primaryColor px-6 py-3 font-medium text-white">Send Offer</button>
                </form>
            </div>
        </div>
    );
};

export default MakeOffer;