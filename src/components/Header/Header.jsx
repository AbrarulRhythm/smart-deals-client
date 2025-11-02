import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, signOutUser } = use(AuthContext);

    const links = (
        <>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/allProducts'>All Products</NavLink>
            </li>
            {
                user && (
                    <>
                        <li>
                            <NavLink to='/myProducts'>My Products</NavLink>
                        </li>
                        <li>
                            <NavLink to='/myBids'>My Bids</NavLink>
                        </li>
                    </>
                )
            }
            <li>
                <NavLink to='/createProduct'>Create Product</NavLink>
            </li>
        </>
    );

    // Handle Sign Out
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Successfully signed out! We hope to see you again soon.')
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <header>
            <nav className='bg-white'>
                <div className='container'>
                    <div className="navbar px-0 py-4">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <Link to='/' className="text-2xl font-bold">Smart<span className='theme-text-linear-gradient'>Deals</span></Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            {
                                user ? (
                                    <div className='relative'>
                                        <div>
                                            <img className='w-12 h-12 object-cover rounded-full cursor-pointer' src={`${user && user.photoURL}`} alt="Profile Image" />
                                        </div>

                                        <div className='bg-white border border-gray-200 rounded-sm absolute top-[73px] right-0 w-[291px] h-auto p-10 before:content-[""] before:w-6 before:h-6 before:absolute before:-top-3 before:right-3.5 before:bg-white before:rotate-45 before:rounded-tl-sm before:border-t before:border-l before:border-gray-200'>
                                            <ul>
                                                <li>Home in this</li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to='/register' className="button-linear-gradient text-white rounded-sm py-3 px-6">Register</Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;