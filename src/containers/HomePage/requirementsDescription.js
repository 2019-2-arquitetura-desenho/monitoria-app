import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography/Typography";

function RequirementsDescription(props) {
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
							<Typography variant="h2" className={classes.title}>
								Requisitos do Processo de Monitoria
							</Typography>
							<Typography variant="h6">
								{"1. Ser aluno regularmente matriculado em curso de gradução da Universidade de Brasília;"}
								<br />
								<br />
								{"2. Ter obtido aprovação na disciplina que pleteia a monitoria, demonstrando domínio na mesma;"}
								<br />
								<br />
								{"3. Ter disponibilidade de tempo para atender às atividades programadas;"}
								<br />
								<br />
								{"4. Caso remunerado, não estar usufruindo de qualquer outro tipo de bolsa remunerada "}
								{"oferecida pela Universidade;"}
								<br />
								<br />
								{"5. Os alunos deverão estar matriculados no número de créditos de seu curso, "}
								{"com exceção dos candidatos:"}
								<br />
									{"...5.1 Os bolsistas externos externos de pesquisa e ensino, dos programas CAPEs e CNPq, "}
									{"exclusivamente no caso de monitoria não remunerada, e de Mestrado e Doutorado;"}
								<br />
									{"...5.2 Os alunos de outras universidades nacionais ou estrangeiras, em caráter excepcional e na monitoria"}
									{" não remunerada, somente durante o tempo de permanência na UnB e em virtude de convênios que assim o permitam."}
								<br />
								<br />
								{"6. Para efeito de seleção e exercício de monitoria, os alunos deverão estar matriculados "}
								{"no mínimo de créditos do seu curso."}
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
		backgroundColor: "white",
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
		opacity: 1.0,
	},
});

RequirementsDescription.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequirementsDescription);
