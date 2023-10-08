import AsyncStorage from "@react-native-async-storage/async-storage";
import bookData from './../data/books.json'; 

class BooksDataService {
    static async getLivros() {
        try {
            var livros = JSON.parse(await AsyncStorage.getItem("livros"));
            if (livros == null) livros = [];
            return livros;
        } catch (error) {
            console.error("Erro ao pegar livros:", error);
            return false;
        }
    }

    static async getLivro(guid) {
        try {
            var livros = JSON.parse(await AsyncStorage.getItem("livros"));
            if (livros == null) return null;
            return livros.filter((livro) => {
                return livro.guid == guid;
            });
        } catch (error) {
            console.error("Erro ao pegar livro:", error);
            return false;
        }
    }

    static async setBooksCollection(){
        await AsyncStorage.setItem("livros",JSON.stringify(bookData.books));
        }

    static async saveBooks() {
        try {
            if ((await BooksDataService.getLivros().length) == 0) return;
            BooksDataService.setBooksCollection();
            return true;
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            return false;
        }
    }
}

export default BooksDataService;
