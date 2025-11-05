import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router';

const Product = ({ latestProduct }) => {
    const { _id, title, price_min, price_max, image } = latestProduct;

    return (
        <div className='w-full md:w-6/12 lg:w-4/12 px-3 mb-6'>
            <div className='bg-white p-4 rounded-lg'>
                <div className='mb-4'>
                    <LazyLoadImage
                        src={image}
                        alt="Latest Product Image"
                        className='w-full h-[276px] object-cover rounded-lg'
                    ></LazyLoadImage>
                </div>
                <div className='inline-block text-[12px] bg-violet-100 mb-2 py-1.5 px-3 rounded-4xl'>
                    <span className='theme-text-linear-gradient'>On Sale</span>
                </div>
                <h2 className='text-2xl font-medium mb-2'>{title}</h2>
                <h4 className='theme-text-linear-gradient text-lg font-semibold mb-4'>${price_min} - {price_max}</h4>
                <Link to={`/productDetails/${_id}`} className='block theme-text-linear-gradient w-full text-center font-semibold rounded-sm py-3.5 px-6 border border-violet-400 cursor-pointer'>View Details</Link>
            </div>
        </div >
    );
};

export default Product;