import { Helmet } from "react-helmet";
import useProperties from "../../../hooks/useProperties";
import SectionTitle from "../SectionTitle/SectionTitle";
import PropertiesCart from "./PropertiesCart";
import Blogs from "../Blogs/Blogs";

const AllProperties = () => {
    const [data] = useProperties();
    // const verifydCard = data.filter(item => item.verification_status === "verified");

    return (
        <section className="bg-gray-100">
            <Helmet>
                <title>All Properties - Next Estate Real Estate React Template</title>
            </Helmet>
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0">
                <SectionTitle
                    subHeading="All Properties"
                    Heading="Recommended For You"
                ></SectionTitle>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {
                            data?.map(card => <PropertiesCart card={card} key={card._id}></PropertiesCart>)
                        }
                    </div>
                </section>
            </div>
            
            <Blogs></Blogs>
        </section>
    );
};

export default AllProperties;