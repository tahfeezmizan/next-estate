import slider1 from '../../assets/slider/slide_1.jpg'
import UseAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Profile = () => {
    const { user } = UseAuth()
    const [role] = useRole();
    
    return (
        <div className="bg-gray-200 h-screen flex items-center justify-center px-3 md:px-0">
            <div className="bg-white w-[600px] font-Roboto text-center pb-5">
                <div className="h-52 max-w-full" style={{
                    backgroundImage: `url(${slider1})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}></div>
                <img src={user?.photoURL} className='w-24 rounded-full border-4 border-blue-600 mx-auto -mt-12 mb-3' alt="" />
                <h2 className='text-3xl font-semibold capitalize leading-snug pb-2'>{user?.displayName}</h2>
                <p className="bg-primaryColor rounded w-16 font-bold text-white py-1 capitalize mx-auto mb-2">{role}</p>
                <p className=""><span className='font-semibold '>User Id:</span> {user?.uid}</p>
                <p className=""><span className='font-semibold '>User Id:</span> {user?.email}</p>
            </div>
        </div >
    );
};

export default Profile;