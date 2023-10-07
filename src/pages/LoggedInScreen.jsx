import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import UserDataService from "../services/UserDataService";
import { FontAwesome } from "@expo/vector-icons";

const LoggedInScreen = () => {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        getUsuario().then((usuario) => {
            setEmail(usuario.email);
            if (!usuario.nome) return;
            var primeiroNome = usuario.nome.split(" ");
            if (primeiroNome.length > 0) setNome(primeiroNome[0]);
            else setNome(usuario.nome);
        });
    }, []);

    const getUsuario = async () => {
        var usuarioEmail = await UserDataService.GetAuthenticated();
        return await UserDataService.getUsuario(usuarioEmail);
    };
    const handleLogout = async () => {
        console.log("deslogar");
        await UserDataService.setUsuarioLogado(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/666/666201.png",
                    }}
                    style={styles.profileImage}
                />
                <Text style={styles.welcomeText}>Bem-vindo, {nome}!</Text>
                <Text style={styles.emailText}>Email: {email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="shopping-cart" size={24} color="black" />
                    <Text style={styles.buttonText}>Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="shopping-bag" size={24} color="black" />
                    <Text style={styles.buttonText}>Minhas Compras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="cog" size={24} color="black" />
                    <Text style={styles.buttonText}>Configurações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <FontAwesome name="sign-out" size={24} color="black" />
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
    },
    header: {
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 10,
        color: "black",
    },
    emailText: {
        fontSize: 18,
        marginBottom: 20,
        color: "black",
    },
    buttonContainer: {
        alignItems: "flex-start",
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 10,
        color: "black",
    },
});

export default LoggedInScreen;
