import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    // ex react router dom auth
    const location = useLocation();

    if (loading) {
        console.log('yes loading found')
        return <div>loading...</div>
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;