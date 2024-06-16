import { toast } from "react-toastify";
import { IMGBB_API_KEY } from "../../../constant";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const AddProperty = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: allUser = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const handleAddProperty = async e => {
        e.preventDefault();

        if (allUser.fraud) {
            toast.error('Your account has been flagged for fraudulent activity. You cannot add new properties.');
            return;
        }

        const agentemail = user?.email;
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
            agentemail,
            agentname,
            agentimage,
            title,
            image,
            location,
            minprice: parseFloat(minprice),
            maxprice: parseFloat(maxprice),
            description,
            verification_status: 'pending',
            advertise: false,
            image: data?.data?.display_url,
        }
        
        const propertySend = await axiosSecure.post('/property', propertyItem)
        if (propertySend?.data?.insertedId) {
            toast.success('Added New Propety')
            form.reset()
        }
    }

    return (
        <section className="py-10">
            <Helmet>
                <title>Add New Properties - </title>
            </Helmet>
            <div className="w-full md:w-8/12 mx-auto">
                <div className=" mx-auto rounded-lg p-12 font-Roboto">
                    <h1 className="text-2xl md:text-3xl font-bold pb-6">Add New Properties</h1>
                    <form onSubmit={handleAddProperty}>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 w-full mb-4">
                                <label className="md:text-lg font-medium">Property Title</label><br />
                                <input
                                    type="text" name="title"
                                    placeholder="Property Title"
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 w-full mb-4">
                                <label className="md:text-lg font-medium">Location</label> <br />
                                <input
                                    type="text" name="location"
                                    placeholder="Location"
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
                                    className="input input-bordered rounded-none w-full"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Max Price</label> <br />
                                <input
                                    type="number" name="maxprice"
                                    placeholder="$ Property Max Price"
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
                                placeholder="Property Details message minimum 200 word                                "
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
                            <button className="btn btn-outline bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none px-10 text-xl text-white">Add Property</button>
                        </div>
                    </form>
                </div >
            </div >
        </section>
    );
};

export default AddProperty;