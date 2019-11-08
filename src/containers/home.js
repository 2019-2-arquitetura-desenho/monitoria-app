import React from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardContent } from '@material-ui/core';

import Menu from './components/NavigationMenu/navigationMenu';
import { logout } from '../store/actions';
import { style } from '@material-ui/system';
import { Typography, Grid } from '@material-ui/core';


class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }

        this.onPressLogoutButton = this.onPressLogoutButton.bind(this);
    }

    onPressLogoutButton(){
        this.props.logout();
    }

    content() {
        const { userData } = this.props

        if (userData.profile.user.is_superuser){
            return (
                <div>Professor</div>
            );
        } else {
            return (
                <React.Fragment>
                    <Typography variant="h5" style={ styles.topic }><b>Datas Importantes</b></Typography>
                    <Card style={ styles.card }>
                        <CardContent>
                            <Typography variant="h5">
                                - Início do período de inscrição: 20/08/2019<br></br>
                                - Término do período de inscrição: 26/08/2019
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card styles={style.Card}>

                    </Card>
                    <Card styles={style.Card}>

                    </Card>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <Menu position={0} onPressLogoutButton={ this.onPressLogoutButton }/>
                { this.content() }
            </React.Fragment>
        );
    }
}

const styles = {
    topic: {
        marginLeft: "2%",
        marginRight: "2%",
        color: "#141414"
    },
    card: {
        marginTop: "1%",
        marginLeft: "2%",
        marginRight: "2%",
        color: "white",
        backgroundColor: "#267cc1"
    }
}

function mapStateToProps(state) {
    return {
        userData: state.authentication.userData
    }
}

export const homeContainer = connect(
    mapStateToProps,
    { logout }
)(Home)

export default homeContainer;