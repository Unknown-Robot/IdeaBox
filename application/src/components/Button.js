import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ScalableText from "react-native-text";

export default class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity 
                style={this.props.type === "outlined" ? [styles.button, styles.outlined, this.props.style] : [styles.button, styles.filled, this.props.style]} 
                {...this.props}>
	        	<ScalableText style={this.props.type === "outlined" ? [styles.text, {color: "#22215b"}]: [styles.text, {color: "white"}]}>
                    {this.props.children}
                </ScalableText>
	        </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        maxWidth: 340,
        height: 50,
        marginVertical: 7.50,
        borderRadius: 10
    },
    text: {
        width: "100%",
        height: 50,
        fontSize: 19,
        fontFamily: "VarelaRound",
        lineHeight: 50,
        textAlign: "center"
    },
    filled: {
        backgroundColor: "#22215b",
    },
    outlined: {
        borderWidth: 2,
        borderColor: "#22215b",
    }
});
