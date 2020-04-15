import * as React from "react";

import HomeScreen from "../screens/Home/HomeScreen.js";
import LoveScreen from "../screens/Home/LoveScreen.js";
import SearchScreen from "../screens/Home/SearchScreen.js";
import SettingScreen from "../screens/Home/SettingScreen.js";

import AddPostScreen from "../screens/Home/AddPostScreen.js";
import PostScreen from "../screens/Home/PostScreen.js";

import { MaterialIcons } from "react-native-vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

export default class HomeNavigation extends React.Component {
    render() {
        return (
            <HomeStack.Navigator headerMode="none" initialRouteName="Home">
                <HomeStack.Screen name="Home" component={renderHomeTabStack}/>
                <HomeStack.Screen name="Post" component={PostScreen}/>
                <HomeStack.Screen name="AddPost" component={AddPostScreen}/>
            </HomeStack.Navigator>
        );
    }
}

function renderHomeTabStack() {
    return (
        <HomeTab.Navigator headerMode="none" tabBarOptions={{
            showIcon: true,
            showLabel: false,
            swipeEnabled: true,
            transparentCard: true,
            activeTintColor: "#1e232c",
            inactiveTintColor: "#8e8e8f"
        }}>
            <HomeTab.Screen
                name="Main"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    )
                }}
            />
            <HomeTab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="search" color={color} size={size} />
                    )
                }}
            />
            <HomeTab.Screen
                name="Love"
                component={LoveScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" color={color} size={size} />
                    )
                }}
            />
            <HomeTab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" color={color} size={size} />
                    )
                }}
            />
        </HomeTab.Navigator>
    );
}