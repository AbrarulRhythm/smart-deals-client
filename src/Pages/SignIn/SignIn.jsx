import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

const SignIn = () => {
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle Google Sign In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                toast.success(`Sign In successful. Welcome back, ${user.displayName}!`);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .cathc(error => {
                toast.error(error.message);
            })
    }

    // Handle Sign In
    const handleSignIn = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        signInUser(email, password)
            .then(result => {
                event.target.reset(); // form reset
                const user = result.user;
                toast.success(`Sign In successful. Welcome back, ${user.displayName}!`);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <section className='sign-in-user'>
            <title>Smart Deals - log in or sign up</title>

            <div className='h-auto flex justify-center items-center py-14'>
                <div className='container'>
                    <div className='flex flex-wrap -mx-3 justify-center'>
                        <div className='w-full md:w-9/12 lg:w-6/12 px-3'>
                            <div className='p-8 md:p-10 bg-white rounded-lg shadow'>
                                <div className='text-center mb-6'>
                                    <h2 className='text-3xl font-semibold mb-2'>Login</h2>
                                    <p>Don't have an account? <Link to='/register' className='theme-text-linear-gradient hover:opacity-80 duration-200'>Register Now</Link></p>
                                </div>
                                <form onSubmit={handleSignIn}>
                                    <div className='mb-4'>
                                        <label htmlFor="email" name='email' className='text-sm mb-1.5 inline-block'>Email</label>
                                        <input type="email" name='email' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='smsowkothasan@gmail.com' required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='text-sm mb-1.5 inline-block'>Password</label>
                                        <div className='relative'>
                                            <input type={showPassword ? 'text' : 'password'} name='password' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='*************' required />
                                            <span onClick={() => setShowPassword(!showPassword)} className='absolute right-5 top-[50%] -translate-y-[50%] text-xl cursor-pointer text-gray-400 hover:text-gray-500 duration-150'>
                                                {showPassword ? <FaEye /> : <IoEyeOff />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='pt-4'>
                                        <button className='button-linear-gradient text-white font-medium w-full rounded-sm py-3 cursor-pointer'>Sign In</button>
                                    </div>
                                </form>
                                <div className='my-6 overflow-hidden'>
                                    <div className='relative font-medium text-center or-social'>OR</div>
                                </div>
                                {/* Google Sign In Button */}
                                <button onClick={handleGoogleSignIn} className='font-semibold flex items-center justify-center w-full gap-2.5 border border-dark-06 hover:border-violet-400 duration-200 cursor-pointer rounded-sm py-3'>
                                    <FcGoogle className='text-[26px]' /> Sign In With Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SignIn;