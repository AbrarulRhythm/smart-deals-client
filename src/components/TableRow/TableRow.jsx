import React from 'react';

const TableRow = ({ bid, index }) => {
    const { bid_price, status } = bid;

    return (
        <tr className="bg-base-200">
            <th>{index + 1}</th>
            <td></td>
            <td>
                <div className='flex items-center gap-2'>
                    <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" className='w-12 h-12 object-cover rounded-full' alt="Seller Image" />
                    <div className=''>
                        <h5 className='text-sm font-semibold'>Guru Randhawa</h5>
                        <span className='text-[12px] text-gray-400'>crafts.by.sara@shop.net</span>
                    </div>
                </div>
            </td>
            <td>${bid_price}</td>
            <td><span className='bg-yellow-400 text-[12px] font-medium inline-block rounded-4xl px-3 py-1'>{status}</span></td>
            <td>
                <button className='text-red-500 border border-red-500 text-sm font-medium rounded-sm px-3 py-1 hover:text-white hover:bg-red-500 cursor-pointer duration-300'>Remove Bid</button>
            </td>
        </tr>
    );
};

export default TableRow;