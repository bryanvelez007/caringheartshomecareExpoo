import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper"; // Agrega esta línea

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SplashScreen from "./screens/SplashScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import Step0Screen from "./screens/Step0Screen";
import HomeScreen from "./screens/HomeScreen";
import ListRecords from "./screens/ListRecords";

const Stack = createStackNavigator();

console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Step2"
          component={Step2Screen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Questions" component={QuestionsScreen} />

        <Stack.Screen
          name="ListRecords"
          component={ListRecords}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Step0"
          component={Step0Screen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Step1"
          component={Step1Screen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Step3"
          component={Step3Screen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
