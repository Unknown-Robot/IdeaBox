import * as React from "react";

import LoginScreen from "../screens/Login/LoginScreen.js";
import RegisterScreen from "../screens/Login/RegisterScreen.js";
import ForgotPasswordScreen from "../screens/Login/ForgotPasswordScreen.js";

import { createStackNavigator } from "@react-navigation/stack";

const LoginStack = createStackNavigator();

export default class LoginNavigation extends React.Component {
    render() {
        return (
            <LoginStack.Navigator headerMode="none" initialRouteName="Login">
                <LoginStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <LoginStack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <LoginStack.Screen
                    name="Forgot"
                    component={ForgotPasswordScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
            </LoginStack.Navigator>
        );
    }
}