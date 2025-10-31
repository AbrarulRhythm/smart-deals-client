import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = use(AuthContext);

    if (user && user.email) {
        return children;
    }

    return <Navigate to='/register'></Navigate>
};

export default PrivateRoute;