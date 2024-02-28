import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navegar a la pantalla de login después de 5 segundos
      navigation.replace("Login");
    }, 5000);

    // Limpiar el temporizador en caso de que el componente se desmonte antes de que se complete
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height / 4,
          backgroundColor: "#f1f1f1",
          marginTop: 60
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/hi.json")}
      />

      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height / 4,
          backgroundColor: "#f1f1f1",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/old.json")}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default SplashScreen;
