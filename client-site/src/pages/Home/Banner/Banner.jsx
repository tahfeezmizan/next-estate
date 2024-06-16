import slider1 from '../../../assets/slider/slide_1.jpg'
import slider2 from '../../../assets/slider/slide_2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Helmet } from 'react-helmet';


const Banner = () => {
    return (
        <>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper homeBanner">
                <Helmet>
                    <title>Home - Next Estate Real Estate React</title>
                </Helmet>
                <SwiperSlide
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slider1})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}>
                    <div className="h-full  flex items-center"  >
                        <div className="w-8/12 text-center mx-auto text-white ">
                            <h1 className='text-2xl md:text-6xl px-1 md:px-10 pb-5 md:pb-10 font-bold uppercase'>Discover Your Perfect Home</h1>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slider2})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}>
                    <div className="h-full  flex items-center"  >
                        <div className="w-8/12 text-center mx-auto text-white ">
                            <h1 className='text-2xl md:text-6xl px-1 md:px-10 pb-5 md:pb-10 font-bold uppercase'>Discover Your Perfect Home</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slider2})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}>
                    <div className="h-full  flex items-center"  >
                        <div className="w-8/12 text-center mx-auto text-white ">
                            <h1 className='text-2xl md:text-6xl px-1 md:px-10 pb-5 md:pb-10 font-bold uppercase'>Discover Your Perfect Home</h1>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Banner;