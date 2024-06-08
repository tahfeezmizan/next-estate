import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxisoCommon from '../../../hooks/useAxisoCommon';
import SectionTitle from '../SectionTitle/SectionTitle';
import BlogCard from './BlogCard';

const Blogs = () => {
    const axisoCommon = useAxisoCommon();

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axisoCommon.get('/blogs');
            return res.data;
        }
    })

    return (
        <section className='bg-[#dfe7ed8f]'>
            <div className='w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0'>
                <SectionTitle Heading="News & Events" subHeading='INSTANT UPDATES'></SectionTitle>

                {/* feature tea card container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 sm:mb-4 md:mb-4">
                    {/* first card */}
                    {
                        blogs?.map(blog => <BlogCard key={blog._id} blog={blog} ></BlogCard>)
                    }
                </div>
            </div>
        </section >

    );
};

export default Blogs;