import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    if (loading) {
        return <div>This Page is Loading ... <span className="loading loading-spinner loading-sm"></span></div>
    }

    if (user && user.email) {
        return children;
    }

    return <Navigate to='/register'></Navigate>
};

export default PrivateRoute;