import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import ScalableText from "react-native-text";
import Container from "./Container.js";
import * as Animatable from "react-native-animatable";

import moment from "moment";

export default class Comment extends React.Component {
    render() {
        return (
            <Animatable.View 
                animation={(this.props._key % 2)? "bounceInLeft": "bounceInRight"}
                duration={1500}
                style={{alignItems: "center"}}>
                <TouchableOpacity onLongPress={() => this.props.onLongPress(this.props.comment)}>
                    <Container style={(this.props.last)? [styles.container, styles.last]: styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity>
                                <Image style={styles.image} source={{ uri: this.props.api_url + this.props.comment.user["profile_pic"] }} />
                            </TouchableOpacity>
                            <View>
                                <ScalableText numberOfLines={1} style={styles.username}>{this.props.comment.user["first_name"]} {this.props.comment.user["last_name"]}</ScalableText>
                                <ScalableText numberOfLines={1} style={styles.date}>{moment.utc(this.props.comment["date"]).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <ScalableText style={styles.message}>{this.props.comment["message"]}</ScalableText>
                        </View>
                    </Container>
                </TouchableOpacity>
            </Animatable.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        margin: 10
    },
    header: {
        width: "100%",
        height: 40,
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 75
    },
    username: {
        width: "100%",
        height: 20,
        color: "black",
        fontSize: 16,
        fontFamily: "VarelaRound",
        paddingLeft: 10,
        marginVertical: 2.50,
        textAlign: "left",
        textAlignVertical: "center"
    },
    date: {
        width: "100%",
        height: 17.5,
        color: "black",
        fontSize: 11,
        fontFamily: "VarelaRound",
        paddingLeft: 10,
        textAlign: "left",
        textAlignVertical: "center"
    },
    content: {
        width: "100%",
        flex: 1
    },
    message: {
        width: "100%",
        color: "black",
        fontSize: 14,
        fontFamily: "VarelaRound",
        textAlign: "left",
        alignSelf: "center"
    },
    last: {
        marginBottom: 70
    }
});
