import * as React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Background from "../components/Background.js";
import MenuBar from "../components/MenuBar.js";

import moment from "moment";

export default class Setting extends React.Component {

    state = {
    }

    render() {
        return (
            <Background mode="no-padding">
                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                >
                    TODO TEXT BUTTON
                </ScrollView>
                <MenuBar/>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    emptyResult: {
        flex: 1,
        width: "100%",
        textAlign: "center",
        marginTop: 30,
        fontSize: 18
    },
    scrollView: {
        width: "100%",
        zIndex: 99,
        overflow: "hidden",
        marginTop: 40,
        marginBottom: 40
    }
});

