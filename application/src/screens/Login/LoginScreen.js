import * as React from "react";
import { StyleSheet } from "react-native";
import ScalableText from "react-native-text";
import Input from "../../components/Input.js";
import Button from "../../components/Button.js";
import Wrapper from "../../components/Wrapper.js";
import Container from "../../components/Container.js";
import { emailValidator, isEmptyArray } from "../../core/utils.js";

import AppContext from "../../context/AppContext.js";

export default class LoginScreen extends React.Component {

    static contextType = AppContext

    state = {
        email: "damien.caron@hetic.net",
        password: "azertyuiop",
        error: ""
    }

    Login() {
        if(isEmptyArray(this.state)) return this.setState({ error: "Veuillez renseigner tous les champs." });
        if(!emailValidator(this.state.email)) return this.setState({ error: "Veuillez renseigner une adresse e-mail valide." });
        fetch(this.context.API_URL + "/login", {
            headers: { "content-type": "application/json; charset=utf-8" },
            method: "POST",
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        })
        .then((response) => response.json())
        .then((Data) => {
            if(!Data) return this.setState({ error: "Un problème est survenu, veuillez réessayer ultérieurement." });
            if(Data.success) this.context.setUser({
                data: Data["data"],
                token: "Bearer " + Data["token"]
            });
            else return this.setState({ error: "Adresse e-mail / mot de passe incorrect." });
        })
        .catch((error) => {
            console.error(error);
            return this.setState({ error: "Un problème est survenu, veuillez réessayer ultérieurement." });
        });
    }

    render() {
        return (
            <Wrapper style={{justifyContent: "center", alignItems: "center"}}>
                <Container>
                    <ScalableText style={styles.title}>IdeaBox</ScalableText>
                    <ScalableText style={styles.error}>{this.state.error}</ScalableText>
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
                    <ScalableText style={styles.forgot} onPress={() => this.props.navigation.navigate("Forgot")}>Mot de passe oublié ?</ScalableText>
                    <Button onPress={() => this.Login()}>Connection</Button>
                    <Button type="outlined" onPress={() => this.props.navigation.navigate("Register")}>Inscription</Button>
                </Container>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        fontFamily: "VarelaRound",
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 40,
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
    forgot: {
        color: "black",
        paddingLeft: 5,
        marginVertical: 15,
        fontFamily: "VarelaRound",
        fontSize: 12
    }
});

