import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaChevronDown } from "react-icons/fa";
import { IoGridOutline, IoList } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Blogs from "../Blogs/Blogs";
import SectionTitle from "../SectionTitle/SectionTitle";
import PropertiesCart from "./PropertiesCart";

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const { isLoading, error, data = [], refetch } = useQuery({
        queryKey: ['data', search, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allproperty?search=${search}&sort=${sort}`);
            return res.data;
        }
    });

    const verifiedProperty = data?.filter(item => item?.verification_status === 'verified');

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
        refetch();
    };

    const handleSort = (sortOption) => {
        setSort(sortOption);
        refetch();
    };

    return (
        <section className="bg-gray-100">
            <Helmet>
                <title>All Properties - Next Estate Real Estate React Template</title>
            </Helmet>
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="All Properties"
                    Heading="Recommended For You"
                ></SectionTitle>

                <section>
                    <div className="bg-white flex items-center justify-between gap-2 p-2 mb-10">
                        <div className="flex gap-4">
                            <form onSubmit={handleSearch} className='flex items-center justify-between bg-gray-100'>
                                <input
                                    type="text"
                                    name='search'
                                    placeholder="Search"
                                    className="input input-bordered outline-none border-none rounded-none "
                                />
                                <button className="btn rounded-none">Search</button>
                            </form>

                            <details className="dropdown rounded-none">
                                <summary className="m-1 btn rounded-none text-base">Sort <FaChevronDown /></summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li><a onClick={() => handleSort('minprice')}>Min Price</a></li>
                                    <li><a onClick={() => handleSort('maxprice')}>Max Price</a></li>
                                </ul>
                            </details>
                        </div>

                        <div className="flex gap-2 pr-4 items-center">
                            <button className='text-xl rounded-none'><IoList /></button>
                            <button className='text-xl rounded-none'><IoGridOutline /></button>
                        </div>
                    </div>

                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {
                            verifiedProperty?.map(card => <PropertiesCart card={card} key={card._id}></PropertiesCart>)
                        }
                    </div>
                </section>
            </div>

            <Blogs></Blogs>
        </section>
    );
};

export default AllProperties;
