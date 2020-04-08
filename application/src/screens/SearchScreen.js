import * as React from "react";
import { Text, StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import Background from "../components/Background.js";
import Postmin from "../components/Postminified.js";
import MenuBar from "../components/MenuBar.js";
import SearchBar from "../components/SearchBar.js";

import moment from "moment";

export default class Search extends React.Component {

    state = {
        searchValue: "",
        posts: []
    }

    async componentDidMount() {
        let AllPosts = await getAllPost(this.props.route.params.token, this.props.route.params.user.localisation["city"]);
        if(AllPosts) this.setState({posts: AllPosts});
        else console.error(AllPosts);
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
                <SearchBar/>
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
        marginTop: 40,
        marginBottom: 40
    }
});

