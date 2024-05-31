
const SectionTitle = ({ subHeading, Heading }) => {
    return (
        <div className="text-center">
            <p className="text-sm uppercase font-Roboto">{subHeading}</p>
            <h2 className="text-4xl mb-5 font-Merriweather">{Heading}</h2>
        </div>
    );
};

export default SectionTitle;