import useProperties from '../../../hooks/useProperties';
import { MdDeleteOutline } from 'react-icons/md';

const ManageProperties = () => {
    const [data] = useProperties();

    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Manage All Properties<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{data.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            <th></th>
                            <th>property title</th>
                            <th>Property location</th>
                            <th>agent name</th>
                            <th>agent email</th>
                            <th>price range</th>
                            <th>Status</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            data?.map((property, index) => <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property?.title}</td>
                                <td>{property?.location}</td>
                                <td>{property?.agentname}</td>
                                <td>{property?.userEmial}</td>
                                <td>{property?.pricerange}</td>
                                <td>{property?.verification_status}</td>

                                <td >
                                    <button
                                        onClick={() => handleDelete(property?._id)}
                                        className="text-3xl">
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;