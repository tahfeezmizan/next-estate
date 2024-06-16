
const SectionTitle = ({ subHeading, Heading }) => {
    return (
        <div className="text-center pb-10">
            <p className="text-sm uppercase font-Roboto">{subHeading}</p>
            <h2 className="text-2xl md:text-4xl mb-3 font-semibold font-Merriweather">{Heading}</h2>
            <div className="border-2 w-16 mx-auto border-primaryColor"></div>
        </div>
    );
};

export default SectionTitle;