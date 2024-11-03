import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

export const AuthGuard = ({ children, adminRequired = false }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminRequired && !isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
    adminRequired: PropTypes.bool
};