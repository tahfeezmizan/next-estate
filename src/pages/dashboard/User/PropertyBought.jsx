import { MdDeleteOutline } from "react-icons/md";
import usePropertyBought from "../../../hooks/usePropertyBought";
import { Link } from "react-router-dom";

const PropertyBought = () => {
    const [refetch, boughtProperty] = usePropertyBought();

    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">My Bought Property <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{boughtProperty.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor text-center capitalize text-white text-xl">
                        <tr>
                            <th></th>
                            <th>Property image</th>
                            <th>Property title</th>
                            <th>Property location</th>
                            <th>agent name</th>
                            <th>offer Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            boughtProperty?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td><img src={item?.image} className="w-20 mx-auto" alt="" /></td>
                                <td> <div className="flex items-center gap-2">
                                    <h3>{item?.title}</h3>
                                    {
                                        item?.verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                                    }
                                </div></td>
                                <td>{item?.location}</td>
                                <td>{item?.agentname}</td>
                                <td>${item?.offeredAmound}</td>
                                <td>
                                    {
                                        item?.status === "pending" && "complete" ? <h2 className={`text-sm rounded-full capitalize text-white font-medium 
                                        ${item?.status === 'pending' && 'bg-yellow-500'} 
                                        ${item?.status === 'in progress' && 'bg-blue-500'} 
                                        ${item?.status === 'complete' && 'bg-green-500'} 
                                        ${item?.status === 'complete' && 'bg-green-500'} 
                                        ${item?.status === 'rejected' && 'bg-red-500'} `}>{item?.status}</h2>
                                            :
                                            <Link className="bg-primaryColor text-sm rounded-full capitalize text-white font-medium ">Pay</Link>
                                    }
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyBought;