import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxisoCommon from "../../../hooks/useAxisoCommon";
import { toast } from "react-toastify";

const SocialLogin = () => {
    const { user, googleLogin } = UseAuth()
    const axiosCommon = useAxisoCommon();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    // console.log("login page location pathname", location.state);
    return (
        <div>
            <button
                onClick={() => googleLogin()
                    .then(result => {
                        toast.success('Congrs! Google Login Sucessfull');

                        const userinfo = {
                            email: result?.user?.email,
                            name: result?.user?.displayName,
                            role: "guest",
                        };
                        axiosCommon.post('/users', userinfo)
                            .then(res => {
                                console.log(res.data);
                            })
                        navigate(from);
                    })
                    .catch((error) => {
                        const errorText = error.message;
                        console.log(errorText)
                        const errorMessage = errorText.slice(22, 40);
                        toast.error(errorMessage)
                    })
                }
                className='btn text-lg w-80 mx-auto rounded-3xl px-6 bg-transparent hover:bg-transparent text-white '><FcGoogle /> Sing in With Google
            </button>
        </div>
    );
};

export default SocialLogin;