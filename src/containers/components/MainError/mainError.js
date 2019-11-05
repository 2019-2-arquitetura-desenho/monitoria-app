import React from 'react';

import {
    Typography
} from '@material-ui/core' 


class errorText extends React.Component {
    render() {
        const { error }  = this.props

        return(
            <Typography
                variant="subtitle2"
                style={ styles.errorText }
            >
                { error }
            </Typography>
        );
    }
}

const styles = {
    errorText: {
        marginTop: "1%",
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: "1%",
        color: "#ff0000",
        fontWeigth: "bold"
    }
}

export default errorText;
