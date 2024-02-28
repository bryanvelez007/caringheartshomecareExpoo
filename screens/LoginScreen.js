import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { firebase } from "../config";
import ButtonGradient from "../components/ButtonGradient";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const auth = firebase.auth();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  function SvgTop() {
    return (
      <Svg
        width={500}
        height={324}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definir el gradiente */}
        <Defs>
          <LinearGradient
            id="gradient"
            x1={492.715}
            y1={231.205}
            x2={480.057}
            y2={364.215}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#cf93c0" />
            <Stop offset={1} stopColor="#cf93c0" />
          </LinearGradient>
        </Defs>

        {/* Primer segmento del gradiente */}
        <Path
          d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
          fill="url(#gradient)"
          fillOpacity={0.5}
        />

        {/* Segundo segmento del gradiente */}
        <Path
          d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
          fill="url(#gradient)"
        />

        {/* Agregar la imagen de Instagram */}

        <Image
          source={require("../assets/logo.png")} // Correct way to specify the source for a local image
          style={{
            position: "absolute",
            top: height / 11, // Ajusta la posición vertical de la imagen
            left: width / 3 + 20, // Ajusta la posición horizontal de la imagen
            width: 200, // Ajusta el ancho de la imagen
            height: 200, // Ajusta la altura de la imagen
            zIndex: 2, // Ajusta el zIndex para asegurarte de que esté encima del SVG
          }}
        />
      </Svg>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerSVG}>
          <SvgTop />
        </View>
        <View style={styles.container}>
          <Text style={styles.titulo}>Hello</Text>
          <Text style={styles.subTitle}>Sign In to your account</Text>
          <TextInput
            style={styles.textInput}
            placeholder="email@email.com"
            value={email}
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <ButtonGradient onPress={handleLogin} text="SIGN IN" marginTop={30} />
          <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
            <Text style={styles.forgotPassword}>Don't have an account</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  container: {
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titulo: {
    fontSize: 80,
    color: "#34434D",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  containerSVG: {
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
    textAlign: "right",
  },
});

export default LoginScreen;
