import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../../hooks/useAuth";
import profileAvater from "../../../assets/slider/slide_2.jpg"
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const links = (
        <>
            <NavLink to='/'>Home</NavLink>
            {user ? <>
                <NavLink to='/allproperties'>All Properties</NavLink>
                <NavLink to='/dashboard'>Dashboard</NavLink>
            </>
                :
                <NavLink to='/properties'>Properties</NavLink>
            }
        </>
    );

    return (
        <div className="navbar navMenu fixed left-0 right-0 top-0 z-50 py-2 bg-black bg-opacity-55 text-white backdrop-blur-sm">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto  navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm text-base font-medium text-black dropdown-content gap-5 mt-3 z-[1] px-2 shadow bg-base-100 rounded-box w-52">
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

                    {user?.email ?
                        <div className="dropdown dropdown-end text-black">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt="" src={user?.photoURL || profileAvater} />

                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52">
                                <p className="text-lg font-bold capitalize mb-2">{user?.displayName || 'Name Not Found'}</p>
                                <Link className="pb-1 text-base font-medium" to='dashboard/profile'>Profile</Link>
                                <Link className="pb-1 text-base font-medium" to='/dashboard'>Dashboard</Link>
                                <Link className="pb-1 text-base font-medium" onClick={() => {
                                    logOut()
                                }}><a>Logout</a></Link>

                            </ul>
                        </div>
                        :
                        <div className="px-1 gap-5 felx font-Roboto">
                            <NavLink className="login px-3 py-2" to="/singin">Login/Register</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;