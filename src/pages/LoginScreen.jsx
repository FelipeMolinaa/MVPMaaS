import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import UserDataService from "../services/UserDataService";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        if (email.trim() === "" || senha.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Por favor, preencha todos os campos.",
                position: "bottom",
                visibilityTime: 3000,
                autoHide: true,
            });
        } else {
            if (!(await UserDataService.verificarUsuario(email, senha))) {
                Toast.show({
                    type: "error",
                    text1: "Usuario ou senha incorretos",
                    position: "bottom",
                    visibilityTime: 3000,
                    autoHide: true,
                });
                return;
            }
            await UserDataService.setUsuarioLogado(email);
            navigation.navigate("MainTabs");
        }
    };

    const handleSignupClick = () => {
        navigation.navigate("Signup");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(text) => setSenha(text)}
                />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleSignupClick}>
                    <Text style={styles.forgotPasswordText}>
                        Ainda não tem cadastro?
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: "#FFFFFF",
    },
    inputContainer: {
        width: "100%",
    },
    input: {
        height: 50,
        backgroundColor: "#EDEDED",
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 20,
    },
    forgotPasswordContainer: {
        marginBottom: 20,
        marginStart: 20,
    },
    forgotPasswordText: {
        color: "#AB1A11",
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "#AB1A11",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
    },
});

export default LoginScreen;
