import * as React from "react";
import { Text, StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import Background from "../components/Background.js";
import SearchBar from "../components/SearchBar.js";
import Postmin from "../components/Postmin.js";
import MenuBar from "../components/MenuBar.js";

import { wait } from "../core/utils.js";

import moment from "moment";

import { getAllPost, getAllPostByCity } from "../models/post.js";

export default class Home extends React.Component {

    state = {
        searchValue: (this.props.route.params.user)? this.props.route.params.user["city"]: ""
    }

    renderPost() {
        let AllPost = (this.state.searchValue == "")? getAllPost(): getAllPostByCity(this.state.searchValue);
        if(AllPost.length > 0) {
            return AllPost.map((value, i) => {
                let last = (i === AllPost.length - 1)? "true": "false"
                return (
                    <Postmin 
                        key={i}
                        _id={value._id}
                        title={value.title}
                        description={value.description}
                        last={last}
                        up={value.up}
                        down={value.down}
                        date={moment.unix(value.created_at/1000).format("DD/MM/YYYY")}
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
                <SearchBar
                    default={this.state.searchValue}
                    updateSearch={(value) => this.setState({searchValue: value})}
                />
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

