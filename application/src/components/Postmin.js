import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";

export default class Postmin extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[
                styles.post, 
                this.props.style,
                this.props.last === "true" && {
                    borderBottomWidth: 0,
                }
            ]} {...this.props}>
	        	<View style={styles.topView}>
                    <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
                </View>
                <View style={styles.middleView}>
                    <Text style={styles.description} numberOfLines={4}>{this.props.description}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Image style={styles.imageUp} source={require("../assets/arrow_back.png")} />
                    <Text style={styles.up}>{this.props.up}</Text>
                    <Image style={styles.imageDown} source={require("../assets/arrow_back.png")} />
                    <Text style={styles.down}>{this.props.down}</Text>
                    <Image style={styles.imageComments} source={require("../assets/bulle.png")} />
                    <Text style={styles.comments}>{this.props.comments.length}</Text>
                </View>
                <Text style={styles.date}>{this.props.date}</Text>
	        </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    post: {
        width: "100%",
        height: 160,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "black",

        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        width: "100%",
        height: 30,
        color: "black",
        fontSize: 14,
        textAlign: "left",
        alignSelf: "center"
    },
    topView: {
        width: "100%",
        height: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    middleView: {
        width: "100%",
        height: 60,
        margin: 10,
        alignSelf: "flex-start"
    },
    description: {
        width: "100%",
        maxHeight: 60,
        color: "black",
        fontSize: 11,
        textAlign: "left",
    },
    bottomView: {
        width: "70%",
        height: 50,
        flex: 1, 
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 10
    },
    up : {
        minWidth: 15,
        marginLeft: 5,
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
    },
    down : {
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
		width: 25,
        height: 25,
        transform: [{rotate: "90deg"}],
    },
    imageDown: {
		width: 25,
        height: 25,
        transform: [{rotate: "-90deg"}],
        marginLeft: 10,
    },
    imageComments: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    date: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "black",
        fontSize: 12,
        textAlign: "center",
        marginRight: 10,
        marginBottom: 20
    },
});
