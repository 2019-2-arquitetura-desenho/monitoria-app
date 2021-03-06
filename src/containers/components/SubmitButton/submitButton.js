import React from 'react';

import { Button } from '@material-ui/core';


class SubmitButton extends React.Component {
    render() {
        const {
            onClickSubmitButton, titleButton, buttonColor
        } = this.props

        return (
            <Button
                variant="contained"
                color={buttonColor}
                size="large"
                style={styles.submitButton}
                onClick={onClickSubmitButton}
            >
                {titleButton}
            </Button>
        )
    }
}

const styles = {
    submitButton: {
        width: "86%",
        marginTop: "4%",
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: "4%",
        fontWeight: "bold"
    }
}

export default SubmitButton;
