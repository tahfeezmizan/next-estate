

const MySoldProperties = () => {
    return (
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Requested Property <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white"></span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-white text-xl">
                        <tr>
                            <th></th>
                            <th>Property title</th>
                            <th>Property location</th>
                            <th>Buyer name</th>
                            <th>Buyer email</th>
                            <th>Offer Price</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            property?.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <h3>{item?.title}</h3>
                                            {
                                                item?.verification_status === 'verified' && <img className='w-6' src={verified} alt="Verified" />
                                            }
                                        </div>
                                    </td>
                                    <td>{item?.location}</td>
                                    <td>{item?.buyerName}</td>
                                    <td>{item?.buyerEmail}</td>
                                    <td>${item?.offeredAmound}</td>                                    
                                </tr>
                            ))
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperties;