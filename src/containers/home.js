import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

import Menu from './components/NavigationMenu/navigationMenu';


class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }

        this.onPressExitButton = this.onPressExitButton.bind(this);
    }

    onPressExitButton(){
        this.props.logout();
    }

    render() {
        return (
            <div>
                <Menu position={0}/>
                <h1>Home</h1>
                <button onClick={this.onPressExitButton}>Sair</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { logout })(Home)