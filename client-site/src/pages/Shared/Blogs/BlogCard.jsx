import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const BlogCard = ({ blog }) => {
    const { image, title, date, summary } = blog

    return (
        <div className="p-4 rounded-2xl bg-white">
            <img src={image} className="w-full rounded-2xl mb-5" alt="" />
            <div className="px-3 pb-2" >
                <p className="mb-2 font-medium text-sm text-primaryColor">{date}</p>
                <h3 className="text-xl font-bold hover:text-primaryColor duration-150 mb-2">{title}</h3>
                <p className="mb-3 text-sm text-slate-400">{summary}</p>
                <button className="font-semibold text-lg hover:text-primaryColor duration-150 flex items-center justify-center">Learn More <span className='text-2xl'><MdKeyboardArrowRight /></span></button>
            </div>
        </div>
    );
};

export default BlogCard;