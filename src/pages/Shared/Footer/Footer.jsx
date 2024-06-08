

const Footer = () => {
    return (
        <section class="footer pt-28 bg-black text-base-content">
            <div class="w-full px-3 md:px-0 md:w-8/12 mx-auto font-Roboto">
                <div class="text-white grid grid-cols-2 xl:grid-cols-12 gap-10">
                    <div class=" col-span-2 lg:col-span-4 xl:col-span-6 text-center xl:text-start">
                        <a class="text-3xl text-white font-extrabold cursor-pointer">Next Easted</a>
                        <p class="font-medium text-gray-300 w-full lg:w-3/5 lg: mx-auto xl:mx-0 leading-7 text-base my-7">Our Real Estate Inc company is committed to delivering a high level of expertise, customer service, and attention to detail to the marketing and sales of luxury real estate, and rental properties.</p>

                        <div class="flex flex-col justify-center xl:justify-start items-center xl:items-start gap-4">
                            <div class="flex justify-center xl:justify-start items-center gap-2 text-gray-300 cursor-pointer">
                                <i class="fa-regular fa-envelope text-red-500 text-2xl"></i><p class="text-base text-gray-300">nextestate@support.com</p>
                            </div>
                            <div class="flex justify-start items-center gap-2 text-gray-300 cursor-pointer">
                                <i class="fa-solid fa-phone text-red-500 text-2xl"></i><p class="text-base text-gray-300">(+62) 123-321-543</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav class="flex flex-col">
                            <header class="text-white text-lg font-bold mb-7">Services</header>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Branding</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Design</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Marketing</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Advertisement</a>
                        </nav>
                    </div>
                    <div class="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav class="flex flex-col">
                            <header class="text-white text-lg font-bold mb-7">Company</header>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">About us</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Contact</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Jobs</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Press kit</a>
                        </nav>
                    </div>
                    <div class="col-span-2 xl:col-span-2 text-center xl:text-start">
                        <nav class="flex flex-col">
                            <header class="text-white text-lg font-bold mb-7">Legal</header>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Terms of use</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Privacy policy</a>
                            <a class="link text-base text-gray-400 font-medium leading-10 link-hover">Cookie policy</a>
                        </nav>
                    </div>
                </div>
                <div className="text-white mx-auto text-base pb-10">
                    <p className="">Copyright Next Estate. All Rights Reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;