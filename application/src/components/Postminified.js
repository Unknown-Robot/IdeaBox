import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import ScalableText from "react-native-text";
import Container from "./Container.js";
import moment from "moment";
import * as Animatable from "react-native-animatable";

export default class Postminified extends React.Component {
    render() {
        return (
            <Animatable.View 
                animation={(this.props._key % 2)? "bounceInLeft": "bounceInRight"}
                duration={1500}>
                <TouchableOpacity style={[
                    styles.post,
                    this.props.style,
                    this.props.last === "true" && {
                        borderBottomWidth: 0,
                    }
                ]} {...this.props}>
                    <Container style={styles.container}>
                        <ScalableText style={styles.title} numberOfLines={2}>{this.props.title}</ScalableText>
                        <ScalableText style={styles.description} numberOfLines={4}>{this.props.description}</ScalableText>
                        <View style={styles.actionsContainer}>
                            <View style={styles.actionsView}>
                                <Image style={styles.imageUp} source={require("../assets/arrow_back.png")} />
                                <ScalableText style={styles.up}>{this.props.up}</ScalableText>
                                <Image style={styles.imageDown} source={require("../assets/arrow_back.png")} />
                                <ScalableText style={styles.down}>{this.props.down}</ScalableText>
                                <Image style={styles.imageComments} source={require("../assets/bulle.png")} />
                                <ScalableText style={styles.comments}>{this.props.comments.length}</ScalableText>
                            </View>
                            <ScalableText style={styles.date}>{moment.utc(this.props.date).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                        </View>
                    </Container>
                </TouchableOpacity>
            </Animatable.View>
        );
    }
};

const styles = StyleSheet.create({
    post: {
        margin: 10
    },
    container: {
        width: "100%",
        padding: 20,
        borderRadius: 15
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
        minWidth: 15,
        marginLeft: 5,
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
    },
    down: {
        minWidth: 15,
        marginLeft: 5,
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
    },
    comments : {
        minWidth: 15,
        marginLeft: 5,
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
    },
    imageUp: {
		width: 24,
        height: 24,
        transform: [{rotate: "90deg"}],
    },
    imageDown: {
		width: 24,
        height: 24,
        transform: [{rotate: "-90deg"}],
        marginLeft: 7.50,
    },
    imageComments: {
        width: 20,
        height: 20,
        marginLeft: 7.50,
        marginTop: 4
    },
    date: {
        width: "40%",
        color: "black",
        fontSize: 12,
        fontFamily: "VarelaRound",
        textAlign: "right",
    },
});
