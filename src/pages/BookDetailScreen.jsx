import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import BooksDataService from "../services/BooksDataService";

const BookDetailScreen = ({ route }) => {
    const { id } = route.params;
    const [book, setBook] = useState(null);

    useEffect(() => {
        BooksDataService.getLivro(id)
        .then((response) => {
            if(response[0].imageUrl == '') response[0].imageUrl = 'https://cdn-cosmos.bluesoft.com.br/products/7891443064994'
            setBook(response[0]);
        });
    }, [id]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {book == null ? (
                    <Text>Carregando...</Text>
                ) : (
                    <View>
                        <Image
                            source={{ uri: book.imageUrl }}
                            style={styles.coverImage}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.title}>{book.title}</Text>
                            <Text style={styles.author}>{book.author}</Text>
                            <Text style={styles.biography}>
                                {book.biography}
                            </Text>
                            <Text style={styles.price}>
                                Preço: {book.price}
                            </Text>
                        </View>

                        <View style={styles.conditionContainer}>
                            <Text style={styles.conditionTitle}>
                                Condição do Livro:
                            </Text>
                            <Text style={styles.conditionText}>
                                {book.conditionTitle}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.fab}>
                <FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    fab: {
        position: "absolute",
        backgroundColor: "#AB1A11",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        right: 16,
        bottom: 16,
        elevation: 8,
    },
    coverImage: {
        width: "100%",
        height: 450,
        resizeMode: "stretch",
    },
    detailsContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    author: {
        fontSize: 18,
        marginBottom: 10,
    },
    biography: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    conditionContainer: {
        backgroundColor: "#F0F0F0",
        padding: 20,
    },
    conditionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    conditionText: {
        fontSize: 16,
    },
});

export default BookDetailScreen;
