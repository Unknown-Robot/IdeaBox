import * as React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Background from "../components/Background.js";
import BackArrow from "../components/BackArrow.js";

export default class Post extends React.Component {

    state = {
        
    }

    render() {
        let Post = this.props.route.params.post;
        return (
            <Background mode="no-padding">
                <BackArrow goBack={() => this.props.navigation.navigate("Home")}/>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{Post["title"]}</Text>
                    <Text style={styles.description}>{Post["description"]}</Text>
                    
                </ScrollView>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        color: "black",
        fontSize: 18,
        marginTop: 25,
        textAlign: "left",
        alignSelf: "center"
    },
    description: {
        width: "100%",
        color: "black", 
        fontSize: 14,
        marginTop: 25,
        textAlign: "left",
        alignSelf: "center"
    },
    scrollView: {
        width: "100%",
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
});

