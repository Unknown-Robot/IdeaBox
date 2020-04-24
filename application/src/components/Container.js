import * as React from "react";
import {StyleSheet, View} from "react-native";
import { screenWidth } from "../core/utils.js";

export default class Container extends React.Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
        width: screenWidth() - 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
	}
});
