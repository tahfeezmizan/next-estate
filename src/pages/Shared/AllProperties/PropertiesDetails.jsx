import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";

const PropertiesDetails = () => {
    const [card, setCard] = useState([]);
    const { _id, title, image, location, pricerange, agentname, agentimage, verification_status } = card;
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/property/${id}`)
            .then(res => res.json())
            .then(data => {
                setCard(data)
                console.log(data);
            })
    }, [id]);
    return (
        <section className="mt-20">
            <div className="">
                <img src={image} className="w-full h-[600px] object-cover object-center" alt="" />
            </div>

            <section className="w-full lg:w-5/6 xl:w-8/12 mx-auto">
                <div className="flex justify-between">

                    <div className="">
                        <div className="flex gap-2 items-center font-Roboto mb-2">
                            <p className="bg-primaryColor text-white px-3 rounded-md">Salse</p>
                            <p className="bg-primaryColor text-white px-3 rounded-md">Villa</p>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}<span className='bg-gray-500 text-white text-sm rounded-full capitalize px-2 py-1 ml-2'>{verification_status}</span>                    </h2>
                        <p className=" flex items-center gap-2 text-gray-600"><span className="text-primaryColor"><CiLocationOn /></span>{location}</p>
                    </div>

                    <div className="flex justify-between items-end flex-col -mt-2 md:mt-9 pb-10">
                        <div className="text-primaryColor pb-2">
                            <h4 className='text-end text-base font-Roboto'>From</h4>
                            <p className="text-3xl font-Roboto font-medium">{pricerange}</p>
                        </div>
                        <button className="flex items-center gap-2 btn btn-sm font-Roboto hover:text-primaryColor"><FaRegHeart /> Favorite</button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default PropertiesDetails;