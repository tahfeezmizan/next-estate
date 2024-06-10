import propertybanner from "../../../assets//slider/propertybanner.jpg"


const PageBanner = () => {
    return (
        <div className="py-48 text-white" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${propertybanner})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-4 md:px-0">
                <h2 className="text-3xl md:text-5xl font-Merriweather leading-relaxed capitalize">find exclusive property</h2>
            </div>
        </div>
    );
};

export default PageBanner;