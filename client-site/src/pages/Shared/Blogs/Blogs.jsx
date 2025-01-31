import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import BlogCard from './BlogCard';
import useAxiosCommon from '../../../hooks/useAxisoCommon';

const Blogs = () => {
    const axiosCommon = useAxiosCommon();

    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosCommon.get('/blogs');
            console.log("API Response:", res.data);
            return Array.isArray(res.data) ? res.data : res.data.blogs || [];
        }
    });

    if (isLoading) return <p>Loading blogs...</p>;
    if (isError) return <p>Error loading blogs</p>;

    return (
        <section className='bg-[#dfe7ed8f]'>
            <div className='w-full lg:w-5/6 xl:w-8/12 mx-auto py-20 px-3 md:px-0'>
                <SectionTitle Heading="News & Events" subHeading='INSTANT UPDATES' />

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 sm:mb-4 md:mb-4">
                    {blogs.length > 0 ? (
                        blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
