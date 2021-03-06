import * as React from "react";
import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

export default class SearchBar extends React.Component {

    state= {
        inputValue: ""
    }

    render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity style={styles.search} onPress={() => this.props.searchAction(this.state.inputValue.trim())}>
                    <MaterialIcons name="search" color={"black"} size={28} />
			    </TouchableOpacity>
                <TextInput
                    name="search-bar"
                    style={styles.inputText}
                    placeholder="Recherche par ville ou code postal.."
                    placeholderTextColor="black"
                    value={this.state.inputValue}
                    onChangeText={(value) => this.setState({ inputValue: value })}
                    onSubmitEditing={() => {this.props.searchAction(this.state.inputValue.trim())}}
                />
                <TouchableOpacity style={styles.reset} onPress={() => this.setState({ inputValue: "" })}>
                    <MaterialIcons name="close" color={"black"} size={28} />
			    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: 40,
        alignSelf: "center",
        borderBottomWidth: 1,
        backgroundColor: "rgb(255, 255, 255)",
        borderBottomColor: "rgb(224, 224, 224)"
    },
    search: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        top: 0,
        left: 0,
        zIndex: 9
    },
    reset: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        top: 0,
        right: 0,
        zIndex: 9
    },
    inputText: {
        width: "100%",
        height: 40,
        paddingHorizontal: 40,
        fontSize: 14,
        fontFamily: "VarelaRound"
    }
});
