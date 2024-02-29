import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Signature from "react-native-signature-canvas";
import { firebase } from "../config";
import * as FileSystem from "expo-file-system";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import {
  Button,
  MD3Colors,
  ProgressBar,
  TextInput,
  Divider,
} from "react-native-paper";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const Sign = ({ navigation }) => {
  const ref = useRef(null);
  const [signature, setSign] = useState(null);
  const user = auth.currentUser;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Aide Signature",
      headerStyle: {
        backgroundColor: "#cf93c0", // Cambia el color de fondo del encabezado
      },
      headerTintColor: "white", // Cambia el color del texto en el encabezado
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 80;
      });
  }, [isFocused]);

  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 100;
    });

    navigation.navigate("Step3");
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  const obtenerFormatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");

    return `${year}_${month}_${day}_${hours}_${minutes}`;
  };

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    setSign(signature);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
    console.log("End");
  };

  // Called after ref.current.getData()
  const handleData = async (data) => {
    try{
    const fecha = new Date();
    const formatoFecha = obtenerFormatoFecha(fecha);

    // Convertir la firma de base64 a un archivo de imagen
    const fileName = "signature_user_" + formatoFecha + ".png";
    const filePath = FileSystem.documentDirectory + fileName;
    FileSystem.writeAsStringAsync(
      filePath,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    );

    // Subir el archivo de imagen a Firebase Storage
    const response = await fetch(filePath);
    const blob = await response.blob();
    const storageRef = storage.ref().child(`signatures/${fileName}`);
    await storageRef.put(blob);

    // Obtener la URL de descarga del archivo subido
    const downloadURL = await storageRef.getDownloadURL();
    console.log("URL de descarga:", downloadURL);

    navigation.navigate("Step3");
    }catch (error) {
      // Manejo del error: Mostrar un mensaje al usuario
      console.error("Error al guardar la firma:", error);
      showToast();
    }

  };

  return (
    <View style={styles.container}>
      <Signature
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        descriptionText={"Sign"}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.goBack()}
          mode="outlined"
          icon={"arrow-left"}
          style={styles.button}
        >
          Back
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinea los elementos a los lados opuestos
    marginHorizontal: 16, // Ajusta el margen horizontal según sea necesario
    margin: 32, // Ajusta el margen superior según sea necesario
  },
  formEntry: {
    margin: 8,
  },
  formEntry2: {
    margin: 8,
    marginBottom: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
    height: 7,
  },
  titulo: {
    fontSize: 20,
    color: "#34434D",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },

  button2: {
    width: 100,
    margin: 8,
  },
  textInput: {
    marginHorizontal: 1,
    height: 35,
    padding: 10,
    borderRadius: 25,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#cf93c0",
    underlineColor: "transparent",
    underlineColorAndroid: "transparent",
  },
  tituloXs: {
    fontSize: 15,
    color: "#34434D",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  divider: {
    marginTop: 32, // Ajusta el margen horizontal según sea necesario
  },
});

export default Sign;