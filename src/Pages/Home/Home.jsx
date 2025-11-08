import React, { Suspense } from 'react';
import LatestProducts from '../../components/LatestProducts/LatestProducts';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const fetchLatestProducts = async () => {
    const res = await fetch('https://smart-deals-server-1.onrender.com/latest-products');
    return res.json();
}
const latestProductsPromise = fetchLatestProducts();

const Home = () => {
    return (
        <>
            <h1>This is Home</h1>
            <section className='recent-products py-12 md:py-20'>
                <div className='container'>
                    <SectionTitle title='Recent' colorTitle='Products' classes='text-center'></SectionTitle>
                    <div className='recent-products-wrap'>
                        <Suspense fallback={<span>Data is Loading...</span>}>
                            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;