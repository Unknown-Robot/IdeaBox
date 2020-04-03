import * as React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default class BackButton extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.goBack}>
				<Image style={styles.image} source={require("../assets/arrow_back.png")} />
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 15,
		left: 15,
		zIndex: 999
	},
	image: {
		width: 24,
		height: 24,
	},
});
