import * as React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

import Wrapper from "../components/Wrapper.js";

export default class Loader extends React.Component {
	render() {
		return (
			<Wrapper>
				<ActivityIndicator style={styles.loading} size="large" color="#333333" />
			</Wrapper>
		);
	};
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: "center",
        justifyContent: "center"
    }
});
