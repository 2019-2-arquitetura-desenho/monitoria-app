import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/SubmitButton/registerButton";
import Typography from "../components/Typography/Typography";
import RegisterLayout from "../components/LandingLayout/registerLayout";
import SendIcon from '@material-ui/icons/Send';

const backgroundImage = require("../assets/background-home.jpg");

function RegisterHome(props) {
	const { classes } = props;

	return (
		<RegisterLayout backgroundClassName={classes.background}>
			<img
				style={{ display: "none" }}
				src={backgroundImage}
				alt="increase priority"
			/>
			<Typography
				color="inherit"
				align="center"
				variant="h2"
				marked="center"
			>
				Monitoria FGA 2019.2
			</Typography>
			<Typography
				color="inherit"
				align="center"
				variant="h5"
				className={classes.h5}
			>
				Início das inscrições: 20/08/2019 às 23h55
				<br />
				Término das inscrições: 26/08/2019 às 23h55
			</Typography>
			<Button
				variant="contained"
				size="large"
				className={classes.button}
				component="a"
				href="/cadastro"
				startIcon={<SendIcon/>}
			>
				Registrar-se
			</Button>
			<Typography
				variant="body2"
				color="inherit"
				className={classes.more}
			>
				Possui conta? Faça login
			</Typography>
		</RegisterLayout>
	);
}

const styles = theme => ({
	background: {
		backgroundImage: `url(${backgroundImage})`,
		backgroundColor: "#141414",
		backgroundPosition: "center",
	},
	button: {
		minWidth: 200,
		color: "#141414"
	},
	h5: {
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			marginTop: theme.spacing(10),
		},
	},
	more: {
		marginTop: theme.spacing(2),
	},
});

RegisterHome.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterHome);
