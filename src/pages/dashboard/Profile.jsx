import { useEffect, useState } from 'react';
import slider1 from '../../assets/slider/slide_1.jpg'
import UseAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { toast } from 'react-toastify';

const Profile = () => {
    const [role] = useRole();
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const { user, userProfileUpdate } = UseAuth();
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let updatedProfile = {
            displayName,
            email,
            photoURL
        };

        userProfileUpdate(displayName, photoURL)
            .then((result) => {
                toast.success('Profile updated successfully!');
                // console.log(result);
            })
            .catch((error) => {
                // console.error('Error updating profile:', error);
                toast.error('Failed to update profile. Please try again.');
            });
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="bg-gray-200 h-screen flex items-center justify-center px-3 md:px-3">
            <div className="bg-white  w-[800px] font-Roboto text-center pb-5">
                <div className="h-52 max-w-full" style={{
                    backgroundImage: `url(${slider1})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}></div>
                <form onSubmit={handleUpdateProfile} >
                    <img src={user?.photoURL} className='w-24 h-24 object-cover object-center rounded-full border-4 border-blue-600 mx-auto -mt-12 mb-3' alt="" />
                    <h2 className='text-3xl font-semibold capitalize leading-snug pb-2'>{user?.displayName}</h2>
                    <p className="bg-primaryColor rounded w-16 font-bold text-white py-1 capitalize mx-auto mb-2">{role}</p>

                    <div className="flex flex-col md:flex-row justify-between gap-4 p-5">
                        <div className="text-start space-y-2">
                            <p className=""><span className='font-semibold '>User Id:</span> {user?.uid}</p>
                            <p className=""><span className='font-semibold '>Email:</span> {user?.email}</p>
                        </div>

                        <div className="text-start">
                            <label htmlFor="displayName" className="block font-medium">Display Name:</label>
                            <input
                                type="text"
                                id="displayName"
                                placeholder='Change Name'
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full border rounded-md p-2 mb-4"
                            />

                            <label htmlFor="photoURL" className="block font-medium">Photo URL:</label>
                            <input
                                type="text"
                                id="photoURL"
                                placeholder='Add New Photo'
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="w-full border rounded-md p-2 mb-4"
                            />

                            <button type="submit" className="btn btn-sm bg-primaryColor border-none rounded-none text-white px-4 sm:px-6 lg:px-10 text-base sm:text-xl">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Profile;