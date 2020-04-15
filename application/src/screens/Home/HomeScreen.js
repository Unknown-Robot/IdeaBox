import * as React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import ScalableText from "react-native-text";
import Postminified from "../../components/Postminified.js";
import AddPostButton from "../../components/AddPostButton.js";
import Loader from "../../components/Loader.js";
import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

export default class HomeScreen extends React.Component {

    static contextType = AppContext;

    state = {
        posts: [],
        isLoading: true,
        refreshing: false,
        last_refresh: 0
    }

    componentDidMount() {
        this.getAllPost();
    }

    getAllPost() {
        let params = JSON.stringify({
            selector: {
                "localisation.city": this.context.user.data.localisation["city"],
                "localisation.zip_code": this.context.user.data.localisation["zip_code"]
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
                this.setState({ posts: Data["data"], refreshing: false, isLoading: false })
            }
            else console.log(Data["errors"]);
        })
        .catch((error) => {
            return console.error(error);
        });
    }

    onRefresh() {
        if((Date.now() - this.state.last_refresh) > 10000) { // Each 10s for refresh data
            this.setState({ refreshing: true, last_refresh: Date.now() });
            this.getAllPost();
        }
    }

    renderPost() {
        if(!this.state.isLoading && this.state.posts.length > 0) {
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
                <Loader>
                    {/* <ScalableText style={styles.emptyResult}>Aucun résultat.</ScalableText> */}
                </Loader>
            );
        }
    }

    render() {
        return (
            <Wrapper style={{ alignItems: "center" }}>
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
                <AddPostButton addPress={() => this.props.navigation.navigate("AddPost")}/>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%",
        marginTop: 60
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

