import { StyleSheet, Text, View, Image } from 'react-native';

var databooks = [
    {
        "NomeLivro": "1984",
        "Autor": "George Orwell",
        "EstadoDoLivro": "Novo",
        "CapaLivro": "https://cdn.pixabay.com/photo/2016/11/29/05/45/africa-1867462_960_720.jpg"
    },
    {
        "NomeLivro": "Cem Anos de Solidão",
        "Autor": "Gabriel García Márquez",
        "EstadoDoLivro": "Usado",
        "CapaLivro": "https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052019_960_720.jpg"
    },
    {
        "NomeLivro": "A Revolução dos Bichos",
        "Autor": "George Orwell",
        "EstadoDoLivro": "Novo",
        "CapaLivro": "https://cdn.pixabay.com/photo/2015/08/13/00/52/book-885499_960_720.jpg"
    },
    {
        "NomeLivro": "O Apanhador no Campo de Centeio",
        "Autor": "J.D. Salinger",
        "EstadoDoLivro": "Usado",
        "CapaLivro": "https://cdn.pixabay.com/photo/2016/02/22/10/08/books-1211581_960_720.jpg"
    },
    {
        "NomeLivro": "Dom Quixote",
        "Autor": "Miguel de Cervantes",
        "EstadoDoLivro": "Novo",
        "CapaLivro": "https://cdn.pixabay.com/photo/2016/11/29/07/14/book-1867092_960_720.jpg"
    }
]

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Image style={styles.item} source={{uri:"https://cdn.pixabay.com/photo/2017/03/07/20/44/book-2123690_960_720.jpg"}}>
        </Image>
        <Text>teste</Text>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item :{
        width: '50%',
        backgroundColor: 'red',
    }
  });