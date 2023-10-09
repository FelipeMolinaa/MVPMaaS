import AsyncStorage from "@react-native-async-storage/async-storage";
class UserDataService {
    static async cadastrarUsuario(nome, email, senha) {
        try {
            const usuario = { nome, email, senha };
            await AsyncStorage.setItem(email, JSON.stringify(usuario));
            return true;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return false;
        }
    }

    static async verificarUsuario(email, senha) {
        try {
            const usuario = await JSON.parse(await AsyncStorage.getItem(email));
            return usuario.senha === senha;
        } catch (error) {
            console.error("Erro ao verificar usuário:", error);
            return false;
        }
    }

    static async getUsuario(email) {
        try {
            const usuario = await JSON.parse(await AsyncStorage.getItem(email));
            return usuario;
        } catch (error) {
            console.error("Erro ao verificar usuário:", error);
            return false;
        }
    }

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
            return false;
        }
    }

    static async GetAuthenticated() {
        try {
            return await AsyncStorage.getItem("usuarioLogado");
        } catch (error) {
            console.error("Erro ao pegar usuário logado:", error);
            return false;
        }
    }

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
