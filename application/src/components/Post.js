import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View, ScrollView, Text } from "react-native";
import ScalableText from "react-native-text";
import Container from "./Container.js";
import moment from "moment";
import { MaterialIcons } from "react-native-vector-icons";
import * as Animatable from "react-native-animatable";

export default class Post extends React.Component {
    render() {
        return (
            <Animatable.View 
                animation={"bounceInLeft"}
                duration={1500}
                style={{alignItems: "center"}}>
                <Container style={{ marginTop: 75, padding: 20, marginBottom: 50 }}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <Image style={styles.image} source={{ uri: this.props.api_url + this.props.post.user["profile_pic"] }} />
                        </TouchableOpacity>
                        <View>
                            <ScalableText numberOfLines={1} style={styles.username}>{this.props.post.user["first_name"]} {this.props.post.user["last_name"]}</ScalableText>
                            <ScalableText numberOfLines={1} style={styles.date}>{moment.utc(this.props.post["createdAt"]).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                        </View>
                    </View>
                    <ScalableText style={styles.title}>{this.props.post["title"]}</ScalableText>
                    <ScalableText style={styles.description}>{this.props.post["description"]}</ScalableText>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => this.props.actionPost("like")}>
                            <MaterialIcons style={(this.props.action === "like")? [styles.imageUp, styles.active] : styles.imageUp} name="keyboard-arrow-up" color={"black"} size={40} />
                        </TouchableOpacity>
                        <ScalableText style={styles.up}>{this.props.post["like"]["count"]}</ScalableText>
                        <TouchableOpacity onPress={() => this.props.actionPost("dislike")}>
                            <MaterialIcons style={(this.props.action === "dislike")? [styles.imageDown, styles.active] : styles.imageDown} name="keyboard-arrow-down" color={"black"} size={40} />
                        </TouchableOpacity>
                        <ScalableText style={styles.down}>{this.props.post["dislike"]["count"]}</ScalableText>
                    </View>
                </Container>
            </Animatable.View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 40,
        flex: 1,
        flexDirection: "row",
        marginBottom: 25
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
    title: {
        width: "100%",
        color: "black",
        fontSize: 18,
        fontFamily: "VarelaRound",
        textAlign: "left",
        alignSelf: "center",
        marginBottom: 10
    },
    description: {
        width: "100%",
        color: "black",
        fontSize: 14,
        fontFamily: "VarelaRound",
        marginVertical: 10,
        textAlign: "left",
        alignSelf: "center"
    },
    actions: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    up: {
        width: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    down: {
        width: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        opacity: 1.0
    },
    imageUp: {
        opacity: 0.50
    },
    imageDown: {
        opacity: 0.50
    },
});
