import * as React from "react";

import LoginNavigation from "./LoginNavigation.js";
import HomeNavigation from "./HomeNavigation.js";

import LoadingScreen from "../screens/App/LoadingScreen.js";
import AddPostScreen from "../screens/Home/AddPostScreen.js";
import PostScreen from "../screens/Home/PostScreen.js";
import SettingUpdateScreen from "../screens/Home/SettingUpdateScreen.js";

import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

export default class AppNavigation extends React.Component {
    render() {
        return (
            <AppStack.Navigator headerMode="none" initialRouteName="Loading">
                <AppStack.Screen name="Loading" component={LoadingScreen}/>
                <AppStack.Screen name="Login" component={LoginNavigation}/>
                <AppStack.Screen name="Home" component={HomeNavigation}/>
                <AppStack.Screen name="SettingUpdate" component={SettingUpdateScreen}/>
                <AppStack.Screen name="Post" component={PostScreen}/>
                <AppStack.Screen name="AddPost" component={AddPostScreen}/>
            </AppStack.Navigator>
        );
    }
}