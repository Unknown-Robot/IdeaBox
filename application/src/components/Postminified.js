import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import ScalableText from "react-native-text";
import Container from "./Container.js";
import moment from "moment";
import { MaterialIcons } from "react-native-vector-icons";
import * as Animatable from "react-native-animatable";

export default class Postminified extends React.Component {

    render() {
        return (
            <Animatable.View 
                animation={(this.props._key % 2)? "bounceInLeft": "bounceInRight"}
                duration={1500}
                style={{alignItems: "center"}}>
                <TouchableOpacity onPress={this.props.onPress} onLongPress={() => console.log("Postminified : _id: '" + this.props.post._id + "' onLongPress !")}>
                    <Container style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity>
                                <Image style={styles.image} source={{ uri: this.props.api_url + this.props.post.user["profile_pic"] }} />
                            </TouchableOpacity>
                            <View>
                                <ScalableText numberOfLines={1} style={styles.username}>{this.props.post.user["first_name"]} {this.props.post.user["last_name"]}</ScalableText>
                                <ScalableText numberOfLines={1} style={styles.date}>{moment.utc(this.props.post["createdAt"]).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                            </View>
                        </View>
                        <ScalableText style={styles.title} numberOfLines={2}>{this.props.post["title"]}</ScalableText>
                        <ScalableText style={styles.description} numberOfLines={4}>{this.props.post["description"]}</ScalableText>
                        <View style={styles.actionsContainer}>
                            <View style={styles.actionsView}>
                                <MaterialIcons name="keyboard-arrow-up" color={"black"} size={24} />
                                <ScalableText style={styles.up}>{this.props.post["like"]["count"]}</ScalableText>
                                <MaterialIcons name="keyboard-arrow-down" color={"black"} size={24} />
                                <ScalableText style={styles.down}>{this.props.post["dislike"]["count"]}</ScalableText>
                                <MaterialIcons style={{ padding: 4 }} name="mode-comment" color={"black"} size={20} />
                                <ScalableText style={styles.comments}>{this.props.post["comment"]["count"]}</ScalableText>
                            </View>
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
    title: {
        width: "100%",
        color: "black",
        fontSize: 18,
        minHeight: 30,
        marginBottom: 10,
        fontFamily: "VarelaRound",
        textAlign: "left",
        alignSelf: "center"
    },
    description: {
        width: "100%",
        color: "black",
        fontSize: 14,
        marginBottom: 10,
        fontFamily: "VarelaRound",
        textAlign: "left",
    },
    actionsContainer: {
        width: "100%",
        height: 30,
        marginTop: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    actionsView: {
        width: "60%",
        height: 30,
        flex: 1, 
        flexDirection: "row",
        alignItems: "center",
    },
    up: {
        width: 24,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    down: {
        width: 24,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    comments : {
        width: 24,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    }
});
