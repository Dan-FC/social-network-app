import { View, Pressable, StyleSheet, Text } from "react-native";

interface ButtonLoginSignUpProps {
    title: string;
    submit: () => void;
    colorUnpressed: string;
    colorPressed: string;
}

const ButtonLoginSignUp = (props : ButtonLoginSignUpProps) => {
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

export default ButtonLoginSignUp;

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 1,
        borderRadius: 5,
        fontSize: 20,
        width: 340,
        alignSelf: "center",
        alignContent: "center",
        height: 40,
      },
      textButton: {
            color: "#ffffff",
            fontSize: 14,
            height: 45,
            alignContent: "center",
            textAlign: "center",
            marginTop: 10,
        }
});