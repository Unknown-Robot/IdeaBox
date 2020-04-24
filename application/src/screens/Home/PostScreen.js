import * as React from "react";

import Loader from "../../components/Loader.js";

import { StyleSheet, ScrollView } from "react-native";

import BackButton from "../../components/BackButton.js";
import Comment from "../../components/Comment.js";
import Wrapper from "../../components/Wrapper.js";
import Post from "../../components/Post.js";
import CommentBar from "../../components/CommentBar.js";

import AppContext from "../../context/AppContext.js";

export default class PostScreen extends React.Component {

    static contextType = AppContext;

    state = {
        action: "",
        last_action: 0,
        post: null
    }

    componentDidMount() {
        this.setState({ post: this.props.route.params.post, action: this.getLatestAction() });
    }

    getLatestAction() {
        if(this.props.route.params.post["like"]["count"] === 0 && this.props.route.params.post["dislike"]["count"] === 0) return "";

        if(this.props.route.params.post["like"]["users"].indexOf(this.context.user.data["_id"]) !== -1) return "like";
        else if(this.props.route.params.post["dislike"]["users"].indexOf(this.context.user.data["_id"]) !== -1) return "dislike";
        return "";
    }

    async fetchAction(action) {
        let params = JSON.stringify({
            "user_id": this.context.user.data["_id"],
            "action": action
        });
        fetch(this.context.API_URL + "/posts/" + this.state.post["_id"] + "/action", {
            headers: { "content-type": "application/json; charset=utf-8", "Authorization": this.context.user.token },
            method: "PUT",
            body: params
        })
        .then((response) => response.json())
        .then((Data) => {
            if(!Data) return console.log("Request return empty response.");
            if(Data.success) {
                if(action.includes("reset")) action = "";
                else if(action.includes("-")) action = action.split("-")[1];
                this.setState({ post: Data["data"], action: action, last_action: Date.now() });
                this.props.route.params.updatePost(this.props.route.params.key, Data["data"]);
            }
            else console.log(Data["message"]);
        })
        .catch((error) => {
            return console.error(error);
        });
    }

    newComment(message) {
        this.fetchComment(JSON.stringify({
            "update": {
                "$inc": {
                    "comment.count": 1
                },
                "$push": {
                    "comment.comments": {
                        "user": {
                            "_id": this.context.user.data["_id"]
                        },
                        "message": message
                    }
                }
            },
            "options": {
                "upsert": "true",
                "new": "true"
            }
        }));
    }

    deleteComment(comment) {
        if(comment.user._id !== this.context.user.data["_id"]) return null;
        this.fetchComment(JSON.stringify({
            "update": {
                "$inc": {
                    "comment.count": -1
                },
                "$pull": {
                    "comment.comments": {
                        "_id": comment._id
                    }
                }
            },
            "options": {
                "new": "true",
                "multi": "true"
            }
        }));
    }

    fetchComment(params) {
        fetch(this.context.API_URL + "/posts/" + this.state.post["_id"] + "/update", {
            headers: { "content-type": "application/json; charset=utf-8", "Authorization": this.context.user.token },
            method: "PUT",
            body: params
        })
        .then((response) => response.json())
        .then((Data) => {
            if(!Data) return console.log("Request return empty response.");
            if(Data.success) {
                this.setState({ post: Data["data"] });
                this.props.route.params.updatePost(this.props.route.params.key, Data["data"]);
            }
            else console.log(Data["message"]);
        })
        .catch((error) => {
            return console.error(error);
        });
    }

    actionPost(action) {
        if(!action || (Date.now() - this.state.last_action) < 2500) {
            return null;
        }

        if(this.state.action && this.state.action === action) return this.fetchAction("reset-" + action);
        if(this.state.action) return this.fetchAction(this.state.action + "-" + action);
        else return this.fetchAction(action);
    }

    renderComments() {
        if(this.state.post.comment.count > 0) {
            return this.state.post.comment.comments.map((value, i) => {
                return (
                    <Comment
                        key={i}
                        _key={i}
                        api_url={this.context.API_URL + "/"}
                        comment={value}
                        last={(i === this.state.post.comment.comments.length - 1)? true: false}
                        onLongPress={(comment) => this.deleteComment(comment)}
                    />
                );
            });
        }
    }

    render() {
        if(!this.state.post) {
            return (
                <Loader/>
            );
        }
        
        return (
            <Wrapper>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <BackButton goBack={() => this.props.navigation.goBack()}/>
                    <Post
                        api_url={this.context.API_URL + "/"}
                        post={this.state.post}
                        action={this.state.action}
                        actionPost={(action) => this.actionPost(action)}/>
                    {this.renderComments()}
                </ScrollView>
                <CommentBar sendComment={(message) => this.newComment(message)}/>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%"
    },
    emptyComments: {

    }
});

