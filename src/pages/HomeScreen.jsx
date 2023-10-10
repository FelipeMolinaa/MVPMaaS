import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import BooksDataService from "../services/BooksDataService";

const HomeScreen = ({ navigation, route }) => {
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState("");

    if (route.params) {
        var idCategory = route.params.idCategory;
    }

    useEffect(() => {
        BooksDataService.getLivros().then((response) => {
            if (idCategory > 0) {
                setData(
                    response.filter((item) => {
                        return item.idCategory == idCategory;
                    })
                );
            } else {
                setData(response);
            }
        });
    }, [idCategory]);

    const searchData = async (text) => {
        const data = await BooksDataService.getLivros();
        if (data) {
            const filteredData = data.filter((item) => {
                const itemData = `${item.title.toUpperCase()} ${item.biography.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.includes(textData);
            });
            setData(filteredData);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate("BookDetail", { id: item.id });
            }}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.author}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FontAwesome
                    name="search"
                    size={20}
                    color="#AB1A11"
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Pesquisar..."
                    style={styles.input}
                    placeholderTextColor="#AB1A11"
                    onChangeText={(searchText) => {
                        setSearchText(searchText);
                        searchData(searchText);
                    }}
                    // Outras props do TextInput, se necessário
                />
            </View>
            <View style={styles.bookList}>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EDEDED",
        borderRadius: 8, // Bordas arredondadas
        marginHorizontal: 10,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 8,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#AB1A11",
        // Outros estilos do TextInput, se necessário
    },
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    bookList: {
        flex: 1,
        flexDirection: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F6F6F6",
    },
    itemContainer: {
        flex: 1,
        width: 170,
        margin: 5,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
    },
    image: {
        width: "100%",
        height: 260,
        alignSelf: "center",
        marginBottom: 5,
    },
    textContainer: {
        padding: 15,
        marginLeft: 0,
        marginBottom: 10,
        alignItems: "flex-start",
    },
    category: {
        fontSize: 12,
        color: "#666666",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    price: {
        width: "100%",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "right",
        color: "#3366CC",
    },
});

export default HomeScreen;
