import * as React from "react";
import { StyleSheet } from "react-native";
import ScalableText from "react-native-text";
import Container from "./Container.js";

import moment from "moment";

export default class Comment extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <ScalableText style={styles.username}>{this.props.first_name} {this.props.last_name}</ScalableText>
                <ScalableText style={styles.date}>{moment.utc(this.props.date).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                <ScalableText style={styles.message}>{this.props.message}</ScalableText>
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        borderRadius: 15
    },
    username: {
        width: "100%",
        color: "black",
        fontSize: 16,
        fontFamily: "VarelaRound",
        marginBottom: 5,
        textAlign: "left",
    },
    date: {
        width: "100%",
        color: "black",
        fontSize: 11,
        fontFamily: "VarelaRound",
        textAlign: "left",
    },
    message: {
        width: "100%",
        color: "black",
        fontSize: 14,
        fontFamily: "VarelaRound",
        textAlign: "left",
        alignSelf: "center",
        marginTop: 25,
    }
});
