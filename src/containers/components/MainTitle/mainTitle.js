import React from 'react';

import { 
    Grid,
    Typography
} from '@material-ui/core';


class MainTitle extends React.Component {
    render() {
        return (
            <Grid item xs={12}>
                <Typography 
                    variant="h2"
                    style={ styles.mainTitle }
                >
                    { this.props.title }
                </Typography>
            </Grid>
        );
    }
}

const styles = {
    mainTitle: {
        marginTop: "3%",
        marginBottom: "3%",
        textAlign: "center",
        color: "#267cc1",
        fontWeight: "bold",
        // fontFamily: "fontFamily"
    },
}

export default MainTitle;
