import { StyleSheet, View, TextInput } from "react-native";

interface TextInputNewPostProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const TextInputNewPost = ({ placeholder, value, onChangeText }: TextInputNewPostProps) => {
    return (
        <View style={styles.containerText}>
            <TextInput 
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                multiline // Permite que el texto sea multilínea
            />
        </View>
    );
};

export default TextInputNewPost;

const styles = StyleSheet.create({
    containerText: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#828282",
        shadowColor: "#000000",
        padding: 10,
        margin: 10,
        width: 340,
        alignSelf: "center",
    },
    input: {
        height: 100, // Ajustamos la altura para permitir más texto
        textAlignVertical: "top", // Para que el texto comience desde arriba
    },
});
