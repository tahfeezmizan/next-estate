import { NavLink } from "react-router-dom";

const Navbar = () => {

    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/queries'>Properties</NavLink></li>
        </>
    );

    return (
        <div className="navbar navMenu absolute left-0 right-0 top-0 z-50 py-2 text-white">
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