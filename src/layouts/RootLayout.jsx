import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='main-wrapper'>
            {/* Header */}
            <Header></Header>
            {/* Header End */}

            {/* ========== Mian Start ========== */}
            <main className='site-main'>
                <Outlet></Outlet>
            </main>
            {/* ========== Mian End ========== */}

            {/* Footer */}
            <Footer></Footer>
            {/* Footer End */}
        </div>
    );
};

export default RootLayout;