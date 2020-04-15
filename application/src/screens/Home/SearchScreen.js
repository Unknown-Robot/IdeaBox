import * as React from "react";
import { StyleSheet, ScrollView, RefreshControl} from "react-native";
import ScalableText from "react-native-text";
import Postminified from "../../components/Postminified.js";
import SearchBar from "../../components/SearchBar.js";
import Loader from "../../components/Loader.js";
import Wrapper from "../../components/Wrapper.js";

import { isNullorEmpty } from "../../core/utils.js";

import AppContext from "../../context/AppContext.js";

export default class SearchScreen extends React.Component {

    static contextType = AppContext;

    state = {
        isLoading: false,
        searchValue: "",
        refreshing: false,
        last_refresh: 0,
        posts: []
    }

    async SearchPost(value) {
        if(isNullorEmpty(value) || value === this.state.searchValue) return null;
        this.setState({ isLoading: true, searchValue: value});
        let params = JSON.stringify({
            selector: {
                "$or": [
                    {"localisation.city": value},
                    {"localisation.zip_code": value},
                ]
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
            if(!Data) console.log("Empty result !");
            if(Data.success) {
                Data["data"].sort(function(a, b) {return b["up"] - a["up"]}); // Sort by asc "up" key
                this.setState({ posts: Data["data"], isLoading: false, refreshing: false });
            }
            else {
                if(Data["message"]) console.log(Data["message"]);
                this.setState({ isLoading: false, posts: [] });
            }
        })
        .catch((error) => {
            return console.error(error);
        });
    }

    renderPost() {
        if(this.state.searchValue === "" && this.state.posts.length === 0) return null;

        if(this.state.isLoading && this.state.posts.length === 0) {
            return (
                <Loader/>
            );
        }
        
        if(!this.state.isLoading && this.state.posts.length === 0) {
            return (
                <ScalableText style={styles.emptyResult}>Aucun résultat.</ScalableText>
            );
        }
        
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
    }

    onRefresh() {
        if((Date.now() - this.state.last_refresh) > 10000) { // Each limit 10s for refresh data
            this.setState({ refreshing: true, last_refresh: Date.now() });
            this.SearchPost(this.state.searchValue);
        }
    }

    render() {
        return (
            <Wrapper style={{ alignItems: "center" }}>
                <SearchBar searchAction={(value) => this.SearchPost(value)}/>
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
        width: "100%",
        zIndex: 99,
        overflow: "hidden",
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

