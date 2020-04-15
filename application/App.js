import * as React from "react";
import * as Font from "expo-font";

import { AsyncStorage } from "react-native";

import Loader from "./src/components/Loader.js";

import LoginNavigation from "./src/navigation/LoginNavigation.js";
import HomeNavigation from "./src/navigation/HomeNavigation.js";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/* import AsyncStorage from "@react-native-community/async-storage"; */

import { AppProvider } from "./src/context/AppContext.js";

import moment from "moment";

moment.locale("fr");

//https://oblador.github.io/react-native-vector-icons/

export default class App extends React.Component {

    state = {
        user: {
            data: null,
            token: null
        },
        post: null,
        isLoading: true
    }

    async persistantSystem() {
        let userData = await this.retrieveData(Key);
        if(userData) {
            console.log(userData);
        }
        else console.log("Empty cache !");
    }

    async storeData(Key, Data) {
        try {
            await AsyncStorage.setItem(Key, Data);
        }
        catch (error) {
            console.error(error);
        }
    }

    async retrieveData(Key) {
        try {
            let Data = await AsyncStorage.getItem(Key);
            if(!Data) return null;
            else return Data;
        }
        catch (error) {
            console.error(error);
        }
    }

    async componentDidMount() {
        if(this.state.isLoading) {
            await Font.loadAsync({
                VarelaRound: require("./assets/fonts/VarelaRound.ttf"),
            });
            //await this.persistantSystem();
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 500);
        }
    }

    render() {
        const appContext = {
            setUser: (user) => {
                //this.storeData("user-data", user);
                this.setState({ user: user });
            },
            user: this.state.user,
            API_Address: "192.168.0.19",
            API_Port: "3000",
            API_URL: "http://192.168.0.19:3000"
        }

        if(this.state.isLoading) {
            return (
                <SafeAreaProvider>
                    <Loader/>
                </SafeAreaProvider>
            );
        }

        if(this.state.user.token === null) {
            return (
                <SafeAreaProvider>
                    <AppProvider value={appContext}>
                        <NavigationContainer>
                            <LoginNavigation />
                        </NavigationContainer>
                    </AppProvider>
                </SafeAreaProvider>
            );
        }
        else {
            return (
                <SafeAreaProvider>
                    <AppProvider value={appContext}>
                        <NavigationContainer>
                            <HomeNavigation />
                        </NavigationContainer>
                    </AppProvider>
                </SafeAreaProvider>
            );
        }


        //Error react-navigation nested navigator !
        /* return (
            <AppProvider value={appContext}>
                <NavigationContainer>
                    {this.state.user.token === null} (
                        <LoginNavigation/>
                    ) : (
                        <HomeNavigation/>
                    )}
                </NavigationContainer>
            </AppProvider>
        ); */
    }
}

/* const styles = StyleSheet.create({
    
});
 */