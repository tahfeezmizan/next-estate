import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import singInBg from '../../assets/slider/singinBg.webp';
import UseAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import useAxisoCommon from "../../hooks/useAxisoCommon";

const SingUp = () => {
    const { user, singUpUser, userProfileUpdate, isLoading, logOut } = UseAuth();
    const axiosCommon = useAxisoCommon();
    const navigate = useNavigate();
    console.log('Sing Up form', user);

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
        const { name, email, photoURL, password } = data;
        console.log(email, password);

        singUpUser(email, password)
            .then(result => {
                userProfileUpdate(name, photoURL)
                    .then(async () => {
                        toast.success('User Register Sucessfully')
                        const userinfo = {
                            email,
                            name,
                            role: "guest",
                        };

                        // store user in bd with role
                        const res = await axiosCommon.post('/users', userinfo);
                    })
                logOut()
                navigate("/singin")
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
                <title>Sing Up - Next Estate Real Estate React Theme</title>
            </Helmet>
            <div className="w-2/4 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md rounded-2xl" >
                <div className="card shrink-0 w-full max-w-lg p-10 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-2xl font-Roboto text-white font-medium leading-8 ">Create an account</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input
                                type="name"
                                name="name"
                                placeholder="Enter Your Name"
                                className="input input-bordered rounded-none"

                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                        </div>
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
                                <span className="label-text text-white">Photo URL</span>
                            </label>
                            <input
                                type="photoURL"
                                name="photoURL"
                                placeholder="Enter Your photoURL"
                                className="input input-bordered rounded-none"

                                {...register("photoURL", { required: true })}
                            />
                            {errors.photoURL && <span className="text-xs text-red-500">Photo Url is required</span>}
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
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 6 characters"
                                        },
                                        validate: {
                                            hasUppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                            hasLowercase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                                            hasNumber: value => /[0-9]/.test(value) || "Password must have at least 1 Number"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-4 flex items-center"
                                >
                                    {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                                </button>
                            </div>
                            {errors.password && <span className="text-xs text-red-500">{errors?.password?.message}</span>}
                        </div>

                        <div className="form-control pt-5">
                            <button className="btn bg-primaryColor border-primaryColor hover:bg-transparent hover:border-primaryColor hover:text-primaryColor font-Roboto text-white text-base">
                                {isLoading ? <div className="animate-spin"><ImSpinner9 /></div> : "Register"}
                            </button>
                        </div>
                    </form>
                    <div className="text-center"><SocialLogin></SocialLogin></div>

                    <Link to="/singin" className=" hover:text-primaryColor font-bold pt-5 text-center">Back to login</Link>
                </div>
            </div>
        </div>
    );
};

export default SingUp;