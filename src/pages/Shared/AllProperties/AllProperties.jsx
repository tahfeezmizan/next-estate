import useProperties from "../../../hooks/useProperties";
import SectionTitle from "../SectionTitle/SectionTitle";
import PropertiesCart from "./PropertiesCart";

const AllProperties = () => {
    const [data] = useProperties();
    const verifydCard = data.filter(item => item.verification_status === "verified");

    return (
        <section className="bg-gray-100">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto py-20">
                <SectionTitle
                    subHeading="All Properties"
                    Heading="Recommended For You"
                ></SectionTitle>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {
                            verifydCard?.map(card => <PropertiesCart card={card} key={card._id}></PropertiesCart>)
                        }
                    </div>
                </section>
            </div>
        </section>
    );
};

export default AllProperties;