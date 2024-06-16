import { Link } from "react-router-dom";
import usePropertyBought from "../../../hooks/usePropertyBought";
import verified from '../../../assets/slider/verifid.png'

const PropertyBought = () => {
    const [refetch, boughtProperty] = usePropertyBought();

    return (
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">My Bought Property <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{boughtProperty.length}</span></h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-white text-xl">
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
                    <tbody className="">
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
                                    {item?.status === 'pending' && (
                                        <h2 className="btn btn-sm px-5 text-sm rounded-full uppercase text-white font-medium bg-yellow-400 hover:bg-yellow-500">
                                            {item?.status}
                                        </h2>
                                    )}
                                    {item?.status === 'accepted' && (
                                        <Link to={`/dashboard/payment/${item?._id}`} className="btn btn-sm px-5 bg-green-500 hover:bg-green-600 text-sm rounded-full text-white font-medium uppercase">
                                            Pay
                                        </Link>
                                    )}
                                    {item?.status === 'rejected' && (
                                        <h2 className="btn btn-sm px-5 text-sm rounded-full uppercase text-white font-medium bg-red-500 hover:bg-red-600">
                                            {item?.status}
                                        </h2>
                                    )}
                                    {item?.status === 'bought' && (
                                        <div className="">
                                            <p className="pt-2 font-base" title="Transaction Id">{item?.transactionId}</p>
                                            <h2 className="btn btn-sm px-5 text-sm rounded-full uppercase text-white font-medium bg-blue-500 hover:bg-blue-600">
                                                {item?.status}
                                            </h2> <br />
                                        </div>
                                    )}
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