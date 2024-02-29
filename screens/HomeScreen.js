import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import courses from "../const/courses";
import { firebase } from "../config";
import { Root, Popup, Toast } from "popup-ui";

const auth = firebase.auth();
const firestore = firebase.firestore();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // console.log(user.email);
          const userDoc = await firestore
            .collection("users")
            .doc(user.email)
            .collection("info")
            .doc("userData")
            .get();
          const userData = userDoc.data();
          if (userData) {
            const { fullName } = userData;
            setUserName(`${fullName}`);
          } else {
            //   console.log("No user");
          }
        }
      } catch (error) {
        // console.error('Error fetching user information:', error.message);
      }

      console.log("ENTRAMOS");
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Request");
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        console.log("denegado");
        return;
      } else {
        console.log("Permiso de ubicación access");
      }
    };

    fetchUserInfo();
  }, []);

  const obtenerFormatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSignUp = async (SelectScreen) => {
    const user = auth.currentUser;

    const fecha = new Date();
    const formatoFecha = obtenerFormatoFecha(fecha);

    const informationWithUbication = {
      dateStart: formatoFecha,
    };

    if (SelectScreen == "CheckIn") {
      Popup.show({
        type: "Success",
        title: "Did you arrive?",
        button: true,
        button2: true,
        textBody: "",
        buttonText: "Arrived",
        buttonText2: "Cancel",
        callback: () => {
          Popup.hide();

          firestore
            .collection("users")
            .doc(user.email)
            .collection("activities")
            .doc(formatoFecha)
            .set(informationWithUbication);
        },
        callback2: () => {
          Popup.hide();
        },
      });
    } else if (SelectScreen == "Logout") {
      
      Popup.show({
        type: "Success",
        title: "Do you want to log out?", 
        button: true,
        button2: true,
        textBody: "If you want to close the session check Log out",
        buttonText: "Log out",
        buttonText2: "Cancel",
        callback: async () => { 
          Popup.hide();
          await auth.signOut();
          navigation.navigate("Login");
        },
        callback2: () => {
          Popup.hide();
        },
      });

    } else {
      navigation.navigate(SelectScreen);
    }
  };

  const CourseCard = ({ course }) => {
    // console.log(course);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSignUp(course.screenName)}
      >
        <ImageBackground
          source={course.image}
          style={{
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 50,
            width: windowWidth / 2 - 30,
            height: windowHeight / 3,
            paddingTop: 25,
            paddingLeft: 20,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingBottom: 5,
            }}
          >
            {course.name}
          </Text>
          <Text style={{ color: "#8F95B2", fontWeight: "600" }}>
            {course.totalCourse}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <Root>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginTop: 20, marginLeft: 15 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            Hey {userName}!
          </Text>
          <Text style={{ fontSize: 22, color: "#61688B", marginTop: 15 }}>
            It's good to see you again
          </Text>

          <View
            style={{
              paddingVertical: 25,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Categories
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={courses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CourseCard course={item} />}
          />
        </View>
      </SafeAreaView>
    </Root>
  );
};

export default HomeScreen;
