/** @format */

import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./screens/public/splash";
import OnBoarding from "./screens/public/onBoarding";
import Welcome from "./screens/public/welcome";
import Register from "./screens/public/register";
import "./i18next";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />*/}
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
