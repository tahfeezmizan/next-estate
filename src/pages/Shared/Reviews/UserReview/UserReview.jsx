import { useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';
import '@smastrom/react-rating/style.css'
import { Rating } from "@smastrom/react-rating";

const UserReview = () => {
    const [data, setData] = useState([]);

    useState(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setData(data)
                // console.log(data);
            })
    }, [])

    return (
        <div className="bg-gray-100">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20">
                <SectionTitle
                    subHeading="FEEDBACK FROM BUYERS"
                    Heading="Clients Testimonials"
                >
                </SectionTitle>

                <section className="">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {
                            data?.map(review => <SwiperSlide key={review?._id}>
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