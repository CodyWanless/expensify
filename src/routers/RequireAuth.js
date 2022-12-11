import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Header } from "../components/Header";

const RequireAuth = ({ children, redirectTo, isAuthenticated }) => {
    return isAuthenticated ? (<div><Header />{children}</div>) : <Navigate to={redirectTo} />;
};

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(RequireAuth);