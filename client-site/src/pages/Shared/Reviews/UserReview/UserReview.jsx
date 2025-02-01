import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { useEffect, useState } from "react";
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosCommon from "../../../../hooks/useAxisoCommon";

const UserReview = () => {
    const [data, setData] = useState([]);
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/reviews')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setData(res.data);
                } else {
                    setData([]);
                }
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
                setData([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="FEEDBACK FROM BUYERS"
                    Heading="Clients Testimonials"
                />

                <section>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 40 },
                        }}
                        freeMode={true}
                        pagination={{ clickable: true }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {data.map(review => (
                            <SwiperSlide key={review._id}>
                                <div className="h-72 p-10 overflow-hidden bg-white rounded-sm font-Roboto">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img className="w-12 h-12 border rounded-full" src={review?.userPhoto} alt="" />
                                        <div>
                                            <h2 className="font-semibold leading-8">{review?.userName}</h2>
                                            <p className="text-sm leading-4 text-gray-500 font-normal">New York</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="font-medium leading-8">{review?.title}</h2>
                                        <p className="text-sm leading-6 text-gray-500 font-normal">{review?.message}</p>
                                    </div>
                                    <div>
                                        <Rating style={{ maxWidth: 100 }} value={review?.rating} readOnly />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </div>
        </div>
    );
};

export default UserReview;
