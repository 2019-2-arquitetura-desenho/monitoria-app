import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({
    component: Component, isAuthenticated, ...rest
}) => (
    <Route { ...rest } render={ props => (
        isAuthenticated ? (
            <Component { ...props }/>
        ) : (
            <Redirect to={{
                pathname: '/entrar',
                state: { from: props.location }
            }} />
        )
    )} />
)

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated 
});

export default connect(mapStateToProps, null)(PrivateRoute);
