import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";


// You can import from local files

// or any pure javascript modules available in npm
import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper';
export default function QuestionsScreen({ navigation }) {

  useEffect(() => {
    // Utiliza un efecto asíncrono para realizar la navegación después de la renderización inicial
    const navigateToStep0 = async () => {
      navigation.replace("Step0");
    };

    navigateToStep0();
  }, [navigation]); // Asegúrate de incluir 'navigation' como una dependencia del efecto


  return (
    <View>
 
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});