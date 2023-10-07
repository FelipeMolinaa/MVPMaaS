import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import SignupScreen from "./src/pages/SignupScreen";
import UserDataService from "./src/services/UserDataService";
import LoggedInScreen from "./src/pages/LoggedInScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsAuthenticated(await UserDataService.isAuthenticated());
        };
        fetchData();
        const timer = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: "Inicio" }}
            />
            {isAuthenticated ? (
                <Tab.Screen
                    name="UserScreen"
                    component={LoggedInScreen}
                    options={{ title: "Usuário" }}
                />
            ) : (
                <Tab.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: "Entrar" }}
                />
            )}
        </Tab.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs">
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{
                        title: "Cadastro",
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
