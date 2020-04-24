import * as React from "react";
import * as Font from "expo-font";

import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "../../components/Loader.js";
import AppContext from "../../context/AppContext.js";

export default class LoadingScreen extends React.Component {

    static contextType = AppContext;

    async componentDidMount() {
        await Font.loadAsync({
            VarelaRound: require("../../assets/fonts/VarelaRound.ttf"),
        });
        setTimeout(async () => {
            console.log("IdeaBox application running..\nversion: 0.0.1\nOS : " + Platform.OS);
            this.props.navigation.navigate("Login");
        }, 500);
    }

    render() {
        return (
            <SafeAreaProvider>
                <Loader style={{ backgroundColor: "#f2f2f2" }}/>
            </SafeAreaProvider>
        );
    }
}