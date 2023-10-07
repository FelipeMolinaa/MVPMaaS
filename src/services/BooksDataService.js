import AsyncStorage from "@react-native-async-storage/async-storage";

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

    static async getLivro(id) {
        try {
            var livros = JSON.parse(await AsyncStorage.getItem("livros"));
            if (livros == null) return null;
            return livros.filter((livro) => {
                return livro.id == id;
            });
        } catch (error) {
            console.error("Erro ao pegar livro:", error);
            return false;
        }
    }

    static async saveBooks() {
        try {
            if ((await BooksDataService.getLivros().length) == 0) return;
            await AsyncStorage.setItem(
                "livros",
                JSON.stringify([
                    {
                        id: "1",
                        title: "Harry Potter e a Pedra Filosofal",
                        author: "J. K. Rowling",
                        conditionTitle:
                            "Capa um pouco desgastada, páginas levemente ",
                        price: "R$10",
                        biography:
                            "O primeiro livro da série Harry Potter, lançado em 1997. Ele apresenta o jovem bruxo Harry Potter, que descobre que é um bruxo e é aceito na Escola de Magia e Bruxaria de Hogwarts, onde ele faz amigos, descobre segredos sobre seu passado e enfrenta o malvado bruxo Lord Voldemort.",
                        imageUrl:
                            "https://m.media-amazon.com/images/I/51lRMYwP-4L.jpg",
                    },
                    {
                        id: "2",
                        title: "Dom Casmurro",
                        author: "Machado de Assis",
                        conditionTitle:
                            "Capa e páginas bem conservadas, quase como novas.",
                        price: "R$8",
                        biography:
                            "Um dos romances mais conhecidos da literatura brasileira, publicado originalmente em 1900. O livro conta a história de Bentinho, um jovem que se apaixona por Capitu, mas a suspeita de traição gera ciúmes e dúvidas que permeiam toda a trama.",
                        imageUrl:
                            "https://m.media-amazon.com/images/I/81XpG2iKTlL._AC_UF1000,1000_QL80_.jpg",
                    },
                    {
                        id: "3",
                        title: "1984",
                        author: "George Orwell",
                        price: "R$12",
                        conditionTitle:
                            "Páginas amarelas, meio amassadas e com algumas páginas riscadas.",
                        biography:
                            "Publicado em 1949, '1984' é uma obra distópica clássica que descreve um futuro totalitário onde o Estado exerce controle absoluto sobre a vida das pessoas. O livro introduz conceitos como o Grande Irmão e a novilíngua, e explora temas de vigilância, liberdade e resistência.",
                        imageUrl:
                            "https://m.media-amazon.com/images/I/61M9jDcsl2L._AC_UF1000,1000_QL80_.jpg",
                    },
                    {
                        id: "4",
                        title: "Cem Anos de Solidão",
                        conditionTitle:
                            "Capa e páginas em bom estado, algumas manchas de uso",
                        author: "Gabriel García Márquez",
                        biography:
                            "Lançado em 1967, é considerado um dos principais exemplos do realismo mágico na literatura. O romance narra a história da família Buendía ao longo de várias gerações em Macondo, uma cidade fictícia na América Latina. A obra explora temas de solidão, amor, poder e decadência.",
                        price: "R$14",
                        imageUrl:
                            "https://m.media-amazon.com/images/I/81SQPrWU7SL._AC_UF1000,1000_QL80_.jpg",
                    },
                    {
                        id: "5",
                        title: "O Senhor dos Anéis",
                        conditionTitle:
                            "Capa e páginas em boas condições, ligeiramente amareladas pelo tempo.",
                        author: "J. R. R. Tolkien",
                        biography:
                            "A trilogia 'O Senhor dos Anéis' foi publicada entre 1954 e 1955. Ela é uma obra de fantasia épica que segue as aventuras de Frodo Bolsón enquanto ele tenta destruir um poderoso anel para evitar que caia nas mãos do maligno Sauron. A série é ambientada em um mundo chamado Terra-média e é amplamente considerada uma obra-prima da fantasia moderna.",
                        price: "R$18",
                        imageUrl:
                            "https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg",
                    },
                    {
                        id: "6",
                        title: "Crime e Castigo",
                        conditionTitle:
                            "Páginas um pouco desgastadas, mas em bom estado geral.",
                        author: "Fiódor Dostoiévski",
                        price: "R$11",
                        biography:
                            "Publicado em 1866, 'Crime e Castigo' é um romance psicológico que explora a mente de um estudante universitário, Raskólnikov, que comete um assassinato e lida com a culpa e o remorso resultantes. A obra aborda questões morais, éticas e existenciais.",
                        imageUrl:
                            "https://www.lpm.com.br/livros/imagens/crime_e_castigo_hq_9788525434104_hd.jpg",
                    },
                ])
            );
            return true;
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            return false;
        }
    }
}

export default BooksDataService;
