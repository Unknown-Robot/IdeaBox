import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ScalableText from "react-native-text";
import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

export default class LoveScreen extends React.Component {

    static contextType = AppContext;

    state = {
        posts: []
    }

    GetLikedPosts(Liked_Posts) {
        let posts = [];
        Liked_Posts.forEach(function(post) {
            if(post["actions"] === "LIKE") liked_posts_selector.push(post["post_id"]);
        });
        return posts
    }

    async componentDidMount() {
        if(this.context.user.data.liked_posts.length === 0) return;
        let params = JSON.stringify({
            selector: {
                "_id": {
                    "$in": this.GetLikedPosts(this.context.user.data.liked_posts)
                }
            },
            sort: {
                up: -1
            },
            limit: 25
        });
        fetch(this.context.API_URL + "/posts/list", {
            headers: {"content-type" : "application/json; charset=utf-8", "Authorization": this.context.user.token},
            method: "POST",
            body: params
        })
        .then((response) => response.json())
        .then((Data) => {
            if(!Data["data"]) return console.log("Empty posts.");
            if(Data.success) {
                Data["data"].sort(function(a, b) { return b["up"] - a["up"]}); // Sort by asc "up" key
                this.setState({posts: Data["data"]});
            }
            else console.log(Data["errors"]);
        })
        .catch((error) => {
            return console.error(error);
        });
    }

    renderPost() {
        if(this.state.posts.length > 0) {
            return this.state.posts.map((value, i) => {
                let last = (i === this.state.posts.length - 1)? "true": "false"
                return (
                    <Postminified 
                        key={i}
                        _key={i}
                        _id={value._id}
                        title={value.title}
                        description={value.description}
                        last={last}
                        up={value.up}
                        down={value.down}
                        date={value.createdAt}
                        comments={value.comments}
                        onPress={() => this.props.navigation.navigate("Post", {
                            post: value
                        })}
                    />
                );
            });
        }
        else {
            return (
                <ScalableText style={styles.emptyResult}>Vous n'avez aimé aucune publications.</ScalableText>
            );
        }
    }

    render() {
        return (
            <Wrapper style={{ alignItems: "center" }}>
                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderPost()}
                </ScrollView>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
    },
    emptyResult: {
        flex: 1,
        width: "100%",
        textAlign: "center",
        marginTop: 30,
        fontSize: 18,
        fontFamily: "VarelaRound"
    }
});

