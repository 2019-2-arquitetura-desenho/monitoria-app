import React from "react";
import { connect } from "react-redux";
import { getProfile, logout } from "../store/actions";

import GradeDescription from "./HomePage/gradeDescription";
import RequerimentsDescription from "./HomePage/requirementsDescription";
import RegisterHome from "./HomePage/registerHome";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		await this.props.getProfile(this.props.token);
	}

	render() {
		return (
			<React.Fragment>
				<RegisterHome />
				<RequerimentsDescription />
				<GradeDescription />
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		userData: state.authentication.userData,
		token: state.authentication.token,
		profileData: state.userProfile.profileData,
	};
}

export const homeContainer = connect(mapStateToProps, { getProfile, logout })(
	Home,
);

export default homeContainer;
