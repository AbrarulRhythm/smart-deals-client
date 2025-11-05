import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import useAxios from '../../hooks/useAxios';

const CreateProduct = () => {
    const { user } = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const currentDate = new Date();

    // Format date only
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: 'long',  // e.g. "Thursday"
        year: 'numeric',  // e.g. "2025"
        month: 'long',    // e.g. "October"
        day: 'numeric'    // e.g. "30"
    });

    // Format time only
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: '2-digit',   // e.g. "02"
        minute: '2-digit', // e.g. "23"
        second: '2-digit', // e.g. "00"
        // timeZoneName: 'short' // e.g. "GMT"
    });

    // Handle Create A Product
    const handleCreateProduct = (event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const minPrice = parseInt(form.minPrice.value);
        const maxPrice = parseInt(form.maxPrice.value);
        const image = form.productImage.value;

        const newProduct = {
            title,
            price_min: minPrice,
            price_max: maxPrice,
            image,
            email: user.email,
            seller_image: user?.photoURL,
            seller_name: user?.displayName,
            created_at: [formattedDate, formattedTime]
        }

        axiosSecure.post('/products', newProduct)
            .then(data => {
                console.log(data);
                if (data.data.insertedId) {
                    toast.success("Your product has been successfully created! 🎉");
                }
            })
    }

    return (
        <section className='py-20'>
            <title>Create A Product - Smart Deals</title>

            <div className='container'>
                <Link to='/allProducts' className='flex items-center justify-center gap-2 hover:text-violet-400 duration-200 hover:gap-3 mb-4 md:mb-6 text-lg font-medium'><FaArrowLeftLong className='text-lg' /> Back to Products</Link>
                <SectionTitle title='Create' colorTitle='A Product' classes='text-center'></SectionTitle>

                <div className='flex flex-wrap -mx-3 justify-center'>
                    <div className='w-full lg:w-8/12 px-3'>
                        <div className='bg-white rounded-lg p-6 md:p-9 lg:p-10'>
                            <form onSubmit={handleCreateProduct}>
                                <div className='flex flex-wrap -mx-2'>
                                    {/* Title */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label htmlFor="title" className='text-sm inline-block mb-1.5 font-medium'>Title</label>
                                            <input type="text" name='title' className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='e.g. Yamaha Fz Guitar for Sale' />
                                        </div>
                                    </div>
                                    {/* Min Price */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Min Price You want to Sale ($)</label>
                                            <input type="number" name='minPrice' className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='e.g. 18.5' />
                                        </div>
                                    </div>
                                    {/* Max Price */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Max Price You want to Sale ($)</label>
                                            <input type="number" name='maxPrice' className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='Optional (default = Min Price)' />
                                        </div>
                                    </div>
                                    {/* Product Usage time */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Product Usage time</label>
                                            <input type="text" className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='e.g. 1 year 3 month' />
                                        </div>
                                    </div>
                                    {/* Seller Name */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Seller Name</label>
                                            <input type="text" defaultValue={user?.displayName} className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='e.g. Artisan Roasters' />
                                        </div>
                                    </div>
                                    {/* Seller Email */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Seller Email</label>
                                            <input type="email" defaultValue={user?.email} className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='leli31955@nrlord.com' />
                                        </div>
                                    </div>
                                    {/* Seller Email */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Seller Contact</label>
                                            <input type="number" className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='e.g. +1-555-1234' />
                                        </div>
                                    </div>
                                    {/* Seller Image URL */}
                                    <div className='w-full md:w-6/12 px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Seller Image URL</label>
                                            <input type="text" defaultValue={user?.photoURL} className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='https://...' />
                                        </div>
                                    </div>
                                    {/* Prodict Image */}
                                    <div className='w-full px-2 mb-6'>
                                        <div className='form-group'>
                                            <label className='text-sm inline-block mb-1.5 font-medium'>Your Product Image URL</label>
                                            <input type="text" name='productImage' className='w-full border border-gray-300 py-2.5 px-3 rounded-sm focus:outline-0 focus:border-violet-400' placeholder='https://...' />
                                        </div>
                                    </div>
                                    <div className='w-full px-2'>
                                        <button className='button-linear-gradient text-white font-medium w-full rounded-sm py-3 cursor-pointer'>Create a Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default CreateProduct;