import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

export default class AddPostButton extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.addPress}>
				<MaterialIcons name="add-circle-outline" color={"black"} size={48}/>
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		flex: 1,
        alignItems: "center",
		justifyContent: "center",
		width: 48,
		height: 48,
		bottom: 20,
		right: 20,
		backgroundColor: "white",
		borderRadius: 100,
		zIndex: 999
	}
});
