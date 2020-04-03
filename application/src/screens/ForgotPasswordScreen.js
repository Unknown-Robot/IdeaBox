import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Background from "../components/Background.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import BackArrow from "../components/BackArrow.js";
import { isNullorEmpty, emailValidator } from "../core/utils.js";

import { duplicateEmail } from "../models/users.js";

export default class Forgot extends React.Component {

    state = {
        email: "",
        error: ""
    }

    Forgot() {
        let State_Keys = Object.keys(this.state);
        let State_Values = Object.values(this.state);
        for(let i = 0; i < State_Keys.length; i++) {
            if(State_Keys[i] == "error") return;
            if(isNullorEmpty(State_Values[i])) return this.setState({error: "Veuillez renseigner tous les champs."});
            else if(State_Keys[i] == "email" && !emailValidator(State_Values[i])) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
            else {
                if(duplicateEmail(this.state.email)) {
                    this.setState({error: ""});
                    return this.props.navigation.navigate("Login");
                }
                else return this.setState({error: "Adresse e-mail introuvable."});
            }
        }
    }

    render() {
        return (
            <Background style={styles.view}>
                <BackArrow goBack={() => this.props.navigation.navigate("Login")}/>
                <Text style={styles.title}>Réinitialisation mot de passe</Text>
                <Text style={styles.error}>{this.state.error}</Text>
                <Input style={styles.inputText}
                    value={this.state.email}
                    updateData={(value) => this.setState({ email: value })}>
                    Adresse e-mail</Input>
                <Button onPress={() => this.Forgot()}>Envoyer</Button>
            </Background>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontSize: 28,
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
        marginVertical: 30
    }
});