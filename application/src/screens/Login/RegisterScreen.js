import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ScalableText from "react-native-text";
import Wrapper from "../../components/Wrapper.js";
import Input from "../../components/Input.js";
import Button from "../../components/Button.js";
import BackButton from "../../components/BackButton.js";
import Container from "../../components/Container.js";
import { emailValidator, isEmptyArray } from "../../core/utils.js";
import AppContext from "../../context/AppContext.js";

export default class RegisterScreen extends React.Component {
    static contextType = AppContext

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        zip_code: "",
        city: "",
        error: ""
    }

    async Register() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        else if(!emailValidator(this.state.email)) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
        else if(this.state.password.length < 6) return this.setState({error: "Votre mot de passe doit contenir au minimum 6 caractères."});
        else {
            let params = JSON.stringify({
                create: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                    localisation: {
                        city: this.state.city,
                        zip_code: this.state.zip_code
                    }
                }
            });
            fetch(this.context.API_URL + "/users/create", {
                headers: {"Accept-Encoding": "gzip, deflate", "content-type" : "application/json; charset=utf-8"},
                method: "POST",
                body: params
            })
            .then((response) => response.json())
            .then((Data) => {
                if(!Data) return this.setState({error: "Un problème est survenu, veuillez réessayer ultérieurement."});
                if(Data.success) {
                    this.setState({error: ""});
                    return this.props.navigation.navigate("Login");
                }
                else if(Data.errors.email && Data.errors.email.kind === "unique") return this.setState({error: "Cette adresse e-mail est déjà utilisée."});
                else if(Data.errors.username && Data.errors.username.kind === "unique") return this.setState({error: "Ce nom d'utilisateur est déjà utilisé."});
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
            <Wrapper style={{alignItems: "center"}}>
                <ScrollView style={styles.scrollView}>
                    <BackButton goBack={() => this.props.navigation.goBack()}/>
                    <View style={{ alignItems: "center", paddingBottom: 15 }}>
                        <Container style={{ marginTop: 75 }}>
                            <ScalableText style={styles.title}>Création du compte</ScalableText>
                            <ScalableText style={styles.error}>{this.state.error}</ScalableText>
                            <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
                                <Input
                                    style={{ width: "50%", marginRight: 10 }}
                                    value={this.state.first_name}
                                    updateData={(value) => this.setState({ first_name: value })}>
                                    Prénom
                                </Input>
                                <Input
                                    style={{ width: "50%", marginLeft: 10 }}
                                    value={this.state.last_name}
                                    updateData={(value) => this.setState({ last_name: value })}>
                                    Nom
                                </Input>
                            </View>
                            <Input
                                value={this.state.email}
                                updateData={(value) => this.setState({ email: value })}>
                                Adresse e-mail
                            </Input>
                            <Input
                                value={this.state.password}
                                updateData={(value) => this.setState({ password: value })}
                                type="password">
                                Mot de passe
                            </Input>
                            <Input
                                value={this.state.zip_code}
                                updateData={(value) => this.setState({ zip_code: value })}
                                style={styles.inputText}>
                                Code postal
                            </Input>
                            <Input
                                value={this.state.city}
                                updateData={(value) => this.setState({ city: value })}
                                style={styles.inputText}>
                                Ville
                            </Input>
                            <Button onPress={() => this.Register()}>Envoyer</Button>
                        </Container>
                    </View>
                </ScrollView>
            </Wrapper>
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%"
    },
    title: {
        width: "100%",
        fontSize: 21,
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
        marginBottom: 15
    }
});