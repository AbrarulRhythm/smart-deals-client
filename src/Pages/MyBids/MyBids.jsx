import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TableRow from '../../components/TableRow/TableRow';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/bids?email=${user.email}`)
            .then(data => {
                setBids(data.data);
            })
    }, [user, axiosSecure]);

    return (
        <section className='my-bids py-11 lg:py-20'>
            <title>My Bids - Smart Deals</title>

            <div className='container'>
                <h1 className='text-center text-4xl md:text-5xl font-bold mb-10'>My Bids: <span className='theme-text-linear-gradient'>{bids.length}</span></h1>

                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL No</th>
                                    <th>Product</th>
                                    <th>Seller</th>
                                    <th>Bid Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bids.map((bid, index) => {
                                        return (
                                            <TableRow
                                                key={bid._id}
                                                index={index}
                                                bid={bid}
                                            ></TableRow>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyBids;