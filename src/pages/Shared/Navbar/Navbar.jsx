import { NavLink } from "react-router-dom";

const Navbar = () => {

    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/queries'>Properties</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 navMenu py-2 sticky top-0 z-50">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto  navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content gap-5 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <NavLink className="text-xl uppercase Sitelogo">
                        {/* <img src={siteLogo} className="w-40" alt="" /> */}
                        <h1 className="text-3xl font-Merriweather">next estate</h1>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5 felx">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end z-[1000]">
                    <div className="pr-4">
                        <label className="cursor-pointer grid place-items-center ">
                            <input
                                // onChange={handleToggle}
                                type="checkbox"
                                className="toggle toggle-md theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>

                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>

                    {/* {user?.email ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt="" src={user?.photoURL || profileAvater} />

                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><p className="text-lg font-bold capitalize">{user?.displayName || 'Name Not Found'}</p></li>
                                <li><Link to='/profile'>Profile</Link></li>
                                <li><Link onClick={() => {
                                    logOut()
                                    if (logOut) {
                                        toast.success('User has log out!');
                                    }
                                }}><a>Logout</a></Link></li>
                            </ul>
                        </div>
                        : */}
                        <div className="px-1 gap-5 felx font-Roboto">
                            <NavLink className="login px-3 py-2" to="/login">Login</NavLink>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;