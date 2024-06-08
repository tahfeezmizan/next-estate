import Properties from "../../Properties/Properties";
import Blogs from "../../Shared/Blogs/Blogs";
import Footer from "../../Shared/Footer/Footer";
import LocationForYou from "../../Shared/LocationForYou/LocationForYou";
import UserReview from "../../Shared/Reviews/UserReview/UserReview";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Properties></Properties>
            <LocationForYou></LocationForYou>
            <UserReview></UserReview>
            <Blogs></Blogs>
            <Footer></Footer>
        </>
    );
};

export default Home;