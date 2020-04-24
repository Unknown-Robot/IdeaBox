import * as React from "react";
import { TextInput, StyleSheet } from "react-native";

export default class Input extends React.Component {
    render() {
        return (
            <TextInput
                style={[styles.inputText, this.props.style]}
                defaultValue={this.props.defaultValue}
                placeholder={this.props.children}
                placeholderTextColor="black"
                onChangeText={(value) => this.props.updateData(value)}
                secureTextEntry={(this.props.type != "password")? false: true}
            />
        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        width: "100%",
        minHeight: 50,
        marginVertical: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        fontSize: 14,
        fontFamily: "VarelaRound"
    }
});