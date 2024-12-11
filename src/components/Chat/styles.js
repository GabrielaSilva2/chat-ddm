
import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4E1DD", // Cor de fundo
    },
    messagesContainer: {
        padding: 16,
        flexGrow: 1,
    },
    messageContainer: {
        maxWidth: "80%", // Largura máxima das mensagens
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
    },
    currentUserMessage: {
        alignSelf: "flex-end", // Mensagens do usuário atual à direita
        backgroundColor: "#1B0A3E", // Cor de fundo para mensagens do usuário atual
    },
    otherUserMessage: {
        alignSelf: "flex-start", // Mensagens de outros usuários à esquerda
        backgroundColor: "#BAEFA5", // Cor de fundo para mensagens de outros usuários
    },
    messageText: {
        fontSize: 16,
        color: "#fff", // Cor do texto das mensagens
    },
    messageTimestamp: {
        fontSize: 12,
        color: "#888", // Cor do texto do timestamp das mensagens
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
    },

    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "black",
    },
    textProfileName: {
        color: "#F10808",
        fontWeight: "bold",
        fontSize: 20,
        marginEnd: 20,
    },
    header: {
    },
    image: {
        alignItems: "flex-end",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1B0A3E",
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 80, // Altura do cabeçalho personalizado
        borderBottomLeftRadius: 60,
    },
    headerIcon: {
        fontSize: 23,
        color: "white",
    },
    headerUserInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    files: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 10,
        marginVertical: 5
    },
    messageImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginVertical: 8,
    },
});