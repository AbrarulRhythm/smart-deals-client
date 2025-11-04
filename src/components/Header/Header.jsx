import React, { use, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { GoPerson } from 'react-icons/go';
import { RxDashboard } from 'react-icons/rx';
import { LuCircleHelp } from 'react-icons/lu';
import { PiSignOutBold } from 'react-icons/pi';

const Header = () => {
    const { user, signOutUser } = use(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    // Nav Limks
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

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
                                    <div ref={menuRef} className='relative'>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(!openMenu);
                                            }}
                                        >
                                            <img className='w-12 h-12 object-cover rounded-full cursor-pointer' src={`${user && user.photoURL}`} alt="Profile Image" />
                                        </div>

                                        <div className={`${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-white border border-gray-200 rounded-sm absolute top-[73px] right-0 w-[294px] h-auto before:content-[""] before:w-6 before:h-6 before:absolute before:-top-3 before:right-3.5 before:bg-white before:rotate-45 before:rounded-tl-sm before:border-t before:border-l before:border-gray-200`}>
                                            <div className='py-6 text-center'>
                                                <img src={`${user && user.photoURL}`} className='w-12 h-12 rounded-full mx-auto mb-2' alt="Profile Image" />
                                                <h5 className='text-sm font-medium'>{user && user.displayName}</h5>
                                            </div>
                                            <ul>
                                                <li>
                                                    <Link to='/' className='flex items-center text-sm font-medium text-gray-500 gap-2 px-5 py-2 hover:bg-gray-200 duration-200'>
                                                        <GoPerson className='text-lg' /> Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/' className='flex items-center text-sm font-medium text-gray-500 gap-2 px-5 py-2 hover:bg-gray-200 duration-200'>
                                                        <RxDashboard className='text-base' /> Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/' className='flex items-center text-sm font-medium text-gray-500 gap-2 px-5 py-2 hover:bg-gray-200 duration-200'>
                                                        <LuCircleHelp className='text-base' /> Help Center
                                                    </Link>
                                                </li>
                                            </ul>
                                            <hr className='border-0 border-t border-gray-200 mb-4' />
                                            <div className='px-4 mb-4'>
                                                <button onClick={handleSignOut} className='flex items-center justify-center text-center font-semibold text-sm w-full border border-gray-300 bg-gray-100 rounded-sm py-2 gap-1 cursor-pointer hover:bg-gray-300 duration-200'><PiSignOutBold className='text-base' /> Sign Out</button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='space-x-2.5'>
                                        <Link to='/sign-in' className="border border-violet-400 text-violet-500 font-medium rounded-sm py-[11px] px-6">Login</Link>
                                        <Link to='/register' className="hidden md:inline-block button-linear-gradient text-white rounded-sm py-3 px-6">Register</Link>
                                    </div>
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