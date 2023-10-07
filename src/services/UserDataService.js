import AsyncStorage from "@react-native-async-storage/async-storage";

class UserDataService {
    // Método para cadastrar um novo usuário
    static async cadastrarUsuario(nome, email, senha) {
        try {
            const usuario = { nome, email, senha };
            await AsyncStorage.setItem(email, JSON.stringify(usuario));
            return true; // Retorna true se o cadastro for bem-sucedido
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return false; // Retorna false se ocorrer um erro ao cadastrar o usuário
        }
    }

    // Método para verificar se o usuário está cadastrado
    static async verificarUsuario(email, senha) {
        try {
            const usuario = await JSON.parse(await AsyncStorage.getItem(email));
            return usuario.senha === senha; // Retorna true se as senhas coincidirem, caso contrário, retorna false
        } catch (error) {
            console.error("Erro ao verificar usuário:", error);
            return false; // Retorna false se ocorrer um erro ao verificar o usuário
        }
    }

    static async getUsuario(email, senha) {
        try {
            const usuario = await JSON.parse(await AsyncStorage.getItem(email));
            return usuario; // Retorna true se as senhas coincidirem, caso contrário, retorna false
        } catch (error) {
            console.error("Erro ao verificar usuário:", error);
            return false; // Retorna false se ocorrer um erro ao verificar o usuário
        }
    }

    //setUsuarioLogado
    static async setUsuarioLogado(email) {
        try {
            console.log("setUsuarioLogado", email);
            if (!email) {
                await AsyncStorage.removeItem("usuarioLogado");
                return;
            }
            await AsyncStorage.setItem("usuarioLogado", email);
            return;
        } catch (error) {
            console.error("Erro ao setar usuário logado:", error);
        }
    }

    // isAuthenticated
    static async isAuthenticated() {
        try {
            const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
            if (usuarioLogado !== null) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erro ao verificar usuário logado:", error);
            return false; // Em caso de erro, assumimos que não há ninguém logado
        }
    }

    // GetAuthenticated
    static async GetAuthenticated() {
        try {
            return await AsyncStorage.getItem("usuarioLogado");
        } catch (error) {
            console.error("Erro ao pegar usuário logado:", error);
            return false;
        }
    }

    // Método para trocar a senha do usuário
    static async trocarSenha(email, novaSenha) {
        try {
            const usuario = JSON.parse(await AsyncStorage.getItem(email));
            usuario.senha = novaSenha;
            await AsyncStorage.setItem(email, usuario);
            return true;
        } catch (error) {
            console.error("Erro ao trocar a senha:", error);
            return false;
        }
    }
}

export default UserDataService;
