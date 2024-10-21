import {StyleSheet, Text, View, TextInput } from "react-native";

interface TextInputLoginProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    secureTextEntry?: boolean;
}

const TextInputLogin = ({ placeholder, onChangeText, value, secureTextEntry }: TextInputLoginProps) => {
    return (
        <View style = {styles.containerText}>
            <TextInput 
                placeholder = {placeholder}
                onChangeText = {onChangeText}
                value = {value}
                secureTextEntry = {secureTextEntry}
            />
        </View>
    );
}

export default TextInputLogin;

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
        height: 40,
        alignSelf: "center",

    },

});