import * as React from "react";

import AppNavigation from "./src/navigation/AppNavigation.js";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";


import { AppProvider } from "./src/context/AppContext.js";

import moment from "moment";

moment.locale("fr");

//https://oblador.github.io/react-native-vector-icons/

/* 

    TODO:
        Persistant system
        Vérification si une requête est déjà en cours pour éviter les doublons !

*/

export default class App extends React.Component {

    state = {
        user: {
            data: null,
            token: null
        }
    }

    render() {
        const appContext = {
            setUser: async (user) => {
                this.setState({ user: user });
            },
            user: this.state.user,
            API_Address: "192.168.0.19",
            API_Port: "3000",
            API_URL: "http://192.168.0.19:3000"
        }

        return (
            <SafeAreaProvider>
                <AppProvider value={appContext}>
                    <NavigationContainer>
                        <AppNavigation />
                    </NavigationContainer>
                </AppProvider>
            </SafeAreaProvider>
        );
    }
}