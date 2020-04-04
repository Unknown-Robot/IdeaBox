import * as React from "react";

import LoginScreen from "./src/screens/LoginScreen.js";
import RegisterScreen from "./src/screens/RegisterScreen.js";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import SearchScreen from "./src/screens/SearchScreen.js";
import SettingScreen from "./src/screens/SettingScreen.js"
import Post from "./src/screens/PostScreen.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Forgot"
                    component={ForgotPasswordScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen 
                    name="Post"
                    component={Post}
                    options={{
                        gestureEnabled: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
