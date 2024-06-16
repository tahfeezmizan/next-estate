import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/useAuth";
import singInBg from '../../assets/slider/singinBg.webp';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SingIn = () => {
    const { singIn, isLoading } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
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
        singIn(email, password)
            .then(result => {
                console.log(result);
                const user = result.user;
                toast.success('User Sing In Sucessfully')
                navigate(from, { replace: true })
            })
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
            <div className="w-2/4 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md rounded-2xl" >
                <div className="card shrink-0 w-full max-w-lg p-10 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-2xl font-Roboto text-white font-medium leading-8 ">Sign into your account</h1>
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
                            <button className="btn bg-primaryColor border-primaryColor hover:bg-transparent hover:border-primaryColor hover:text-primaryColor font-Roboto text-white text-base">{isLoading ? <div className="animate-spin"><ImSpinner9 /></div> : "Login"}</button>
                        </div>
                    </form>
                    <div className="text-center"><SocialLogin></SocialLogin></div>

                    <Link to="/singup" className="text-white hover:text-primaryColor font-bold pt-5 text-center">Register here!</Link>
                </div>
            </div>
        </div>
    );
};

export default SingIn;