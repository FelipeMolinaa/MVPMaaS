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

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        BooksDataService.getLivros().then((response) => {
            setData(response);
        });
    }, []);

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
                navigation.navigate("BookDetail", { guid: item.guid });
            }}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
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
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    itemContainer: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        width: 160,
    },
    image: {
        width: "100%",
        height: 220,
        alignSelf: "center",
    },
    textContainer: {
        marginLeft: 6,
        marginBottom: 10,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HomeScreen;
