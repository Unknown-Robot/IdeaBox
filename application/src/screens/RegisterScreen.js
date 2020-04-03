import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Background from "../components/Background.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import BackArrow from "../components/BackArrow.js";
import { emailValidator, zipcodeValidator, isEmptyArray } from "../core/utils.js";

import { createUser, duplicateUsername, duplicateEmail } from "../models/users.js";

export default class Register extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        zip_code: "",
        error: ""
    }

    Register() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        else if(!emailValidator(this.state.email)) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
        else if(this.state.password.length < 6) return this.setState({error: "Votre mot de passe doit contenir au minimum 6 caractères."});
        else if(!zipcodeValidator(this.state.zip_code)) return this.setState({error: "Veuillez renseigner un code postal valide."});
        else if(duplicateEmail(this.state.email)) return this.setState({error: "Cette adresse e-mail est déjà utilisée."});
        else if(duplicateUsername(this.state.username)) return this.setState({error: "Ce nom d'utilisateur est déjà utilisé."});
        else {
            createUser(this.state);
            this.setState({error: ""});
            return this.props.navigation.navigate("Login");
        }
    }

    render() {
        return (
            <Background style={styles.view}>
                <BackArrow goBack={() => this.props.navigation.navigate("Login")}/>
                <Text style={styles.title}>Création du compte</Text>
                <Text style={styles.error}>{this.state.error}</Text>
                <Input >Nom d'utilisateur</Input>
                <Input >Adresse e-mail</Input>
                <Input >Mot de passe</Input>
                <Input style={styles.inputText}>Code postal</Input>
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