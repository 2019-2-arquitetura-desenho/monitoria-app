import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route { ...rest } render={ props => (
        isAuthenticated ? (
            <Component { ...props }/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )} />
)

const mapStateToProps = (state) => ({
    // TEMP
    isAuthenticated: false
})

export default connect(mapStateToProps, null)(PrivateRoute)
