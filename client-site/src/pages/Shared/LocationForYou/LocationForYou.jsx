import 'swiper/css';
import React from 'react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from '../SectionTitle/SectionTitle';
import slider1 from '../../../assets/slider/slide_1.jpg'
import slider2 from '../../../assets/slider/slide_2.jpg'


const LocationForYou = () => {
    return (
        <div className="py-20 px-3 md:px-10 ">
            <SectionTitle Heading="Our Location For You" subHeading="EXPLORE CITIES"></SectionTitle>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
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
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
            >
                <SwiperSlide>
                    <div
                        className="h-[450px] md:h-[600px] flex items-end bg-green-400 rounded-2xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url(${slider1})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="pb-8 pl-8">
                            <p className="text-gray-200 font-Roboto">221 Property</p>
                            <h1 className="text-white text-2xl font-medium font-Merriweather">Cape Town, South Africa</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="h-[450px] md:h-[600px] flex items-end bg-green-400 rounded-2xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url(${slider2})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-rtext-whiteepeat',
                        }}
                    >
                        <div className="pb-8 pl-8">
                            <p className="text-gray-200 font-Roboto">221 Property</p>
                            <h1 className="text-white text-2xl font-medium font-Merriweather">Cape Town, South Africa</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="h-[450px] md:h-[600px] flex items-end bg-green-400 rounded-2xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url(${slider1})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-rtext-whiteepeat',
                        }}
                    >
                        <div className="pb-8 pl-8">
                            <p className="text-gray-200 font-Roboto">221 Property</p>
                            <h1 className="text-white text-2xl font-medium font-Merriweather">Cape Town, South Africa</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="h-[450px] md:h-[600px] flex items-end bg-green-400 rounded-2xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url(${slider2})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-rtext-whiteepeat',
                        }}
                    >
                        <div className="pb-8 pl-8">
                            <p className="text-gray-200 font-Roboto">221 Property</p>
                            <h1 className="text-white text-2xl font-medium font-Merriweather">Cape Town, South Africa</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="h-[450px] md:h-[600px] flex items-end bg-green-400 rounded-2xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.9) 130%), url(${slider1})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-rtext-whiteepeat',
                        }}
                    >
                        <div className="pb-8 pl-8">
                            <p className="text-gray-200 font-Roboto">221 Property</p>
                            <h1 className="text-white text-2xl font-medium font-Merriweather">Cape Town, South Africa</h1>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default LocationForYou;