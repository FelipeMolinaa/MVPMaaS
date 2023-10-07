import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import UserDataService from "../services/UserDataService";
import Toast from "react-native-toast-message";

const SignupScreen = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const showToast = (text1, type = "error") => {
        Toast.show({
            type: type,
            text1: text1,
            position: "bottom",
            visibilityTime: 3000,
            autoHide: true,
        });
    };

    const handleCadastro = async () => {
        console.log("teste");
        if (!nome || !email || !senha) {
            showToast("Por favor, preencha todos os campos.");
            return;
        }

        if (senha.length < 8) {
            showToast("A senha precisa ter no mínimo 8 caracteres.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Por favor, insira um email válido.");
            return;
        }

        const cadastradoComSucesso = await UserDataService.cadastrarUsuario(
            nome,
            email,
            senha
        );

        if (!cadastradoComSucesso) {
            showToast(
                "Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde."
            );
        } else {
            showToast("Cadastro bem-sucedido!", "success");
            navigation.navigate("MainTabs");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
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

export default SignupScreen;
