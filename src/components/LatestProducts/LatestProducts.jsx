import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise);

    return (
        <div className='flex flex-wrap -mx-3'>
            {
                latestProducts.map(latestProduct => {
                    return (
                        <Product
                            key={latestProduct._id}
                            latestProduct={latestProduct}
                        ></Product>
                    )
                })
            }
        </div>
    );
};

export default LatestProducts;