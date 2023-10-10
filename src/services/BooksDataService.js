import AsyncStorage from "@react-native-async-storage/async-storage";
import bookData from './../data/books.json'; 
import bookCategorias from './../data/booksCategory.json'; 

class BooksDataService {
    static async getLivros() {
        try {
            let livros = JSON.parse(await AsyncStorage.getItem("livros"));
            if (livros == null) livros = [];
            return livros;
        } catch (error) {
            console.error("Erro ao pegar livros:", error);
            return false;
        }
    }

    static async getLivro(id) {
        try {
            let livros = JSON.parse(await AsyncStorage.getItem("livros"));
            if (livros == null) return null;
            return livros.filter((livro) => {
                return livro.id == id;
                })
        } catch (error) {
            console.error("Erro ao pegar livro:", error);
            return false;
        }
    }

    static async setLivros(){
        await AsyncStorage.setItem("livrosVersion",JSON.stringify(bookData.version))
        await AsyncStorage.setItem("livros",JSON.stringify(bookData.books))
        await AsyncStorage.setItem("categorias",JSON.stringify(bookCategorias.data))
    }

    static async getCategorias() {
        try {
            let categorias = JSON.parse(await AsyncStorage.getItem("categorias"));
            if (categorias == null) categorias = [];
            return categorias;
        } catch (error) {
            console.error("Erro ao pegar categorias:", error);
            return false;
        }
    }

    static async formatPrice(value){
        return 'R$'+value;
        }

    static async saveBooks() {
        try {
            AsyncStorage.removeItem("livros");
            let bookVersion = AsyncStorage.getItem("livrosVersion");
            if(bookData.version != bookVersion){
                AsyncStorage.removeItem("livros");
                BooksDataService.setLivros();
                } 
            
            return true;
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            return false;
        }
    }
}

export default BooksDataService;
