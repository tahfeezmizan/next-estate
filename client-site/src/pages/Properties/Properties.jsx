import React, { useEffect, useState } from 'react';
import useProperties from '../../hooks/useProperties';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import PropertiesCart from '../Shared/AllProperties/PropertiesCart';
import { Link } from 'react-router-dom';

const Properties = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://next-estate-server.vercel.app/property')
            .then(response => response.json())
            .then(json => (setData(json)))
    }, [])

    return (
        <section className='bg-[#dfe7ed8f]'>
            <div className='w-full lg:w-5/6 xl:w-8/12 mx-auto py-20'>
                <SectionTitle Heading="Comfort Living Solution" subHeading="EXPLORE VILLAS"></SectionTitle>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-3 md:px-0">
                        {
                            data.slice(0, 6)?.map(card => <PropertiesCart card={card} key={card._id}></PropertiesCart>)
                        }
                    </div>
                    <div className="mx-auto text-center py-12">
                        <Link to={`/allproperties`} className="btn  text-white text-lg bg-primaryColor border-[#e868221a] hover:bg-primaryColor hover:text-white rounded-none">See More Listings</Link>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Properties;