import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PublicRoute = ({
    component: Component, isAuthenticated, ...rest
}) => (
    <Route { ...rest } render={ props => (
        isAuthenticated ? (
            <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
            }} />
        ) : (
            <Component { ...props } />
        )
    )} />
)

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps, null)(PublicRoute);