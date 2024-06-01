import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SingInImage from '../../assets/slider/slide_2.jpg'
import singInBg from '../../assets/slider/singinBg.webp'

const SingIn = () => {
    // const { singInUser } = UseAuth();
    // const [disabled, setDisabled] = useState(true);
    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location?.state?.from?.pathname || '/';
    // console.log("login page location pathname", location.state);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        // console.log(email, password);

        // singInUser(email, password)
        //     .then(result => {
        //         const user = result.user;
        //         console.log(user);
        //         navigate(from, { replace: true })
        //         toast.success('User Sing In Sucessfully')
        //     })
    }
    return (
        <div className="h-screen py-20 flex flex-col items-center justify-center" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${singInBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <Helmet>
                <title>Sing In - Next Estate Real Estate React Theme</title>
            </Helmet>
            <div className="w-2/4 flex items-center justify-center text-white mx-auto shadow-2xl backdrop-blur-md rounded-2xl" >
                <div className="card shrink-0 w-full max-w-lg p-10 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-2xl font-Roboto font-medium leading-8 ">Sign into your account</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered rounded-none"

                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <div className="relative input input-bordered rounded-none flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="w-4/5"
                                    {...register("password", { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-4 flex items-center"
                                >
                                    {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                                </button>
                            </div>
                            {errors.password && <span className="text-xs text-red-500">Password is required</span>}
                        </div>

                        <div className="form-control pt-5">
                            <button className="btn bg-primaryColor hover:bg-transparent hover:border-primaryColor hover:text-primaryColor font-Roboto text-white text-base">Login</button>
                        </div>
                    </form>
                    {/* third party login method */}
                    <div className="text-center">
                        <div className="divider pb-3">or connected with</div>
                    </div>
                    <div className="">
                        {/* <SocialLogin></SocialLogin> */}
                    </div>

                    <h3 className="text-center pt-5">Need an account? <Link to="/singup" className="text-blue-600 hover:text-[#d01818] font-bold">Create Account</Link></h3>
                </div>
            </div>
        </div>
    );
};

export default SingIn;