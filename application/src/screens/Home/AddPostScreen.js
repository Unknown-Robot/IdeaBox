import * as React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import ScalableText from "react-native-text";
import Container from "../../components/Container.js";
import Input from "../../components/Input.js";
import Button from "../../components/Button.js";
import BackButton from "../../components/BackButton.js";
import Wrapper from "../../components/Wrapper.js";

import AppContext from "../../context/AppContext.js";

import { isEmptyArray } from "../../core/utils.js";

export default class AddPostScreen extends React.Component {

    static contextType = AppContext;

    state = {
        title: "",
        description: "",
        error: ""
    }

    async CreatePost() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        else {
            let params = JSON.stringify({
                create: {
                    title: this.state.title,
                    description: this.state.description,
                    user: {
                        _id: this.context.user.data["_id"]
                    },
                    localisation: {
                        city: this.context.user.data.localisation["city"],
                        zip_code: this.context.user.data.localisation["zip_code"]
                    }
                }
            });
            fetch(this.context.API_URL + "/posts/create", {
                headers: {"Accept-Encoding": "gzip, deflate", "content-type" : "application/json; charset=utf-8", "Authorization": this.context.user.token},
                method: "POST",
                body: params
            })
            .then((response) => response.json())
            .then((Data) => {
                if(!Data) return this.setState({error: "Un problème est survenu, veuillez réessayer ultérieurement."});
                if(Data.success) {
                    this.setState({error: ""});
                    return this.props.navigation.navigate("Home", {
                        forceRefresh: true
                    });
                }
                else return console.log(Data);
            })
            .catch((error) => {
                console.error(error);
                return this.setState({error: "Un problème est survenu, veuillez réessayer ultérieurement."});
            });
        }
    }

    render() {
        return (
            <Wrapper style={{ alignItems: "center" }}>
                <BackButton goBack={() => this.props.navigation.goBack()}/>
                <Container style={{ marginTop: 75, padding: 20 }}>
                    <ScalableText style={styles.title}>Publication</ScalableText>
                    <ScalableText style={styles.error}>{this.state.error}</ScalableText>
                    <Input
                        value={this.state.title}
                        updateData={(value) => this.setState({ title: value })}>
                        Titre
                    </Input>
                    <Input
                        value={this.state.description}
                        updateData={(value) => this.setState({ description: value })}>
                        Description
                    </Input>
                    <Button onPress={() => this.CreatePost()}>Publier</Button>
                </Container>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontSize: 28,
        fontFamily: "VarelaRound",
        marginBottom: 20,
        textAlign: "center"
    },
    error: {
        width: "100%",
        color: "red",
        fontSize: 14,
        fontFamily: "VarelaRound",
        textAlign: "center",
        marginBottom: 15
    },
    inputText: {
        marginBottom: 30
    }
});

