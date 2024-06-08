import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { useState } from "react";
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import useAxisoCommon from "../../../../hooks/useAxisoCommon";
import SectionTitle from "../../SectionTitle/SectionTitle";

const UserReview = () => {
    const [data, setData] = useState([]);
    const axiosCommon = useAxisoCommon();

    useState(() => {
        axiosCommon.get('/reviews')
            .then(res => {
                setData(res.data)
            })
    }, [])

    return (
        <div className="bg-gray-100">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="FEEDBACK FROM BUYERS"
                    Heading="Clients Testimonials"
                >
                </SectionTitle>

                <section className="">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
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
                                spaceBetween: 40,
                            },
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {
                            data?.slice(0, 6)?.map(review => <SwiperSlide key={review?._id}>
                                <div className="h-72 p-10 overflow-hidden bg-white rounded-sm font-Roboto">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img className="w-12 border rounded-full" src={review?.image} alt="" />
                                        <div className="">
                                            <h2 className="font-semibold leading-8">{review?.name}</h2>
                                            <p className="text-sm leading-4 text-gray-500 font-normal">New York</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="font-medium leading-8">{review?.title}</h2>
                                        <p className="text-sm leading-6 text-gray-500 font-normal">{review?.description}</p>
                                    </div>
                                    <div className="">
                                        <Rating
                                            style={{ maxWidth: 100 }}
                                            value={review?.rating}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper >
                </section>
            </div >
        </div>
    );
};

export default UserReview;