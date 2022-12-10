import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectOnAuth = ({ children, redirectTo, isAuthenticated }) => {
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(RedirectOnAuth);