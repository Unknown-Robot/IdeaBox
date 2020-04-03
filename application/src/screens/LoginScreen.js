import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Background from "../components/Background.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import { emailValidator, isEmptyArray } from "../core/utils.js";

import { loginUser } from "../models/users.js";

export default class Login extends React.Component {
    state = {
        email: "damien.caron@hetic.net",
        password: "azerty",
        error: ""
    }

    Login() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        else if(!emailValidator(this.state.email)) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
        else {
            let User = loginUser(this.state.email, this.state.password);
            if(User) return this.props.navigation.navigate("Home", {
                user: User
            });
            else return this.setState({error: "Adresse e-mail / mot de passe incorrect."});
        }
    }

    render() {
        return (
            <Background>
                <Text style={styles.title}>IdeaBox</Text>
                <Text style={styles.error}>{this.state.error}</Text>
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
                <Text style={styles.forgot} onPress={() => this.props.navigation.navigate("Forgot")}>Mot de passe oublié ?</Text>
                <Button onPress={() => this.Login()}>Connection</Button>
                {/* <Button onPress={() => this.props.navigation.navigate("Home")}>Connection</Button> */} 
                <Button onPress={() => this.props.navigation.navigate("Register")}>Inscription</Button>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontSize: 50,
        marginBottom: 40,
        textAlign: "center"
    },
    error: {
        width: "100%",
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 15
    },
    forgot: {
        color: "black",
        marginVertical: 15
    }
});

