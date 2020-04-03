import * as React from "react";
import {StyleSheet, KeyboardAvoidingView, View, Platform} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";


export default class Background extends React.Component {
	render() {
		return (
			<View style={[styles.background, this.props.style]}>
				<KeyboardAvoidingView
					style={[
						styles.container,
						this.props.mode === "no-padding" && {
							padding: 0,
							height: "auto",
						}
					]}
					behavior = "padding"
				>
    		  		{this.props.children}
				</KeyboardAvoidingView>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		backgroundColor: "white",
		paddingTop: (Platform.OS === "android" || Platform.OS === "ios")? getStatusBarHeight() + 2.5: 0
	},
	container: {
		flex: 1,
		padding: 5,
		width: "100%",
		maxWidth: 400,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	nopadding: {
		padding: 0
	}
});
