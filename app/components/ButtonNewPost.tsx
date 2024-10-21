import { View, Pressable, StyleSheet, Text } from "react-native";

interface ButtonNewPostProps {
    title: string;
    submit: () => void;
    colorUnpressed: string;
    colorPressed: string;
}

const ButtonNewPost = (props : ButtonNewPostProps) => {
    return (
        <View>
            <Pressable 
                onPress = {props.submit}
                style = {({ pressed }) => [
                    {
                        backgroundColor: pressed
                        ? props.colorPressed
                        : props.colorUnpressed
                    },
                    styles.button
                ]}
            >
                <View>
                    <Text style = {styles.textButton}>{props.title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default ButtonNewPost;

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 10,
        justifyContent: "center", // Centrar verticalmente
        alignItems: "center", // Centrar horizontalmente
        backgroundColor: "#3498db", // Asegúrate de agregar un color de fondo
        alignSelf: "center",
        alignContent: "center",

      },
      textButton: {
        color: "#ffffff",
        fontSize: 60,
        textAlign: "center", // Centrar el texto horizontalmente
        marginTop: -10, // Ajusta el margen superior según tus necesidades
        }
});