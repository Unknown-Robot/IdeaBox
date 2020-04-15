import * as React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from "react-native-vector-icons";

export default class BackButton extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.goBack}>
                <MaterialIcons name="arrow-back" color={"black"} size={28} />
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: (Platform.OS === "android" || Platform.OS === "ios")? getStatusBarHeight() + 5: 15,
		width: 48,
		height: 48,
		left: 15,
		zIndex: 999
	},
});