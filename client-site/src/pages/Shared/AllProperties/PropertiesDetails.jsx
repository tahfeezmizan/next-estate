import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart, FaShower } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCarOutline } from "react-icons/io5";
import { MdCropLandscape } from "react-icons/md";
import { RiSofaLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import verified from '../../../assets/slider/verifid.png';
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const PropertiesDetails = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const [data, setData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [card, setCard] = useState();

    const userEmail = user?.email;
    const userName = user?.displayName;
    const userPhoto = user?.photoURL;

    useEffect(() => {
        axiosSecure.get(`/property/${id}`)
            .then(res => {
                setCard(res.data)
            })
    }, [id]);

    // display review
    useState(() => {
        axiosSecure.get('/reviews')
            .then(res => {
                setData(res.data)
            })
    }, [])

    // add reviews from user
    const handleAddReview = e => {
        e.preventDefault();

        const today = new Date();
        const date = today.getTime();
        // const date = today.toLocaleDateString();

        const form = e.target;
        const title = form.title.value;
        const rating = form.rating.value;
        const message = form.message.value;

        const reviewValue = {
            propertyId: id,
            agentname,
            userEmail,
            userName,
            userPhoto,
            title,
            message,
            rating,
            date,
        }
        // console.log(reviewValue)

        axiosSecure.post('/reviews', reviewValue)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Review Added Successfully');
                }
            })
            .catch(error => {
                console.error('Error adding review:', error);
                toast.error('Failed to add review');
            });
    }

    // property add to wishlist 
    const handleAddToWishlist = () => {
        const wishListData = {
            userEmail,
            userName,
            propertyId: id,
            image,
            title,
            location,
            agentname,
            agentimage,
            minprice,
            maxprice,
            verification_status,
        }
        // console.log(wishListData);

        axiosSecure.post('/wishlist', wishListData)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success(`${title} added to Wishlist`);
                }
            })
    }

    if (!card) {
        return <p>Loading...</p>;
    }
    const { title, image, location, minprice, maxprice, agentname, agentimage, verification_status } = card;

    return (
        <section className="bg-gray-100">
            <Helmet>
                <title>Properties Details - Next Estate Real Estate React Template</title>
            </Helmet>
            <div className="">
                <img src={image} className="w-full h-[650px] object-cover object-center" alt="" />
            </div>

            <section className="w-full lg:w-5/6 xl:w-8/12 py-20 mx-auto">
                <div className="flex justify-between ">
                    <div className="">
                        <div className="flex gap-2 items-center font-Roboto mb-2">
                            <p className="bg-primaryColor text-white px-3 rounded-md">Sales</p>
                            <p className="bg-primaryColor text-white px-3 rounded-md">Villa</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
                            {
                                verification_status === 'verified' && <img className='w-8 ' src={verified} alt="" />
                            }
                        </div>
                        <p className="flex items-center gap-2 text-gray-600">
                            <span className="text-primaryColor"><CiLocationOn /></span>{location}
                        </p>
                    </div>

                    <div className="flex justify-between items-end flex-col -mt-2 md:mt-9 pb-10">
                        <div className="text-primaryColor pb-2">
                            <h4 className='text-end text-base font-Roboto'>From</h4>
                            <p className="text-3xl font-Roboto font-medium"><span>${minprice}</span> - <span>${maxprice}</span></p>
                        </div>
                        <button
                            onClick={() => handleAddToWishlist(card)}
                            title="Add To Wishilist"
                            className="flex items-center gap-2 btn btn-sm font-Roboto hover:text-primaryColor">
                            <FaRegHeart /> Favorite
                        </button>
                    </div>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
                    <div className="col-span-4">
                        <div className="bg-white p-8 rounded-md mb-8 ">
                            <h3 className="text-lg font-medium font-Roboto leading-8">Overview</h3>
                            <div className="flex justify-between items-center text-center pt-2">
                                <p className="text-base font-Roboto flex flex-col justify-between items-center text-center"><span className="text-lg"><RiSofaLine /></span> 5 Bedrooms</p>
                                <p className="text-base font-Roboto flex flex-col justify-between items-center text-center"><span className="text-lg"><FaShower /></span> 3 Bathrooms</p>
                                <p className="text-base font-Roboto flex flex-col justify-between items-center text-center"><span className="text-lg"><IoCarOutline /></span> 1 Garages</p>
                                <p className="text-base font-Roboto flex flex-col justify-between items-center text-center"><span className="text-lg"><MdCropLandscape /></span> 250 ft2</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-md bg-white mb-8">
                            <div className="">
                                <div className="mb-6">
                                    <h2 className='text-lg font-medium font-Roboto leading-8 mb-4'>Description</h2>
                                    <p className="text-gray-400">Beautiful, updated, ground level Co-op apartment in the desirable Bay Terrace neighborhood. This home features hardwood floors throughout, brand new bathrooms, newer EIK, modern front-load washer/dryer, full dining room, large living area, 3 spacious bedrooms and plenty of storage. Master bedroom includes both a standard closet and custom closet wall unit. Large windows face many directions for tons of natural light.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-md bg-white mb-8">
                            <h2 className='text-lg font-medium font-Roboto leading-8 mb-4'>Feature</h2>

                            <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                                <div className="flex-1">
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Air Conditioning</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Barbeque</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>ryer</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Gym</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Laundry</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Lawn</p>
                                </div>

                                <div className="flex-1">
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Microwave</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Outdoor Shower</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Refrigerator</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Sauna</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Security</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Swimming Pool</p>
                                </div>

                                <div className="flex-1">
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>TV Cable</p>
                                    <p className="flex mb-2 items-center gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Washer</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>WiFi</p>
                                    <p className="flex  items-centernter gap-2 text-lg text-[#595960]"><span className="text-primaryColor"><IoMdCheckmarkCircleOutline /></span>Window Coverings</p>
                                </div>
                            </div>
                        </div>

                        {/* review section  */}
                        <section className="bg-white p-8 rounded-md mb-8 ">
                            <div className="flex justify-between items-start">
                                <h2 className='text-lg font-medium font-Roboto leading-8 mb-4'>Review</h2>

                                {/* review  */}
                                <button className="btn btn-sm text-primaryColor text-sm bg-[#e868221a] border-[#e868221a] hover:bg-primaryColor hover:text-white rounded-none" onClick={() => document.getElementById('my_modal_3').showModal()}>Leave A Review</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box p-10">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Review</h3>
                                        <p className="">{title}</p>

                                        <div className="">
                                            <form onSubmit={handleAddReview} className="">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input
                                                        type="title"
                                                        name="title"
                                                        placeholder="Enter Your Email"
                                                        className="input input-bordered rounded-none"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Rating</span>
                                                    </label>
                                                    <select
                                                        name="rating"
                                                        className="select select-bordered rounded-none"
                                                        defaultValue="">
                                                        <option value="" disabled>
                                                            rating
                                                        </option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="3">3.5</option>
                                                        <option value="4">4</option>
                                                        <option value="4">4.5</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>

                                                <div className="form-control mb-5">
                                                    <label className="label">
                                                        <span className="label-text ">Review</span>
                                                    </label>
                                                    <textarea
                                                        name='message'
                                                        placeholder="Write a Review"
                                                        className="textarea textarea-bordered rounded-none w-full"
                                                    ></textarea>
                                                </div>

                                                <button className="btn bg-primaryColor border-primaryColor hover:bg-transparent hover:border-primaryColor hover:text-primaryColor font-Roboto text-white text-base">Review</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>

                            <Swiper
                                slidesPerView={2}
                                spaceBetween={30}
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
                                                <img className="w-12 h-12 border rounded-full" src={review?.userPhoto} alt="" />
                                                <div className="">
                                                    <h2 className="font-semibold leading-8">{review?.userName}</h2>
                                                    <p className="text-sm leading-4 text-gray-500 font-normal">New York</p>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h2 className="font-medium leading-8">{review?.title}</h2>
                                                <p className="text-sm leading-6 text-gray-500 font-normal">{review?.message}</p>
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
                    </div>


                    <div className="col-span-2">
                        <div className="bg-white p-8 rounded-md">
                            <div className="flex items-center text-center gap-6 mb-5">
                                <img src={image} className="w-24" alt="" />
                                <div className="font-Roboto">
                                    <p className="text-lg font-semibold">{agentname}</p>
                                    <p className="text-base">sales executive</p>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold mb-3">Information Contact</h1>

                            <div className="">
                                <p className="text-[#595960] text-lg font-medium flex flex-col gap-2 mb-2 ">Email< span className='font-normal text-gray-500'> contact@triprex.com</span></p>
                                <p className="text-[#595960] text-lg font-medium flex flex-col gap-2 mb-2 ">Website< span className='font-normal text-gray-500'> triprex.com</span></p>
                                <p className="text-[#595960] text-lg font-medium flex flex-col gap-2 mb-6 ">Phone< span className='font-normal text-gray-500'>  +6580009999</span></p>
                                <p className="text-[#595960] text-lg font-medium flex flex-col gap-2 mb-6 ">Fax< span className='font-normal text-gray-500'>  +123456789</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </section >
    );
};

export default PropertiesDetails;
