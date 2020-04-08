import * as React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Background from "./Background";

export default class AddPostButton extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.goTo}>
				<Image style={styles.image} source={require("../assets/add.png")} />
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: 36,
		height: 36,
		bottom: 50,
		right: 15,
		zIndex: 999,
		backgroundColor: "white",
		borderRadius: 50
	},
	image: {
		width: 36,
		height: 36,
	},
});
