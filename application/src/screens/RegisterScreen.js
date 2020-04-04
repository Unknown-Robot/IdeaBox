import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Background from "../components/Background.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import BackArrow from "../components/BackArrow.js";
import { emailValidator, zipcodeValidator, isEmptyArray } from "../core/utils.js";

import { createUser } from "../models/users.js";

export default class Register extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        city: "",
        error: ""
    }

    async Register() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        else if(!emailValidator(this.state.email)) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
        else if(this.state.password.length < 6) return this.setState({error: "Votre mot de passe doit contenir au minimum 6 caractères."});
        else {
            let Request = await createUser({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                localisation: {
                    city: this.state.city
                }
            });
            if(!Request) return this.setState({error: "Un problème est survenu, veuillez réessayer ultérieurement."});
            if(Request.success) {
                this.setState({error: ""});
                return this.props.navigation.navigate("Login");
            }
            else if(Request.errors.email && Request.errors.email.kind === "unique") return this.setState({error: "Cette adresse e-mail est déjà utilisée."});
            else if(Request.errors.username && Request.errors.username.kind === "unique") return this.setState({error: "Ce nom d'utilisateur est déjà utilisé."});
            else console.log(Request);
        }
    }

    render() {
        return (
            <Background style={styles.view}>
                <BackArrow goBack={() => this.props.navigation.navigate("Login")}/>
                <Text style={styles.title}>Création du compte</Text>
                <Text style={styles.error}>{this.state.error}</Text>
                <Input
                    value={this.state.username}
                    updateData={(value) => this.setState({ username: value })}>
                    Nom d'utilisateur
                </Input>
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
                    value={this.state.city}
                    updateData={(value) => this.setState({ city: value })}
                    style={styles.inputText}>
                    Ville
                </Input>
                <Button onPress={() => this.Register()}>Envoyer</Button>
            </Background>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center"
    },
    error: {
        width: "100%",
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 15
    },
    inputText: {
        marginBottom: 30
    }
});