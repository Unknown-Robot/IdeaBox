import * as React from "react";
import { StyleSheet, View } from "react-native";

export default class Titleline extends React.Component {
    render() {
        return (
            <View style={[styles.line, {width: this.props.size}]}/>
        );
    }
};

const styles = StyleSheet.create({
    line: {
        borderTopWidth: 1.50,
        borderColor: "black",
        borderRadius: 15,
        marginVertical: 5
    }
});
