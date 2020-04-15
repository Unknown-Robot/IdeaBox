import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import ScalableText from "react-native-text";
import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

export default class SettingScreen extends React.Component {

    static contextType = AppContext;

    state = {
    }

    render() {
        return (
            <Wrapper style={{ alignItems: "center" }}>
                <View style={styles.image_container}>
                    <TouchableOpacity style={styles.profile_pic}>
                        <Image style={styles.image} source={{ uri: this.context.API_URL + "/" + this.context.user.data["profile_pic"] }} />
                    </TouchableOpacity>
                    <ScalableText style={styles.username}>{this.context.user.data["first_name"]} {this.context.user.data["last_name"]}</ScalableText>
                </View>
                <View style={styles.list_container}>
                    <ScalableText style={styles.text_list}>Modifier le compte</ScalableText>
                    <ScalableText style={styles.text_list}>Mode nuit</ScalableText>
                    <ScalableText style={[styles.text_list, styles.logout]} onPress={() => this.context.setUser({data: null, token: null})}>Déconnexion</ScalableText>
                </View>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    image_container: {
        width: "100%",
        maxHeight: 150,
        flex: 1,
        alignItems: "center",
        marginTop: 25,
        marginBottom: 50
    },
    profile_pic: {
        width: 100,
        height: 100,
        borderRadius: 75
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 75
    },
    list_container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    username: {
        color: "black",
        fontSize: 26,
        fontFamily: "VarelaRound",
        textAlign: "center",
        marginTop: 25
    },
    text_list: {
        width: "100%",
        color: "black",
        fontSize: 18,
        fontFamily: "VarelaRound",
        textAlign: "center",
        marginBottom: 15
    },
    logout: {
        color: "#c83737",
    }
});

