import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
const { width, height } = Dimensions.get("window");
import {
  Button,
  MD3Colors,
  ProgressBar,
  TextInput,
  Divider,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IconButton } from "react-native-paper";
import LottieView from "lottie-react-native";

export default function Step1Screen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);

  const animation = useRef(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Personal Care",
      headerStyle: {
        backgroundColor: "#cf93c0", // Cambia el color de fondo del encabezado
      },
      headerTintColor: "white", // Cambia el color del texto en el encabezado
    });
  }, [navigation]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
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
        s.progress = 50;
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    const selectedOptions = [];

    // Verificar cada opción y agregarla a selectedOptions si está marcada
    if (data.bed === "true") {
      selectedOptions.push("bed");
    }
    if (data.shower === "true") {
      selectedOptions.push("shower");
    }
    if (data.tub === "true") {
      selectedOptions.push("tub");
    }
    if (data.sponge === "true") {
      selectedOptions.push("sponge");
    }

    const selectedHairCareOptions = [];
    if (data.combedBrushed === "true") {
      selectedHairCareOptions.push("combedBrushed");
    }
    if (data.shampooed === "true") {
      selectedHairCareOptions.push("shampooed");
    }

    const selectedMouthCareOptions = [];
    if (data.dentures === "true") {
      selectedMouthCareOptions.push("dentures");
    }

    if (data.MouthCareYes === "true") {
      selectedMouthCareOptions.push("yes");
    }

    if (data.MouthCareNo === "true") {
      selectedMouthCareOptions.push("no");
    }

    const selectedNailsCareOptions = [];
    if (data.cleanAndFile === "true") {
      selectedNailsCareOptions.push("CleanAndFile");
    }

    if (data.NailCareYes === "true") {
      selectedNailsCareOptions.push("Yes");
    }

    if (data.NailCareNo === "true") {
      selectedNailsCareOptions.push("No");
    }

    if (data.doNotCutNails === "true") {
      selectedNailsCareOptions.push("DoNotCutNails");
    }

    const selectedFootCareOption = [];
    if (data.footCare === "true") {
      selectedFootCareOption.push("yes");
    } else {
      selectedFootCareOption.push("no");
    }

    const selectedSpecialSkinCareOptions = [];
    if (data.specialSkinCareYes === "true") {
      selectedSpecialSkinCareOptions.push("yes");
    }
    if (data.specialSkinCareNo === "true") {
      selectedSpecialSkinCareOptions.push("yes");
    }
    if (data.reportRedness !== undefined && data.reportRedness !== null) {
      selectedSpecialSkinCareOptions.push(data.reportRedness);
    }

    const selectedSpecialDietOptions = [];
    if (data.specialDietYes === "true") {
      selectedSpecialDietOptions.push("yes");
    }

    if (data.specialDietNo === "true") {
      selectedSpecialDietOptions.push("No");
    }

    if (
      data.specialDietComment !== undefined &&
      data.specialDietComment !== null
    ) {
      selectedSpecialDietOptions.push(data.specialDietComment);
    }

    const selectedMeasureIntakeOutputOptions = [];
    if (data.measureIntakeOutputYes === "true") {
      selectedMeasureIntakeOutputOptions.push("yes");
    }

    if (data.measureIntakeOutputNo === "true") {
      selectedMeasureIntakeOutputOptions.push("No");
    }

    if (
      data.measureIntakeOutputComment !== undefined &&
      data.measureIntakeOutputComment !== null
    ) {
      selectedMeasureIntakeOutputOptions.push(data.measureIntakeOutputComment);
    }

    const selectedOfferFluidsOptions = [];
    if (data.offerFluidsYes === "true") {
      selectedSpecialDietOptions.push("yes");
    }

    if (data.offerFluidsNo === "true") {
      selectedSpecialDietOptions.push("No");
    }

    const selectedMonitoredEncouragedMedicineComplianceOptions = [];
    if (data.monitoredEncouragedMedicineComplianceYes === "true") {
      selectedMonitoredEncouragedMedicineComplianceOptions.push("yes");
    }

    if (data.monitoredEncouragedMedicineComplianceNo === "true") {
      selectedMonitoredEncouragedMedicineComplianceOptions.push("No");
    }

    const selectedIncontinentCareOptions = [];
    if (data.changedDiaper === "true") {
      selectedIncontinentCareOptions.push("changedDiaper");
    }
    if (data.pads === "true") {
      selectedIncontinentCareOptions.push("pads");
    }

    const selectedDressingOptions = [];
    if (data.dressing === "true") {
      selectedDressingOptions.push("yes");
    } else {
      selectedDressingOptions.push("no");
    }

    const selectedGroomingOptions = [];
    if (data.shaved === "true") {
      selectedGroomingOptions.push("shaved");
    }
    if (data.GroomingNo == "true") {
      selectedGroomingOptions.push("No");
    }
    if (data.GroomingYes == "true") {
      selectedGroomingOptions.push("Yes");
    }

    const selectedAssistBowelBladderOptions = [];
    if (data.assistBowelBladder === "true") {
      selectedAssistBowelBladderOptions.push("yes");
    } else {
      selectedAssistBowelBladderOptions.push("no");
    }

    const selectedCatheterCareOptions = [];
    if (data.CatheterCareYes === "true") {
      selectedCatheterCareOptions.push("yes");
    }
    if (data.CatheterCareNo === "true") {
      selectedCatheterCareOptions.push("no");
    }
    if (data.emptiedBag === "true") {
      selectedCatheterCareOptions.push("emptiedBag");
    }

    const selectedRecordBowelMovementOptions = [];
    if (data.recordBowelMovementYes === "true") {
      selectedRecordBowelMovementOptions.push("yes");
    }
    if (data.recordBowelMovementNo === "true") {
      selectedRecordBowelMovementOptions.push("no");
    }

    const selectedweighClientOptions = [];
    if (data.weighClientGain === "true") {
      selectedweighClientOptions.push("Gain");
    }
    if (data.weighClientLose === "true") {
      selectedweighClientOptions.push("Lose");
    }
    if (data.weighClientNone === "true") {
      selectedweighClientOptions.push("none");
    }

    if (
      data.weighClientComment !== undefined &&
      data.weighClientComment !== null
    ) {
      selectedweighClientOptions.push(data.weighClientComment);
    }

    const selectedObservedChangesAndReportedOptions = [];
    if (data.observedChangesAndReportedYes === "true") {
      selectedObservedChangesAndReportedOptions.push("yes");
    }

    if (data.observedChangesAndReportedNo === "true") {
      selectedObservedChangesAndReportedOptions.push("No");
    }

    if (
      data.observedChangesAndReportedComment !== undefined &&
      data.observedChangesAndReportedComment !== null
    ) {
      selectedObservedChangesAndReportedOptions.push(
        data.observedChangesAndReportedComment
      );
    }

    const selectedShoppingOptions = [];
    if (data.shoppingYes === "true") {
      selectedShoppingOptions.push("yes");
    }

    if (data.shoppingNo === "true") {
      selectedShoppingOptions.push("No");
    }

    if (data.shoppingComment !== undefined && data.shoppingComment !== null) {
      selectedShoppingOptions.push(data.shoppingComment);
    }

    const selectedChangeBedLineOptions = [];
    if (data.changeBedLineYes === "true") {
      selectedChangeBedLineOptions.push("yes");
    }

    if (data.changeBedLineNo === "true") {
      selectedChangeBedLineOptions.push("No");
    }

    const selectedWashEssentialLaundryOptions = [];
    if (data.washEssentialLaundryYes === "true") {
      selectedWashEssentialLaundryOptions.push("yes");
    }

    if (data.washEssentialLaundryNo === "true") {
      selectedWashEssentialLaundryOptions.push("No");
    }

    const selectedFeedClientOptions = [];
    if (data.feedClientYes === "true") {
      selectedFeedClientOptions.push("yes");
    }

    if (data.feedClientNo === "true") {
      selectedFeedClientOptions.push("No");
    }

    const selectedAssistWithClientTransferOptions = [];
    if (data.assistWithClientTransferYes === "true") {
      selectedAssistWithClientTransferOptions.push("yes");
    }

    if (data.assistWithClientTransferNo === "true") {
      selectedAssistWithClientTransferOptions.push("No");
    }

    const selectedPositionTurnClientInBedOptions = [];
    if (data.positionTurnClientInBedYes === "true") {
      selectedPositionTurnClientInBedOptions.push("yes");
    }

    if (data.positionTurnClientInBedNo === "true") {
      selectedPositionTurnClientInBedOptions.push("No");
    }

    // TBD 1
    const selectedAssistWithExerciseOptions = [];
    if (data.assistWithExerciseYes === "true") {
      selectedAssistWithExerciseOptions.push("yes");
    }

    if (data.assistWithExerciseNo === "true") {
      selectedAssistWithExerciseOptions.push("No");
    }

    // TBD 2
    const selectedProvideCompanionshipOptions = [];
    if (data.provideCompanionshipYes === "true") {
      selectedProvideCompanionshipOptions.push("yes");
    }

    if (data.provideCompanionshipNo === "true") {
      selectedProvideCompanionshipOptions.push("No");
    }

    // TBD 3
    const selectedRealityOrientationOptions = [];
    if (data.realityOrientationYes === "true") {
      selectedRealityOrientationOptions.push("yes");
    }

    if (data.realityOrientationNo === "true") {
      selectedRealityOrientationOptions.push("No");
    }

    // TBD 4
    const selectedOtherDutiesOptions = [];
    if (data.otherDutiesYes === "true") {
      selectedOtherDutiesOptions.push("yes");
    }

    if (data.otherDutiesNo === "true") {
      selectedOtherDutiesOptions.push("No");
    }

    if (
      data.otherDutiesComment !== undefined &&
      data.otherDutiesComment !== null
    ) {
      selectedOtherDutiesOptions.push(data.otherDutiesComment);
    }

    WizardStore.update((s) => {
      s.progress = 100;
      s.bathing = selectedOptions;
      s.hairCare = selectedHairCareOptions;
      s.mouthCare = selectedMouthCareOptions;
      s.nailCare = selectedNailsCareOptions;
      s.footCare = selectedFootCareOption;
      s.specialSkinCare = selectedSpecialSkinCareOptions;
      s.specialDiet = selectedSpecialDietOptions;
      s.measureIntakeOutput = selectedMeasureIntakeOutputOptions;
      s.offerFluids = selectedOfferFluidsOptions;
      s.monitoredEncouragedMedicineCompliance =
        selectedMonitoredEncouragedMedicineComplianceOptions;
      s.incontinentCare = selectedIncontinentCareOptions;
      s.dressing = selectedDressingOptions;
      s.grooming = selectedGroomingOptions;
      s.assistBowelBladder = selectedAssistBowelBladderOptions;
      s.catheterCare = selectedCatheterCareOptions;
      s.recordBowelMovement = selectedRecordBowelMovementOptions;
      s.weighClient = selectedweighClientOptions;
      s.observedChangesAndReported = selectedObservedChangesAndReportedOptions;
      s.selectedShopping = selectedShoppingOptions;
      s.washEssentialLaundry = selectedWashEssentialLaundryOptions;
      s.feedClient = selectedFeedClientOptions;
      s.assistWithClientTransfer = selectedAssistWithClientTransferOptions;
      s.positionTurnClientInBed = selectedPositionTurnClientInBedOptions;

      s.assistWithExercise = selectedAssistWithExerciseOptions;
      s.provideCompanionship = selectedProvideCompanionshipOptions;
      s.realityOrientation = selectedRealityOrientationOptions;
      s.otherDuties = selectedOtherDutiesOptions;
    });
    navigation.navigate("Step2");
  };

  return (
    <View style={styles.container}>
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
            source={require("../assets/questions.json")}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          {/* INICIO PREGUNTA 1 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Bathing</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("bed") === "true" ? "heartbeat" : "heart-o"
                        }
                        size={30}
                        color="pink" // ajusta el color según tus necesidades
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "bed",
                        getValues("bed") === "true" ? "" : "true"
                      );
                      trigger("bed");
                    }}
                    color="transparent"
                  />
                )}
                name="bed"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Bed</Text>
            </View>
            {errors.bed && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("shower") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink" // ajusta el color según tus necesidades
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "shower",
                        getValues("shower") === "true" ? "" : "true"
                      );
                      trigger("shower");
                    }}
                    color="transparent"
                  />
                )}
                name="shower"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Shower</Text>
            </View>
            {errors.shower && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("tub") === "true" ? "heartbeat" : "heart-o"
                        }
                        size={30}
                        color="pink" // ajusta el color según tus necesidades
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "tub",
                        getValues("tub") === "true" ? "" : "true"
                      );
                      trigger("tub");
                    }}
                    color="transparent"
                  />
                )}
                name="tub"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Tub</Text>
            </View>
            {errors.tub && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("sponge") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink" // ajusta el color según tus necesidades
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "sponge",
                        getValues("sponge") === "true" ? "" : "true"
                      );
                      trigger("sponge");
                    }}
                    color="transparent"
                  />
                )}
                name="sponge"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Sponge</Text>
            </View>
            {errors.sponge && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>

          {/* FINAL PREGUNTA 1 */}

          <Divider />
          {/* INICIO PREGUNTA 2 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Hair Care</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("combedBrushed") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "combedBrushed",
                        getValues("combedBrushed") === "true" ? "" : "true"
                      );
                      trigger("combedBrushed");
                    }}
                    color="transparent"
                  />
                )}
                name="combedBrushed"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>
                Combed/Brushed
              </Text>
            </View>
            {errors.combedBrushed && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("shampooed") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "shampooed",
                        getValues("shampooed") === "true" ? "" : "true"
                      );
                      trigger("shampooed");
                    }}
                    color="transparent"
                  />
                )}
                name="shampooed"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Shampooed</Text>
            </View>
            {errors.shampooed && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 2 */}
          <Divider />

          {/* INICIO PREGUNTA 3 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Mouth Care</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("MouthCareYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "MouthCareYes",
                        getValues("MouthCareYes") === "true" ? "" : "true"
                      );
                      trigger("MouthCareYes");
                    }}
                    color="transparent"
                  />
                )}
                name="MouthCareYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.MouthCareYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("MouthCareNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "MouthCareNo",
                        getValues("MouthCareNo") === "true" ? "" : "true"
                      );
                      trigger("MouthCareNo");
                    }}
                    color="transparent"
                  />
                )}
                name="MouthCareNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
            {errors.MouthCareNo && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("dentures") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "dentures",
                        getValues("dentures") === "true" ? "" : "true"
                      );
                      trigger("dentures");
                    }}
                    color="transparent"
                  />
                )}
                name="dentures"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Dentures</Text>
            </View>
            {errors.dentures && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 3*/}
          <Divider />

          {/* INICIO PREGUNTA 4 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Nail Care</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("NailCareYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "NailCareYes",
                        getValues("NailCareYes") === "true" ? "" : "true"
                      );
                      trigger("NailCareYes");
                    }}
                    color="transparent"
                  />
                )}
                name="NailCareYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.NailCareYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("NailCareNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "NailCareNo",
                        getValues("NailCareNo") === "true" ? "" : "true"
                      );
                      trigger("NailCareNo");
                    }}
                    color="transparent"
                  />
                )}
                name="NailCareNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
            {errors.NailCareNo && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("cleanAndFile") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "cleanAndFile",
                        getValues("cleanAndFile") === "true" ? "" : "true"
                      );
                      trigger("cleanAndFile");
                    }}
                    color="transparent"
                  />
                )}
                name="cleanAndFile"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>
                Clean and File
              </Text>
            </View>
            {errors.cleanAndFile && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 4 */}
          <Divider />

          {/* INICIO PREGUNTA 5 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Foot Care</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("footCare") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "footCare",
                        getValues("footCare") === "true" ? "" : "true"
                      );
                      trigger("footCare");
                    }}
                    color="transparent"
                  />
                )}
                name="footCare"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.footCare && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("footCare") === "false"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "footCare",
                        getValues("footCare") === "false" ? "" : "false"
                      );
                      trigger("footCare");
                    }}
                    color="transparent"
                  />
                )}
                name="footCare"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
            {errors.footCare && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 5 */}
          <Divider />

          {/* INICIAL PREGUNTA 6 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>
              Special Skin Care - Report redness
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("specialSkinCareYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "specialSkinCareYes",
                        getValues("specialSkinCareYes") === "true" ? "" : "true"
                      );
                      trigger("specialSkinCareYes");
                    }}
                    color="transparent"
                  />
                )}
                name="specialSkinCareYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.specialSkinCareYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("specialSkinCareNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "specialSkinCareNo",
                        getValues("specialSkinCareNo") === "true" ? "" : "true"
                      );
                      trigger("specialSkinCareNo");
                    }}
                    color="transparent"
                  />
                )}
                name="specialSkinCareNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Report Redness",
                placeholder: "Report Redness",
                name: "reportRedness",
                title: "Report Redness",
                style: styles.tituloXs,
                required: true
              }}
            />
          </View>
          {/* FINAL PREGUNTA 6*/}
          <Divider />

          {/* INICIO PREGUNTA 7*/}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Incontinent Care</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("changedDiaper") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "changedDiaper",
                        getValues("changedDiaper") === "true" ? "" : "true"
                      );
                      trigger("changedDiaper");
                    }}
                    color="transparent"
                  />
                )}
                name="changedDiaper"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>
                Changed Diaper
              </Text>
            </View>
            {errors.changedDiaper && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("pads") === "true" ? "heartbeat" : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "pads",
                        getValues("pads") === "true" ? "" : "true"
                      );
                      trigger("pads");
                    }}
                    color="transparent"
                  />
                )}
                name="pads"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Pads</Text>
            </View>
            {errors.pads && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 7*/}
          <Divider />

          {/* INICIO PREGUNTA 8*/}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Dressing</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("dressing") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "dressing",
                        getValues("dressing") === "true" ? "" : "true"
                      );
                      trigger("dressing");
                    }}
                    color="transparent"
                  />
                )}
                name="dressing"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.dressing && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("dressing") === "false"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "dressing",
                        getValues("dressing") === "false" ? "" : "false"
                      );
                      trigger("dressing");
                    }}
                    color="transparent"
                  />
                )}
                name="dressing"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 8*/}
          <Divider />

          {/* INICIAL PREGUNTA 9*/}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Grooming</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("GroomingYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "GroomingYes",
                        getValues("GroomingYes") === "true" ? "" : "true"
                      );
                      trigger("GroomingYes");
                    }}
                    color="transparent"
                  />
                )}
                name="GroomingYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.GroomingYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("GroomingNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "GroomingNo",
                        getValues("GroomingNo") === "true" ? "" : "true"
                      );
                      trigger("GroomingNo");
                    }}
                    color="transparent"
                  />
                )}
                name="GroomingNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
            {errors.GroomingNo && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("shaved") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "shaved",
                        getValues("shaved") === "true" ? "" : "true"
                      );
                      trigger("shaved");
                    }}
                    color="transparent"
                  />
                )}
                name="shaved"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Shaved</Text>
            </View>
            {errors.shaved && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}
          </View>
          {/* FINAL PREGUNTA 9*/}
          <Divider />

          {/* FINAL PREGUNTA 10*/}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>
              Assist with bowel/bladder function
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistBowelBladder") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistBowelBladder",
                        getValues("assistBowelBladder") === "true" ? "" : "true"
                      );
                      trigger("assistBowelBladder");
                    }}
                    color="transparent"
                  />
                )}
                name="assistBowelBladder"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.assistBowelBladder && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistBowelBladder") === "false"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistBowelBladder",
                        getValues("assistBowelBladder") === "false"
                          ? ""
                          : "false"
                      );
                      trigger("assistBowelBladder");
                    }}
                    color="transparent"
                  />
                )}
                name="assistBowelBladder"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 10*/}
          <Divider />

          {/* INICIAL PREGUNTA 11 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Catheter care</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("CatheterCareYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "CatheterCareYes",
                        getValues("CatheterCareYes") === "true" ? "" : "true"
                      );
                      trigger("CatheterCareYes");
                    }}
                    color="transparent"
                  />
                )}
                name="CatheterCareYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("CatheterCareNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "CatheterCareNo",
                        getValues("CatheterCareNo") === "true" ? "" : "true"
                      );
                      trigger("CatheterCareNo");
                    }}
                    color="transparent"
                  />
                )}
                name="CatheterCareNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("emptiedBag") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "emptiedBag",
                        getValues("emptiedBag") === "true" ? "" : "true"
                      );
                      trigger("emptiedBag");
                    }}
                    color="transparent"
                  />
                )}
                name="emptiedBag"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>
                Emptied bag
              </Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 11 */}
          <Divider />

          {/* INICIAL PREGUNTA 12 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Special Diet</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("specialDietYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "specialDietYes",
                        getValues("specialDietYes") === "true" ? "" : "true"
                      );
                      trigger("specialDietYes");
                    }}
                    color="transparent"
                  />
                )}
                name="specialDietYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.specialDietYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("specialDietNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "specialDietNo",
                        getValues("specialDietNo") === "true" ? "" : "true"
                      );
                      trigger("specialDietNo");
                    }}
                    color="transparent"
                  />
                )}
                name="specialDietNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Comments",
                placeholder: "Comments",
                name: "specialDietComment",
                title: "Comments",
                style: styles.tituloXs,
                required: true
              }}
            />
          </View>
          {/* FINAL PREGUNTA 12*/}
          <Divider />

          {/* INICIAL PREGUNTA 13 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Offer Fluids</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("offerFluidsYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "offerFluidsYes",
                        getValues("offerFluidsYes") === "true" ? "" : "true"
                      );
                      trigger("offerFluidsYes");
                    }}
                    color="transparent"
                  />
                )}
                name="offerFluidsYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.offerFluidsYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("offerFluidsNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "offerFluidsNo",
                        getValues("offerFluidsNo") === "true" ? "" : "true"
                      );
                      trigger("offerFluidsNo");
                    }}
                    color="transparent"
                  />
                )}
                name="offerFluidsNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 13*/}
          <Divider />

          {/* INICIAL PREGUNTA 14 */}
          <View style={styles.formEntry}>
            <Text style={styles.tituloXs}>
              Monitored / Encouraged Medicine Compliance
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues(
                            "monitoredEncouragedMedicineComplianceYes"
                          ) === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "monitoredEncouragedMedicineComplianceYes",
                        getValues(
                          "monitoredEncouragedMedicineComplianceYes"
                        ) === "true"
                          ? ""
                          : "true"
                      );
                      trigger("monitoredEncouragedMedicineComplianceYes");
                    }}
                    color="transparent"
                  />
                )}
                name="monitoredEncouragedMedicineComplianceYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.monitoredEncouragedMedicineComplianceYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues(
                            "monitoredEncouragedMedicineComplianceNo"
                          ) === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "monitoredEncouragedMedicineComplianceNo",
                        getValues("monitoredEncouragedMedicineComplianceNo") ===
                          "true"
                          ? ""
                          : "true"
                      );
                      trigger("monitoredEncouragedMedicineComplianceNo");
                    }}
                    color="transparent"
                  />
                )}
                name="monitoredEncouragedMedicineComplianceNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 14*/}
          <Divider />

          {/* INICIAL PREGUNTA 15 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Measure Intake / Output</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("measureIntakeOutputYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "measureIntakeOutputYes",
                        getValues("measureIntakeOutputYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("measureIntakeOutputYes");
                    }}
                    color="transparent"
                  />
                )}
                name="measureIntakeOutputYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.measureIntakeOutputYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("measureIntakeOutputNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "measureIntakeOutputNo",
                        getValues("measureIntakeOutputNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("measureIntakeOutputNo");
                    }}
                    color="transparent"
                  />
                )}
                name="measureIntakeOutputNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Number",
                placeholder: "Number",
                name: "measureIntakeOutputComment",
                title: "Number",
                style: styles.tituloXs,
                required: false
              }}
              required={false}
            />
          </View>
          {/* FINAL PREGUNTA 15*/}
          <Divider />

          {/* INICIAL PREGUNTA 16 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Record Bowel Movement</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("recordBowelMovementYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "recordBowelMovementYes",
                        getValues("recordBowelMovementYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("recordBowelMovementYes");
                    }}
                    color="transparent"
                  />
                )}
                name="recordBowelMovementYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.recordBowelMovementYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("recordBowelMovementNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "recordBowelMovementNo",
                        getValues("recordBowelMovementNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("recordBowelMovementNo");
                    }}
                    color="transparent"
                  />
                )}
                name="recordBowelMovementNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 16*/}
          <Divider />

          {/* INICIAL PREGUNTA 17 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Weigh client</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("weighClientGain") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "weighClientGain",
                        getValues("weighClientGain") === "true" ? "" : "true"
                      );
                      trigger("weighClientGain");
                    }}
                    color="transparent"
                  />
                )}
                name="weighClientGain"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Gain</Text>
            </View>
            {errors.weighClientGain && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("weighClientLose") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "weighClientLose",
                        getValues("weighClientLose") === "true" ? "" : "true"
                      );
                      trigger("weighClientLose");
                    }}
                    color="transparent"
                  />
                )}
                name="weighClientLose"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Lose</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("weighClientNone") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "weighClientNone",
                        getValues("weighClientNone") === "true" ? "" : "true"
                      );
                      trigger("weighClientNone");
                    }}
                    color="transparent"
                  />
                )}
                name="weighClientNone"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>None</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "How much?",
                placeholder: "How much?",
                name: "weighClientComment",
                title: "How much?",
                style: styles.tituloXs,
                required: true
              }}
            />
          </View>
          {/* FINAL PREGUNTA 17*/}
          <Divider />

          {/* INICIAL PREGUNTA 18 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Observed Changes And Reported</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("observedChangesAndReportedYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "observedChangesAndReportedYes",
                        getValues("observedChangesAndReportedYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("observedChangesAndReportedYes");
                    }}
                    color="transparent"
                  />
                )}
                name="observedChangesAndReportedYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.weighClientGain && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("observedChangesAndReportedNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "observedChangesAndReportedNo",
                        getValues("observedChangesAndReportedNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("observedChangesAndReportedNo");
                    }}
                    color="transparent"
                  />
                )}
                name="observedChangesAndReportedNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Comments",
                placeholder: "Comments",
                name: "observedChangesAndReportedComment",
                title: "Comments",
                style: styles.tituloXs,
                required: true
              }}
            />
          </View>
          {/* FINAL PREGUNTA 18*/}
          <Divider />

          {/* INICIAL PREGUNTA 19 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Shopping</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("shoppingYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "shoppingYes",
                        getValues("shoppingYes") === "true" ? "" : "true"
                      );
                      trigger("shoppingYes");
                    }}
                    color="transparent"
                  />
                )}
                name="shoppingYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.shoppingYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("shoppingNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "shoppingNo",
                        getValues("shoppingNo") === "true" ? "" : "true"
                      );
                      trigger("shoppingNo");
                    }}
                    color="transparent"
                  />
                )}
                name="shoppingNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Miles",
                placeholder: "Miles",
                name: "shoppingComment",
                title: "Miles",
                style: styles.tituloXs,
                required: true
              }}
            />
          </View>
          {/* FINAL PREGUNTA 19*/}
          <Divider />

          {/* INICIAL PREGUNTA 20 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Change Bed Linen</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("changeBedLineYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "changeBedLineYes",
                        getValues("changeBedLineYes") === "true" ? "" : "true"
                      );
                      trigger("changeBedLineYes");
                    }}
                    color="transparent"
                  />
                )}
                name="changeBedLineYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.shoppingYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("changeBedLineNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "changeBedLineNo",
                        getValues("changeBedLineNo") === "true" ? "" : "true"
                      );
                      trigger("changeBedLineNo");
                    }}
                    color="transparent"
                  />
                )}
                name="changeBedLineNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 20*/}
          <Divider />

          {/* INICIAL PREGUNTA 21 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Wash Essential Laundry</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("washEssentialLaundryYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "washEssentialLaundryYes",
                        getValues("washEssentialLaundryYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("washEssentialLaundryYes");
                    }}
                    color="transparent"
                  />
                )}
                name="washEssentialLaundryYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.shoppingYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("washEssentialLaundryNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "washEssentialLaundryNo",
                        getValues("washEssentialLaundryNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("washEssentialLaundryNo");
                    }}
                    color="transparent"
                  />
                )}
                name="washEssentialLaundryNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 21*/}
          <Divider />

          {/* INICIAL PREGUNTA 22 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Feed client</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("feedClientYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "feedClientYes",
                        getValues("feedClientYes") === "true" ? "" : "true"
                      );
                      trigger("feedClientYes");
                    }}
                    color="transparent"
                  />
                )}
                name="feedClientYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.feedClientYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("feedClientNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "feedClientNo",
                        getValues("feedClientNo") === "true" ? "" : "true"
                      );
                      trigger("feedClientNo");
                    }}
                    color="transparent"
                  />
                )}
                name="feedClientNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 22*/}
          <Divider />

          {/* INICIAL PREGUNTA 23 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Assist With Client Transfer</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistWithClientTransferYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistWithClientTransferYes",
                        getValues("assistWithClientTransferYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("assistWithClientTransferYes");
                    }}
                    color="transparent"
                  />
                )}
                name="assistWithClientTransferYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.assistWithClientTransferYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistWithClientTransferNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistWithClientTransferNo",
                        getValues("assistWithClientTransferNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("assistWithClientTransferNo");
                    }}
                    color="transparent"
                  />
                )}
                name="assistWithClientTransferNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 23*/}
          <Divider />

          {/* INICIAL PREGUNTA 24 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Position Turn Client In Bed</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("positionTurnClientInBedYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "positionTurnClientInBedYes",
                        getValues("positionTurnClientInBedYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("positionTurnClientInBedYes");
                    }}
                    color="transparent"
                  />
                )}
                name="positionTurnClientInBedYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.positionTurnClientInBedYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("positionTurnClientInBedNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "positionTurnClientInBedNo",
                        getValues("positionTurnClientInBedNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("positionTurnClientInBedNo");
                    }}
                    color="transparent"
                  />
                )}
                name="positionTurnClientInBedNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 24*/}
          <Divider />

          {/* INICIAL PREGUNTA 25 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Assist with exercise</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistWithExerciseYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistWithExerciseYes",
                        getValues("assistWithExerciseYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("assistWithExerciseYes");
                    }}
                    color="transparent"
                  />
                )}
                name="assistWithExerciseYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.assistWithExerciseYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("assistWithExerciseNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "assistWithExerciseNo",
                        getValues("assistWithExerciseNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("assistWithExerciseNo");
                    }}
                    color="transparent"
                  />
                )}
                name="assistWithExerciseNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 25*/}
          <Divider />

          {/* INICIAL PREGUNTA 26 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Provide Companionship</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("provideCompanionshipYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "provideCompanionshipYes",
                        getValues("provideCompanionshipYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("provideCompanionshipYes");
                    }}
                    color="transparent"
                  />
                )}
                name="provideCompanionshipYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.provideCompanionshipYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("provideCompanionshipNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "provideCompanionshipNo",
                        getValues("provideCompanionshipNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("provideCompanionshipNo");
                    }}
                    color="transparent"
                  />
                )}
                name="provideCompanionshipNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 26*/}
          <Divider />









          {/* INICIAL PREGUNTA 27 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Reality Orientation</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("realityOrientationYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "realityOrientationYes",
                        getValues("realityOrientationYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("realityOrientationYes");
                    }}
                    color="transparent"
                  />
                )}
                name="realityOrientationYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.realityOrientationYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("realityOrientationNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "realityOrientationNo",
                        getValues("realityOrientationNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("realityOrientationNo");
                    }}
                    color="transparent"
                  />
                )}
                name="realityOrientationNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>
          </View>
          {/* FINAL PREGUNTA 27*/}
          <Divider />


          {/* INICIAL PREGUNTA 28 */}
          <View style={styles.formEntry}>
            <Text style={styles.titulo}>Other Duties</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("otherDutiesYes") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "otherDutiesYes",
                        getValues("otherDutiesYes") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("otherDutiesYes");
                    }}
                    color="transparent"
                  />
                )}
                name="otherDutiesYes"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>Yes</Text>
            </View>
            {errors.otherDutiesYes && (
              <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                This is a required field.
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onBlur, value } }) => (
                  <IconButton
                    icon={() => (
                      <FontAwesome
                        name={
                          getValues("otherDutiesNo") === "true"
                            ? "heartbeat"
                            : "heart-o"
                        }
                        size={30}
                        color="pink"
                      />
                    )}
                    onPress={() => {
                      setValue(
                        "otherDutiesNo",
                        getValues("otherDutiesNo") === "true"
                          ? ""
                          : "true"
                      );
                      trigger("otherDutiesNo");
                    }}
                    color="transparent"
                  />
                )}
                name="otherDutiesNo"
              />
              <Text style={{ marginLeft: 8, color: "#636363" }}>No</Text>
            </View>

            <RHFTextInput
              control={control}
              errors={errors}
              inputProps={{
                label: "Comments",
                placeholder: "Comments",
                name: "otherDutiesComment",
                title: "Comments",
                style: styles.tituloXs,
                required: true
              }}
            />

          </View>
          {/* FINAL PREGUNTA 28*/}
          <Divider />

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
    </View>
  );
}
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

function RHFTextInput({ control, errors, inputProps}) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.formEntry}>
        <Controller
          control={control}
          rules={{
            required: inputProps.required,
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
    </View>
  );
}
