import AllProperties from "../../Shared/AllProperties/AllProperties";
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
        </>
    );
};

export default Home;