import * as React from "react";
import { TextInput, StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from "react-native-vector-icons";

export default class SearchBar extends React.Component {

    state= {
        inputValue: ""
    }

    render() {
        return (
            <View style={styles.view}>
                <MaterialIcons style={styles.searchIcon} name="search" color={"black"} size={28} />
                <TextInput
                    name="search-bar"
                    style={styles.inputText}
                    placeholder="Recherche par ville ou code postal.."
                    placeholderTextColor="black"
                    value={this.state.inputValue}
                    onChangeText={(value) => this.setState({ inputValue: value })}
                    onSubmitEditing={() => {this.props.searchAction(this.state.inputValue.trim())}}
                />
                <TouchableOpacity style={styles.container} onPress={() => this.setState({ inputValue: "" })}>
                    <MaterialIcons name="close" color={"black"} size={28} />
			    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        top: (Platform.OS === "android" || Platform.OS === "ios")? getStatusBarHeight() + 5: 15,
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "white",
        alignSelf: "center",
        zIndex: 999
    },
    container: {
        position: "absolute",
        top: 5,
        right: 5,
        width: 30,
        height: 30
    },
    searchIcon: {
        position: "absolute",
        top: 5,
        left: 5
    },
    inputText: {
        width: "100%",
        height: 40,
        paddingLeft: 40,
        fontSize: 14,
        fontFamily: "VarelaRound"
    }
});
