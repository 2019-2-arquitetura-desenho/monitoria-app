import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography/Typography";


function GradeDescription(props) {
	const { classes } = props;

	return (
		<section className={classes.root}>
			<Container className={classes.container}>
			<img
					src={require("../assets/curvy-lines.png")}
					className={classes.curvyLines}
					alt="curvy lines"
				/>
				<Grid container spacing={5}>
					<Grid item xs={12} md={12}>
						<div className={classes.item}>
							<Typography variant="h2" className={classes.title} align="center" marked="center">
								Nota no Processo de Monitoria
							</Typography>
							<Typography variant="h6">
								{"> Todo professor pode indicar alunos para serem seus monitores,"}
								{" avaliando-os com uma nota flutuante entre 0 e 5. "}
								<br />
								{"> A indicação por parte do professor afeta a nota final, conforme abaixo:"}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div className={classes.item}>
							<img
								className={classes.image}
								src={require("../assets/indicado.png")}
								alt="indicado"
							/>
							<Typography variant="h4" className={classes.title}>
								Aluno Indicado
							</Typography>
							<Typography variant="h5">
								{"Nota final = 0.3A1 + 0.2A2 + 0.5A3"}
								<br />
								<br />
								{"A1: Menção (SS=5, MS=4, MM=3)"}
								<br />
								{"A2: IRA"}
								<br />
								{"A3: Avaliação do Professor"}
								<br />
								<br />
							</Typography>
							<Typography variant="h5">
								{"0 ≤ A1, A2 , A3 ≤ 5"}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<div className={classes.item}>
							<img
								className={classes.image}
								src={require("../assets/nao-indicado.png")}
								alt="não indicado"
							/>
							<Typography variant="h4" className={classes.title}>
								Aluno sem indicação
							</Typography>
							<Typography variant="h5">
								{"Nota final = 0.6A1 + 0.4A2"}
								<br />
								<br />
								{"A1: Menção (SS=5, MS=4, MM=3)"}
								<br />
								{"A2: IRA"}
								<br />
								<br />
								<br />
							</Typography>
							<Typography variant="h5">
								{"0 ≤ A1, A2 ≤ 5"}
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Container>
		</section>
	);
}

const styles = theme => ({
	root: {
		display: "flex",
		overflow: "hidden",
		backgroundColor: "#FFFFFF",
	},
	container: {
		marginBottom: theme.spacing(5),
		display: "flex",
		position: "relative",
	},
	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 5),
	},
	image: {
		height: 55,
	},
	title: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
	},
	curvyLines: {
		pointerEvents: "none",
		position: "absolute",
		top: -180,
	},
});

GradeDescription.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradeDescription);
