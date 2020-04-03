import * as React from "react";
import { TextInput, StyleSheet, Image, View } from "react-native";

export default class SearchBar extends React.Component {

    render() {
        return (
            <View style={styles.view}>
                <Image style={styles.searchIcon} source={require("../assets/search.png")}/>
                <TextInput
                    name="search-bar"
                    style={styles.inputText}
                    placeholder={(typeof(this.props.default) != "undefined")? this.props.default : ""}
                    placeholder="Recherche par ville ou code postal.."
                    placeholderTextColor="black"
                    value={this.props.default}
                    onChangeText={(value) => {this.props.updateSearch(value)}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: "white",
        alignSelf: "center",
        zIndex: 999
    },
    searchIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        margin: 10,
    },
    inputText: {
        width: "100%",
        height: 40,
        paddingLeft: 40,
    },
});
