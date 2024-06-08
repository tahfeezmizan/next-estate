import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';
import useProperties from "../../../hooks/useProperties";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import verified from '../../../assets/slider/verifid.png'

const Advertisement = () => {
    const [data] = useProperties();

    return (
        <div className="">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="EXCLUSIVE DEALS"
                    Heading="Featured Luxury Property"
                ></SectionTitle>

                <section className="">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
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
                            data?.slice(0, 6)?.map(item => (
                                <SwiperSlide key={item._id}>
                                    <div className="bg-gray-50 dark:bg-slate-800 border rounded-xl flex justify-around flex-col hover:shadow-lg duration-500 overflow-hidden">
                                        <div className="h-64 overflow-hidden">
                                            <img className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out" src={item?.image} alt="" />
                                        </div>
                                        <div className="p-5">
                                            <p className="flex items-center gap-1 text-primaryColor leading-6"><span><CiLocationOn /></span>{item?.location}</p>
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
