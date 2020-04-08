import * as React from "react";
import { Text, StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import Background from "../components/Background.js";
import Postminified from "../components/Postminified.js";
import MenuBar from "../components/MenuBar.js";
import moment from "moment";

export default class Home extends React.Component {

    state = {
        posts: [],
        refreshing: false
    }

    async componentDidMount() {
        let params = JSON.stringify({
            selector: {
                localisation: {
                    city: this.props.route.params.user.localisation["city"]
                },
            },
            sort: {
                up: -1
            },
            limit: 25
        });
        fetch("http://localhost:3000/posts/list?" + encodeURI(params), {
            headers: {"content-type" : "application/json; charset=utf-8", "Authorization": "Bearer " + this.props.route.params.token},
            method: "GET"
        })
        .then((response) => response.json())
        .then((Data) => {
            if(!Data || (Data && Data["data"].length === 0)) return console.log("Empty posts.");
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

    /* onRefresh() {
        console.log("Refresh page..");
        this.setState({refreshing: true});
        getAllPost(this.props.route.params.token, this.props.route.params.user.localisation["city"]).then((AllPosts) => {
            if(AllPosts) this.setState({posts: AllPosts});
            this.setState({refreshing: false});
        }).catch((error) => {
            console.log(error);
            this.setState({refreshing: false});
        });
    } */

    renderPost() {
        if(this.state.posts.length > 0) {
            return this.state.posts.map((value, i) => {
                let last = (i === this.state.posts.length - 1)? "true": "false"
                return (
                    <Postminified 
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
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    } */
                >
                    <Text style={styles.welcome}>
                        Voici les demandes les plus récentes dans votre ville {this.props.route.params.user.localisation["city"]}
                    </Text>
                    {this.renderPost()}
                </ScrollView>
                <MenuBar {...this.props}/>
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
        marginTop: 10,
        marginBottom: 40
    },
    welcome: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 40,
        textAlign: "left",
        fontSize: 18
    }
});

