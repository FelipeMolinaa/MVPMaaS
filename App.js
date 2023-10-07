import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import SignupScreen from "./src/pages/SignupScreen";
import UserDataService from "./src/services/UserDataService";
import LoggedInScreen from "./src/pages/LoggedInScreen";
import BooksDataService from "./src/services/BooksDataService";
import BookDetailScreen from "./src/pages/BookDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsAuthenticated(await UserDataService.isAuthenticated());
        };
        fetchData();
        BooksDataService.saveBooks();
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
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" color={color} size={size} />
                    ),
                }}
            />
            {isAuthenticated ? (
                <Tab.Screen
                    name="UserScreen"
                    component={LoggedInScreen}
                    options={{
                        title: "Usuário",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome
                                name="user"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: "Entrar",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome
                                name="user"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
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
                <Stack.Screen
                    name="BookDetail"
                    component={BookDetailScreen}
                    options={{
                        title: "Detalhe",
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
