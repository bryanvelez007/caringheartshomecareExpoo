import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import ButtonGradient from "../components/ButtonGradient";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import { firebase } from "../config";

const auth = firebase.auth();
const firestore = firebase.firestore();

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Add user information to Firestore 
      await firestore.collection("users").doc(email).collection("info").doc("userData").set({
        fullName,
        address,
        dateBirth,
        phoneNumber,
        email
      });

      // Send verification email
      await userCredential.user.sendEmailVerification();

      Alert.alert(
        "Success",
        "Account created successfully. Please verify your email."
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEmailChange = (text) => {
    // Convertir el texto a minúsculas y actualizar el estado
    setEmail(text.toLowerCase());
  };

  function SvgTop() {
    return (
      <Svg
        width={width}
        height={200}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definir el gradiente */}
        <Defs>
          <LinearGradient
            id="gradient"
            x1={492.715}
            y1={41.205}
            x2={480.057}
            y2={94.215}
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
            top: height / 15, // Ajusta la posición vertical de la imagen
            left: width / 3, // Ajusta la posición horizontal de la imagen
            width: 140, // Ajusta el ancho de la imagen
            height: 140, // Ajusta la altura de la imagen
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
        <Text style={styles.titulo}>Hello</Text>
        <Text style={styles.subTitle}>Register your account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Date of birth  YYYY-MM-DD"
          value={dateBirth}
          onChangeText={(text) => setDateBirth(text)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Cell number"
          value={phoneNumber} 
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="email@email.com"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        ></TextInput>
        <ButtonGradient onPress={handleSignUp} text="Register" margintop={20} />
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.forgotPassword}>already have an account?</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
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
    fontSize: 60,
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
    marginTop: 10,
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

export default SignUpScreen;
