import React, { use, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyBids = () => {
    const { user } = use(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    }, [user]);

    return (
        <div>
            <h1>This is MyBids Page</h1>
        </div>
    );
};

export default MyBids;