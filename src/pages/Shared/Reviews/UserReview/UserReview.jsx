import { useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';

const UserReview = () => {
    const [data, setData] = useState([]);

    useState(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data);
            })
    }, [])

    return (
        <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20">

            <SectionTitle
                subHeading="Latest Reviews"
                Heading="User Review"
            >
            </SectionTitle>

            <section>
                {
                    data?.map(data => {
                        <>
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
                                <SwiperSlide>
                                    <div
                                        className="h-[450px] md:h-[500px] flex items-end bg-green-400 rounded-2xl"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url()`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        <h1 className="text-4xl font-bold pb-8 pl-8">{data?.name}</h1>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </>
                    })
                }
            </section>

        </div>
    );
};

export default UserReview;