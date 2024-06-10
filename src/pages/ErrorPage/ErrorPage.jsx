
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='w-full lg:w-11/12 xl:w-8/12 mx-auto px-4 md:px-6 lg:px-0 py-10'>
            <Helmet>
                <title>404 Error Page - Next Estate Real Estate React Template</title>
            </Helmet>
            <div className="flex flex-col h-auto justify-center items-center">
                <h1 className="text-[340px] font-Merriweather font-semibold text-gray-300">404 </h1>
                <p className="text-5xl font-medium -mt-16 pb-6 font-Roboto">Oops... It looks like you ‘re lost !</p>
                <p className="text-lg font-Roboto pb-5 text-gray-400">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                <Link to="/" className="btn bg-primaryColor text-white hover:bg-primaryColor text-lg font-Merriweather uppercase px-8 rounded-none">Back To Home page</Link>
            </div>
        </div>
    );
};

export default ErrorPage;