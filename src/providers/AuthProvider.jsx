import React from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthProvider = ({ children }) => {
    const authInfo = {
        email: 'guru@gmail.com'
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;