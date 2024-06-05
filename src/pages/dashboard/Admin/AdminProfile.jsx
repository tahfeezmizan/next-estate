import { useQuery } from '@tanstack/react-query';
import slider1 from '../../../assets/slider/slide_1.jpg'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    console.log(users);

    return (
        <div className="bg-gray-200 h-screen flex items-center justify-center">
            <div className="bg-white w-[600px] font-Roboto text-center">
                <div className="h-52 max-w-full" style={{
                    backgroundImage: `url(${slider1})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}></div>
                <img src={user?.photoURL} className='w-24 rounded-full border-4 border-blue-600 mx-auto -mt-12 mb-5' alt="" />
                <h2 className='text-3xl font-semibold capitalize'>{user?.displayName}</h2>
                {
                    users.slice(0, 1).map(user => <>
                        <p className="">{user?.role}</p>
                        <p className=""><span className='font-semibold '>User Id:</span> {user?._id}</p>
                    </>)
                }
            </div>
        </div>
    );
};

export default AdminProfile;
