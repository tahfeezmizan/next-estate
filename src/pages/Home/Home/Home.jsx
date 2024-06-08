import Footer from "../../Shared/Footer/Footer";
import UserReview from "../../Shared/Reviews/UserReview/UserReview";
import Advertisement from "../Advertisement/Advertisement";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Advertisement></Advertisement>
            {/* <AllProperties></AllProperties> */}
            <UserReview></UserReview>
            <Footer></Footer>
        </>
    );
};

export default Home;