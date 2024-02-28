import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";

import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");

export default function Step0Screen({ navigation }) {
  // keep back arrow from showing

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Client Information",
      headerStyle: {
        backgroundColor: "#cf93c0", // Cambia el color de fondo del encabezado
      },
      headerTintColor: "white", // Cambia el color del texto en el encabezado
    });
  }, [navigation]);

  const isFocused = useIsFocused();
  const animation = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });

    //console.log("updated state...", WizardStore.getRawState().progress);
  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 50;
      s.clientName = data.clientName;
      s.clientPhone = data.clientPhone;
      s.clientAddress = data.clientAddress;
    });
    navigation.navigate("Step1");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProgressBar
          style={styles.progressBar}
          progress={WizardStore.useState().progress / 100}
          color={MD3Colors.primary60}
        />

        <View
          style={{
            alignItems: "center",
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: width,
              height: height / 4,
              backgroundColor: "#fff",
            }}
            source={require("../assets/personalInformation.json")}
          />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <RHFTextInput
            control={control}
            errors={errors}
            inputProps={{
              label: "Client Name",
              placeholder: "Client Name",
              name: "clientName",
              title: "Client Name",
              style: styles.titulo,
            }}
          />
          <RHFTextInput
            control={control}
            errors={errors}
            inputProps={{
              label: "Client's phone",
              placeholder: "Client's phone",
              name: "clientPhone",
              title: "Client's phone",
              style: styles.titulo,
            }}
          />

          <RHFTextInput
            control={control}
            errors={errors}
            inputProps={{
              label: "Client's address",
              placeholder: "Client's address",
              name: "clientAddress",
              title: "Client's address",
              style: styles.tituloXs,
            }}
          />

        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.goBack()}
          mode="outlined"
          icon={"arrow-left"}
          style={styles.button}
        >
          Back
        </Button>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          icon={"arrow-right"}
          direction="rtl"
          style={styles.button2}
        >
          Next
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
  button2: {
    width: 100,
  },
  formEntry: {
    margin: 8,
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
  textInput: {
    marginHorizontal: 8,
    height: 55,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#cf93c0",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinea los elementos a los lados opuestos
    marginHorizontal: 16, // Ajusta el margen horizontal según sea necesario
    margin: 32, // Ajusta el margen superior según sea necesario
  },
  titulo: {
    fontSize: 17,
    color: "#34434D",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
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
function RHFTextInput({ control, errors, inputProps }) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.formEntry}>
        <Text style={inputProps.style}>{inputProps.title}</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={inputProps.placeholder}
              underlineColorAndroid="transparent" // Para Android
              underlineColor="transparent" // Para iOS
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              inputAccessoryView={() => null}
              textAlign="center" // Alinea horizontalmente el texto dentro del input
              textAlignVertical="center"
              placeholderTextColor="gray"
            />
          )}
          name={inputProps.name}
        />
        {errors[`${inputProps.name}`] && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

      <Divider style={styles.divider} />
    </View>
  );
}
