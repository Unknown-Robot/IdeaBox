import * as React from "react";
import { StyleSheet, View } from "react-native";
import ScalableText from "react-native-text";

export default class Titleline extends React.Component {
    render() {
        return (
            <View>
                <ScalableText style={styles.title}>{this.props.children}</ScalableText>
                <View style={[styles.line, {width: this.props.size}]}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontSize: 21,
        fontFamily: "VarelaRound",
        textAlign: "center",
        paddingBottom: 5
    },
    line: {
        alignContent: "center",
        alignItems: "center",
        borderBottomWidth: 1.00,
        borderColor: "black"
    }
});
