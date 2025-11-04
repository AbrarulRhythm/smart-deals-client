import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const { signInWithGoogle } = use(AuthContext);

    // Handle Google Sign In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }

                // Create user in the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save: ', data);
                        if (data.insertedId) {
                            toast.success(`Welcome aboard, ${user.displayName}! 🎉 You've successfully signed up.`);
                        }
                        else {
                            toast(data.message);
                        }
                    })
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <section className='register-user'>
            <title>Sign up for Smart Deals</title>

            <div className='h-auto flex justify-center items-center py-14'>
                <div className='container'>
                    <div className='flex flex-wrap -mx-3 justify-center'>
                        <div className='w-full md:w-9/12 lg:w-6/12 px-3'>
                            <div className='p-8 md:p-10 bg-white rounded-lg shadow'>
                                <div className='text-center mb-6'>
                                    <h2 className='text-3xl font-semibold mb-2'>Register Now!</h2>
                                    <p>Already have an account? <Link to='/sign-in' className='theme-text-linear-gradient hover:opacity-80 duration-200'>Login Now</Link></p>
                                </div>
                                <form>
                                    <div className='mb-4'>
                                        <label htmlFor="name" className='text-sm mb-1.5 inline-block'>Name</label>
                                        <input type="text" name='name' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='Mariam Swarna' />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="email" className='text-sm mb-1.5 inline-block'>Email</label>
                                        <input type="email" name='email' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='smsowkothasan@gmail.com' />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="image" className='text-sm mb-1.5 inline-block'>Image-URL</label>
                                        <input type="text" name='image' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='https://your-image-url.com' />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="password" className='text-sm mb-1.5 inline-block'>Password</label>
                                        <input type="password" name='password' className='w-full rounded-sm border border-dark-06 py-3 px-4 focus:outline-0 focus:border-violet-400' placeholder='*************' />
                                    </div>
                                    <div className='pt-4'>
                                        <button className='button-linear-gradient text-white font-medium w-full rounded-sm py-3 cursor-pointer'>Register</button>
                                    </div>
                                </form>
                                <div className='my-6 overflow-hidden'>
                                    <div className='relative font-medium text-center or-social'>OR</div>
                                </div>
                                {/* Google Sign In Button */}
                                <button onClick={handleGoogleSignIn} className='font-semibold flex items-center justify-center w-full gap-2.5 border border-dark-06 hover:border-violet-400 duration-200 cursor-pointer rounded-sm py-3'>
                                    <FcGoogle className='text-[26px]' /> Sign Up With Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Register;