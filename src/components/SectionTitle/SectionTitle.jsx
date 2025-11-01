import React from 'react';

const SectionTitle = ({ title, colorTitle }) => {
    return (
        <div className='text-center mb-8 md:mb-11'>
            <h1 className='text-4xl md:text-[40px] lg:text-5xl font-bold'>{title} <span className='theme-text-linear-gradient'>{colorTitle}</span></h1>
        </div>
    );
};

export default SectionTitle;