import React from "react";
import { connect } from "react-redux";

import { getProfile, logout } from "../../store/actions";

import RegisterHome from "./registerHome";
import GradeDescription from "./gradeDescription";
import RequerimentsDescription from "./requirementsDescription";


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	content(){
		if(!this.props.profileData){
			this.props.getProfile(this.props.token);
			return <div></div>
		}
		else{
			if (this.props.profileData.is_professor){
				return (
						 <React.Fragment>
							<GradeDescription />
							<RequerimentsDescription />
						</React.Fragment>
				);
			}
			else{
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
		isAuthenticated: state.authentication.isAuthenticated,
		profileData: state.userProfile.profileData,
		token: state.authentication.token,
	};
}

export const homeContainer = connect(mapStateToProps, { getProfile, logout })(Home);

export default homeContainer;
