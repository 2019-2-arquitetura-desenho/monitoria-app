import React from "react";
import { connect } from "react-redux";

import { getProfile, restartGetProfile } from "../../store/actions";

import RegisterHome from "./registerHome";
import GradeDescription from "./gradeDescription";
import RequerimentsDescription from "./requirementsDescription";

import { Grid } from '@material-ui/core';


class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isRequestDone: false,
		};
	}

	content(){
		if(!this.props.profileData){

			if (this.props.requisitionError){
				this.props.restartGetProfile();
			}

			if (!this.state.isRequestDone){
				this.props.getProfile(this.props.token);

				this.setState({
					isRequestDone: true
				});
			}

			return (
				<Grid container>
					<Grid item xs={12}>
						<h2 style={{color:"#ff0000", textAlign: "center", marginTop: "4%"}}>
							Erro! Verifique sua conexão com a internet.
						</h2>
					</Grid>
				</Grid>
			);
		} else {
			if (this.props.profileData.is_professor){
				return (
					<React.Fragment>
						<GradeDescription />
						<RequerimentsDescription />
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment>
						<RequerimentsDescription />
						<GradeDescription />
					</React.Fragment>
				);
			}
		}
	}

	render() {
		const { isAuthenticated } = this.props;

		if (!isAuthenticated){
			return (
				<React.Fragment>
					<RegisterHome isAuthenticated = {false}/>
					<RequerimentsDescription />
					<GradeDescription />
				</React.Fragment>
			);
		} else {
			return(
				<React.Fragment>
					<RegisterHome isAuthenticated = {true} />
					{this.content()}
				</React.Fragment>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		token: state.authentication.token,
		isAuthenticated: state.authentication.isAuthenticated,
		profileData: state.userProfile.profileData,
		requisitionError: state.userProfile.requisitionError
	};
}

export const homeContainer = connect(
	mapStateToProps,
	{ getProfile, restartGetProfile }
)(Home);

export default homeContainer;
