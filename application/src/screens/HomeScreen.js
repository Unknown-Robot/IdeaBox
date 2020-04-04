import * as React from "react";
import { Text, StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import Background from "../components/Background.js";
import Postmin from "../components/Postmin.js";
import MenuBar from "../components/MenuBar.js";

import moment from "moment";

import { getAllPost } from "../models/post.js";

export default class Home extends React.Component {

    state = {
        posts: []
    }

    async componentDidMount(){
        let AllPost = await getAllPost(this.props.route.params.token, this.props.route.params.user.localisation["city"]);
        if(AllPost.success) {
            AllPost["data"].sort(function(a, b) { return b["up"] - a["up"]});
            this.setState({posts: AllPost["data"]});
        }
        else throw new Error("Error get all posts data.");
    }

    renderPost() {
        if(this.state.posts.length > 0) {
            return this.state.posts.map((value, i) => {
                let last = (i === this.state.posts.length - 1)? "true": "false"
                return (
                    <Postmin 
                        key={i}
                        _id={value._id}
                        title={value.title}
                        description={value.description}
                        last={last}
                        up={value.up}
                        down={value.down}
                        date={moment.utc(value.createdAt).format("DD/MM/YYYY")}
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
                <Text style={styles.emptyResult}>Aucun résultat.</Text>
            );
        }
    }

    render() {
        return (
            <Background mode="no-padding">
                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                    /* refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh()}
                        />
                    } */
                >
                    {this.renderPost()}
                </ScrollView>
                <MenuBar/>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    emptyResult: {
        flex: 1,
        width: "100%",
        textAlign: "center",
        marginTop: 30,
        fontSize: 18
    },
    scrollView: {
        width: "100%",
        zIndex: 99,
        overflow: "hidden",
        marginTop: 40,
        marginBottom: 40
    }
});

