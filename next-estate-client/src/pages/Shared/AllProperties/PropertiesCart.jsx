import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import verified from '../../../assets/slider/verifid.png';

const PropertiesCart = ({ card }) => {
    const { _id, title, image, location, minprice, maxprice, agentname, agentimage, verification_status } = card;

    return (
        <div className="bg-gray-50 dark:bg-slate-800 border rounded-xl flex justify-around flex-col hover:shadow-lg duration-500 overflow-hidden">
            <div className="h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out" src={image} alt="" />
            </div>
            <div className="p-5">
                <p className="flex text-base items-center gap-1 text-primaryColor leading-6"><span><CiLocationOn /></span>{location}</p>
                <div className="flex gap-2 items-center">
                    <h2 className="font-semibold text-lg font-Roboto leading-10">{title}</h2>
                    {
                        verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                    }
                </div>

                <p className='font-semibold text-lg pb-3'><span>${minprice}</span> - <span>${maxprice}</span></p>

                <div className="flex justify-between items-center ">
                    <div className="flex gap-4 items-center">
                        <img className="w-12 h-12 border rounded-full" src={agentimage} alt="" />
                        <div className="">
                            <h2 className="font-semibold leading-8">{agentname}</h2>
                        </div>
                    </div>
                    <Link to={`/properties/${_id}`} className="btn btn-sm text-primaryColor text-sm bg-[#e868221a] border-[#e868221a] hover:bg-primaryColor hover:text-white rounded-none">View Details</Link>
                </div>

            </div>
        </div>
    );
};

export default PropertiesCart;