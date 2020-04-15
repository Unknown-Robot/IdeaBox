import * as React from "react";

import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from "react-native";

import ScalableText from "react-native-text";

import moment from "moment";

import Loader from "../../components/Loader.js";

import BackButton from "../../components/BackButton.js";
import Container from "../../components/Container.js";
import Comment from "../../components/Comment.js";
import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

export default class PostScreen extends React.Component {

    static contextType = AppContext;

    state = {
        action: "",
        comment: "",
        post: null
    }

    componentDidMount() {
        if (this.props.route.params && "post" in this.props.route.params) {
            this.setState({ post: this.props.route.params.post });
        }
    }

    async fetchAction(action) {
        action = (action == "up") ? "LIKE" : "DISLIKE";
        let params = JSON.stringify({
            update: {
                "liked_posts": {
                    "post_id": this.state.post["_id"],
                    "action": action
                }
            }
        });
        fetch(this.context.API_URL + "/users/" + this.context.user.data["_id"] + "/update", {
            headers: { "content-type": "application/json; charset=utf-8", "Authorization": this.context.user.token },
            method: "PUT",
            body: params
        })
            .then((response) => response.json())
            .then((Data) => {
                if (!Data) return console.log("Request return empty response.");
                if (Data.success) console.log("Success update");
                else console.log(Data["errors"]);
            })
            .catch((error) => {
                return console.error(error);
            });
    }

    actionPost(action) {
        if (this.state.action === action) return;
        else if (this.state.action && this.state.action !== action) this.state.post[this.state.action] = this.state.post[this.state.action] - 1;
        this.state.post[action] = this.state.post[action] + 1;
        this.setState({ action: action });
        //this.fetchAction(action);
        this.forceUpdate();
    }

    renderComments() {
        if (this.state.post.comments.length > 0) {
            return this.state.post.comments.map((value, i) => {
                return (
                    <Comment
                        key={i}
                        first_name={value.first_name}
                        last_name={value.last_name}
                        date={value.createdAt}
                        message={value.message}
                    />
                );
            });
        }
        else {
            /* return (
                <ScalableText style={styles.emptyComments}>Aucun commentaire.</ScalableText>
            ); */
        }
    }

    render() {
        if(!this.state.post) {
            return (
                <Loader/>
            );
        }
        
        return (
            <Wrapper style={{ alignItems: "center" }}>
                <BackButton goBack={() => this.props.navigation.goBack()} />
                <Container style={{ marginTop: 75, padding: 20 }}>
                    <ScrollView style={styles.scrollView}>
                        <ScalableText style={styles.username}>{this.state.post.user["first_name"]} {this.state.post.user["last_name"]}</ScalableText>
                        <ScalableText style={styles.date}>{moment.utc(this.state.post["createdAt"]).utcOffset("GMT+02:00").format("DD MMMM, HH:mm")}</ScalableText>
                        <ScalableText style={styles.title}>{this.state.post["title"]}</ScalableText>
                        <ScalableText style={styles.description}>{this.state.post["description"]}</ScalableText>
                        {/* <View style={styles.actions}>
                            <TouchableOpacity onPress={() => this.actionPost("up")}>
                                <Image style={(this.state.action === "up")? [styles.imageUp, styles.active] : styles.imageUp} source={require("../assets/arrow_back.png")}/>
                            </TouchableOpacity>
                            <ScalableText style={styles.up}>{this.state.post["up"]}</ScalableText>
                            <TouchableOpacity onPress={() => this.actionPost("down")}>
                                <Image style={(this.state.action === "down")? [styles.imageDown, styles.active] : styles.imageDown} source={require("../assets/arrow_back.png")}/>
                            </TouchableOpacity>
                            <ScalableText style={styles.down}>{this.state.post["down"]}</ScalableText>
                        </View> */}
                    </ScrollView>
                </Container>
                {this.renderComments()}
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        width: "100%"
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
    title: {
        width: "100%",
        color: "black",
        fontSize: 18,
        fontFamily: "VarelaRound",
        textAlign: "left",
        alignSelf: "center",
        marginTop: 25,
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
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
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
        width: 40,
        height: 40,
        transform: [{ rotate: "90deg" }],
        opacity: 0.50
    },
    imageDown: {
        width: 40,
        height: 40,
        transform: [{ rotate: "-90deg" }],
        marginLeft: 7.50,
        opacity: 0.50
    },
    comments: {
        width: "100%",
        color: "black",
        fontSize: 16,
        fontFamily: "VarelaRound",
        textAlign: "left",
        marginTop: 25
    },
    emptyComments: {

    }
});

