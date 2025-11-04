import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation()

    if (loading) {
        return <div>This Page is Loading ... <span className="loading loading-spinner loading-sm"></span></div>
    }

    if (user && user.email) {
        return children;
    }

    return <Navigate state={location.pathname} to='/sign-in'></Navigate>
};

export default PrivateRoute;