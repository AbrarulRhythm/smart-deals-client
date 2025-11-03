import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { user } = use(AuthContext);
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([]);
    const bidModalRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('bids for this products', data);
                setBids(data);
            })
    }, [user, productId]);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const bid = event.target.bid.value;
        const newBid = {
            product: productId,
            buyer_image: user && user.photoURL,
            buyer_name: name,
            buyer_contact: email,
            bid_price: bid,
            status: 'pending'
        }

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        icon: "success",
                        title: "Your bid has been plased",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    // add the new bid to the state
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                }
            })
    }

    return (
        <div>
            <button
                onClick={handleBidModalOpen}
                className='button-linear-gradient py-4 px-12 text-white rounded-sm font-medium cursor-pointer m-10'>I want Buy This Product</button>

            <h1 className='text-3xl'>Total Bids {bids.length}</h1>

            <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Give Seller Your Offered Price</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form onSubmit={handleBidSubmit}>
                            <input type="text" name='name' className='border border-gray-300' defaultValue={user && user.displayName} readOnly />
                            <input type="email" name='email' className='border border-gray-300' defaultValue={user && user.email} readOnly />
                            <input type="text" name='bid' className='border border-gray-300' placeholder='Price' />
                            <button type='submit'>Submit</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProductDetails;