import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button, this.props.style]} {...this.props}>
	        	<Text style={styles.text}>{this.props.children}</Text>
	        </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        maxWidth: 340,
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 25
    },
    text: {
        width: "100%",
        height: "100%",
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 35,
        textAlign: "center"
    }
});
