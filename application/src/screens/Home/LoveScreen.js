import * as React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import ScalableText from "react-native-text";

import Loader from "../../components/Loader.js";
import Wrapper from "../../components/Wrapper.js";
import Postminified from "../../components/Postminified.js";

import AppContext from "../../context/AppContext.js";

export default class LoveScreen extends React.Component {

    static contextType = AppContext;

    state = {
        posts: [],
        refreshing: false,
        isLoading: true,
        last_refresh: 0
    }

    componentDidMount() {
        this.GetLikedPosts();
    }

    async GetLikedPosts() {
        let params = JSON.stringify({
            selector: {
                "like.users": {
                    "$in": [this.context.user.data["_id"]]
                }
            },
            sort: {
                createdAt: -1,
                like: -1
            },
            limit: 25
        });
        fetch(this.context.API_URL + "/posts/list", {
            headers: {"Accept-Encoding": "gzip, deflate", "content-type" : "application/json; charset=utf-8", "Authorization": this.context.user.token},
            method: "POST",
            body: params
        })
        .then((response) => response.json())
        .then((Data) => {
            if(Data["data"] && Data.success) this.setState({ posts: Data["data"], refreshing: false, isLoading: false });
            else this.setState({ posts: [], refreshing: false, isLoading: false });

        })
        .catch((error) => {
            return console.error(error);
        });
    }

    updatePost(key, post) {
        if(Object.keys(this.state.posts[0]).length > 0) {
            let stateCopy = Object.assign({}, this.state);
            stateCopy.posts[key] = post;
            this.setState(stateCopy);
        }
        else console.log("LoveScreen state update undefined post");
    }

    onRefresh() {
        if((Date.now() - this.state.last_refresh) > 10000) { // Each 10s for refresh data
            this.setState({ refreshing: true, last_refresh: Date.now() });
            this.GetLikedPosts();
        }
    }

    renderPost() {
        if(this.state.isLoading && this.state.posts.length === 0) {
            return (
                <Loader/>
            );
        }
        
        if(!this.state.isLoading && this.state.posts.length === 0) {
            return (
                <ScalableText style={styles.emptyResult}>Vous n'avez aimé aucune publications.</ScalableText> 
            );
        }
        
        if(!this.state.isLoading && this.state.posts.length > 0) {
            return this.state.posts.map((value, i) => {
                return (
                    <Postminified 
                        key={i}
                        _key={i}
                        api_url={this.context.API_URL + "/"}
                        post={value}
                        onPress={() => this.props.navigation.navigate("Post", {
                            key: i,
                            post: value,
                            updatePost: (key, post) => this.updatePost(key, post)
                        })}
                    />
                );
            });
        }
    }

    render() {
        return (
            <Wrapper>
                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    {this.renderPost()}
                </ScrollView>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%"
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