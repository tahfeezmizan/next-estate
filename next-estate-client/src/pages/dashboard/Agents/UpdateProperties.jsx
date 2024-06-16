import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UseAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IMGBB_API_KEY } from '../../../constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProperties = () => {
    const { user } = UseAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [propertyData, setPropertyData] = useState([])

    useEffect(() => {
        axiosSecure.get(`/property/${id}`)
            .then(res => {
                setPropertyData(res.data);
            })
    }, []);

    const handleAddProperty = async e => {
        e.preventDefault();
        const email = user?.email;
        const agentname = user?.displayName;
        const agentimage = user?.photoURL;

        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const minprice = form.minprice.value;
        const maxprice = form.maxprice.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image)

        // image upload
        const { data } = await axiosSecure.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData)

        const propertyItem = {
            email,
            agentname,
            agentimage,
            title,
            image,
            minprice: parseFloat(minprice),
            maxprice: parseFloat(maxprice),
            location,
            description,
            verification_status: 'pending',
            image: data?.data?.display_url,
        }

        // send data to bd and store 
        const propertySend = await axiosSecure.patch(`/propertyupdate/${id}`, propertyItem)
            .then(res => {
                if (res?.data?.modifiedCount) {
                    toast.success('Update Property Sucessfully')
                    navigate('/dashboard/myaddedproperties')
                }
            })

    }
    return (
        <section className="py-10">
            <Helmet>
                <title>Update Properties - Next Estate Real Estate React Template</title>
            </Helmet>
            <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
                <div className=" mx-auto rounded-lg p-12 font-Roboto">
                    <h1 className="text-2xl md:text-3xl font-bold pb-6">Add New Properties</h1>
                    <form onSubmit={handleAddProperty}>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 w-full mb-4">
                                <label className="md:text-lg font-medium">Property Title</label><br />
                                <input
                                    type="text" name="title"
                                    placeholder="Property Title"
                                    defaultValue={propertyData?.title}
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 w-full mb-4">
                                <label className="md:text-lg font-medium">Location</label> <br />
                                <input
                                    type="text" name="location"
                                    placeholder="Location"
                                    defaultValue={propertyData?.location}
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Min Price</label> <br />
                                <input
                                    type="number" name="minprice"
                                    placeholder="$ Property Min Price"
                                    defaultValue={propertyData?.minprice}
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Max Price</label> <br />
                                <input
                                    type="number" name="maxprice"
                                    placeholder="$ Property Max Price"
                                    defaultValue={propertyData?.maxprice}
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className=" space-y-2 mb-4">
                            <label className="md:text-lg font-medium block">Property Details</label>
                            <textarea
                                rows={4}
                                name='description'
                                defaultValue={propertyData?.description}
                                placeholder="Property Details message minimum 200 word"
                                className="textarea textarea-bordered rounded-none w-full"
                                required></textarea>
                        </div>

                        <div className="flex-1 space-y-2 mb-4">
                            <input type="file"
                                id='image'
                                name='image'
                                accept='image/*'
                                className="file-input file-input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control my-6">
                            <button className="btn btn-outline bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none px-10 text-xl text-white">Update Property</button>
                        </div>
                    </form>
                </div >
            </div >
        </section>
    );
};

export default UpdateProperties;