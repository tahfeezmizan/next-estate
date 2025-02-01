import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import verified from '../../../assets/slider/verifid.png';
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const Advertisement = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://next-estate-server.vercel.app/property')
            .then(response => response.json())
            .then(json => (setData(json)))
    }, [])

    const advertised = data?.filter(item => item.advertise === 'true');

    return (
        <div className="">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="EXCLUSIVE DEALS"
                    Heading="Advertised Luxury Property"
                ></SectionTitle>

                <section className="">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {
                            advertised?.slice(0, 6)?.map(item => (
                                <SwiperSlide key={item._id}>
                                    <div className="bg-gray-50 dark:bg-slate-800 border rounded-xl flex justify-around flex-col hover:shadow-lg duration-500 overflow-hidden">
                                        <div className="h-64 overflow-hidden">
                                            <p className="absolute top-4 left-4 p-1 px-3 z-10 bg-primaryColor text-white">{item?.advertise === 'true' && 'advertised'}</p>
                                            <img className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out" src={item?.image} alt="" />
                                        </div>

                                        <div className="p-5">
                                            <p className="flex items-center gap-1 text-primaryColor leading-6"><span><CiLocationOn /></span>{item?.location}</p>
                                            <h2 className="font-semibold text-lg font-Roboto ">{item?.title}</h2>
                                            <div className="flex gap-2 items-center pb-3">
                                                <p className='font-semibold text-lg'><span className="rounded">${item.minprice}</span> - <span>${item.maxprice}</span></p>
                                                {
                                                    item?.verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                                                }
                                            </div>

                                            <Link to={`/properties/${item?._id}`} className="btn btn-sm text-primaryColor text-sm bg-[#e868221a] border-[#e868221a] hover:bg-primaryColor hover:text-white rounded-none">View Details</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </section>
            </div>
        </div>
    );
};

export default Advertisement;
