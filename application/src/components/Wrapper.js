import * as React from "react";
import {StyleSheet, Platform} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SafeAreaView from "react-native-safe-area-view";

export default class Wrapper extends React.Component {
	render() {
		return (
			<SafeAreaView style={[styles.view, this.props.style]}>
    		  	{this.props.children}
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		width: "100%",
		paddingTop: (Platform.OS === "android" || Platform.OS === "ios")? getStatusBarHeight() + 2.5: 0,
	}
});
