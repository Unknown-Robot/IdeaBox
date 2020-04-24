import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ScalableText from "react-native-text";
import Wrapper from "../../components/Wrapper.js";
import Input from "../../components/Input.js";
import Button from "../../components/Button.js";
import BackButton from "../../components/BackButton.js";
import Titleline from "../../components/Titleline.js";
import Container from "../../components/Container.js";
import { isEmptyArray, emailValidator } from "../../core/utils.js";
import AppContext from "../../context/AppContext.js";

export default class ForgotPasswordScreen extends React.Component {
    static contextType = AppContext

    state = {
        email: "",
        error: ""
    }

    Forgot() {
        if(isEmptyArray(this.state)) return this.setState({error: "Veuillez renseigner tous les champs."});
        if(!emailValidator(this.state.email)) return this.setState({error: "Veuillez renseigner une adresse e-mail valide."});
        this.setState({error: ""});
        return this.props.navigation.goBack();
    }

    render() {
        return (
            <Wrapper style={{alignItems: "center"}}>
                <ScrollView style={styles.scrollView}>
                    <BackButton goBack={() => this.props.navigation.goBack()}/>
                    <View style={{ alignItems: "center", paddingBottom: 15 }}>
                        <Container style={{ marginTop: 75 }}>
                            <Titleline size="75%">Réinitialisation mot de passe</Titleline>
                            {/* <ScalableText style={styles.title}>Réinitialisation mot de passe</ScalableText> */}
                            <ScalableText style={styles.error}>{this.state.error}</ScalableText>
                            <Input style={styles.inputText}
                                value={this.state.email}
                                updateData={(value) => this.setState({ email: value })}>
                                Adresse e-mail</Input>
                            <Button onPress={() => this.Forgot()}>Envoyer</Button>
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
        textAlign: "center",
        alignSelf: "flex-start"
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
        marginVertical: 30,
    }
});