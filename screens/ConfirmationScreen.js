import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { WizardStore } from "../store";
import {
  Button,
  MD3Colors,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";
import { firebase } from "../config";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ConfirmationScreen({ navigation }) {
  const information = WizardStore.useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const animation = useRef(null);

  const obtenerFormatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    (async () => {
      console.log("ENTRAMOS");
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      const user = auth.currentUser;

      console.log("Request");
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        console.log("denegado");
        return;
      } else {
        console.log("Permiso de ubicación access");
      }

      // Obtener la ubicación actual del usuario
      let location = await Location.getCurrentPositionAsync({});

      console.log(location);

      const fecha = new Date();
      const formatoFecha = obtenerFormatoFecha(fecha);

      const activitiesRef = firestore.collection(
        `users/${user.email}/activities`
      );

      // Obtener el último registro (podrías implementar una lógica más específica)
      const snapshot = await activitiesRef
        .orderBy("dateStart", "desc")
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const lastActivity = snapshot.docs[0];

        // Añadir el campo dateEnd con la hora actual
        await lastActivity.ref.update({
          ...information,
          ubication: location.coords.latitude + "," + location.coords.longitude,
          dateEnd: formatoFecha,
        });
      }

      navigation.replace("Home");
      setLocation(location);
    })();
  }, []);

  /*
   

  */

  //console.log(informationWithUbication);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const clearAndReset = () => {
    WizardStore.replace({
      fullName: "",
      progress: 0,
    });
    setVisible(false);
    navigation.navigate("Step1");
  };

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: "80%",
          backgroundColor: "#fff",
        }}
        source={require("../assets/loading.json")}
      />

      <Text style={styles.titulo}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  progressBar: {
    marginBottom: 16,
  },

  forgotPassword: {
    margin: 68,
  },
  titulo: {
    fontSize: 45,
    color: "gray",
    fontWeight: "bold",
    alignItems: "center",
    alignContent: "center",
  },
});
