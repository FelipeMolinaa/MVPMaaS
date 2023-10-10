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

const CategoriesScreen = ({ navigation }) => {
    const [data, setData] = useState(null);

    useEffect(() => {

        let livros = {}
        BooksDataService.getLivros().then(res => {
            livros = res;
            }).then(()=>{
                BooksDataService.getCategorias().then((response) => {

                    let categories = []
                    response.forEach(elem => {  
                        let id = elem.id;
                        const itens_count = livros.filter((item) => {
                            return item.idCategory == id
                            })
                        if(itens_count.length > 0){
                                elem.itens = itens_count.length+' itens';
                                elem.color = '#6633EE';
                                elem.fontWeight = 'bold';
                            } else {
                                elem.itens = '(sem registros)';
                                elem.color = '#CCCCCC';
                                elem.fontWeight = 'normal';
                            }

                        categories.push(elem); 
                        
                        });
                    setData(categories);
                });
            })
        
        
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate("HomeScreen", { idCategory: item.id });
                }}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.category}</Text>
                <Text style={{color: item.color, fontWeight: 'bold'}}>{item.itens}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    itemContainer: {
        flex: 1,
        margin: 3,
        borderRadius: 5,
        width: '100%',
    },
    textContainer: {
        marginLeft: 0,
        marginBottom: 10,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default CategoriesScreen;
