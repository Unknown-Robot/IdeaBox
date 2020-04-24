import * as React from "react";
import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

export default class CommentBar extends React.Component {

    state= {
        inputValue: ""
    }

    sendComment() {
        if(!this.state.inputValue.trim()) return null;
        this.props.sendComment(this.state.inputValue.trim());
        this.setState({ inputValue: "" });
    }

    render() {
        return (
            <View style={styles.view}>
                <TextInput
                    name="search-bar"
                    style={styles.inputText}
                    placeholder="Votre commentaire.."
                    placeholderTextColor="black"
                    value={this.state.inputValue}
                    onChangeText={(value) => this.setState({ inputValue: value })}
                    onSubmitEditing={() => this.sendComment()}
                />
                <TouchableOpacity style={styles.send} onPress={() => this.sendComment()}>
                    <MaterialIcons name="send" color={"black"} size={28} />
			    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 60,
        alignSelf: "center",
        borderTopWidth: 1,
        backgroundColor: "rgb(255, 255, 255)",
        borderTopColor: "rgb(224, 224, 224)"
    },
    send: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        top: 0,
        right: 0,
        zIndex: 9
    },
    inputText: {
        width: "100%",
        height: 60,
        paddingLeft: 15,
        paddingRight: 40,
        fontSize: 14,
        fontFamily: "VarelaRound"
    }
});
