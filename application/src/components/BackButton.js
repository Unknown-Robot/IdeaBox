import * as React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from "react-native-vector-icons";

import * as Animatable from "react-native-animatable";

export default class BackButton extends React.Component {
	render() {
		return (
			<Animatable.View 
                animation={"fadeIn"}
                duration={1500}
				style={styles.container}>
				<TouchableOpacity onPress={this.props.goBack}>
					<MaterialIcons name="arrow-back" color={"black"} size={28} />
				</TouchableOpacity>
			</Animatable.View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: (Platform.OS === "android" || Platform.OS === "ios")? getStatusBarHeight(): 0,
		width: 48,
		height: 48,
		left: 15,
		zIndex: 999
	},
});