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
import Login from "./screens/public/login";
import OnBoarding from "./screens/public/onBoarding";
import Welcome from "./screens/public/welcome";
import Register_step1 from "./screens/public/register/step1";
import Register_step2 from "./screens/public/register/step2";
import Register_step3 from "./screens/public/register/step3";
import Register_step4 from "./screens/public/register/step4";
import Tab from "./screens/auth/tab";
import EditProfileMain from "./screens/auth/editProfile/main";
import EditLanguage from "./screens/auth/editProfile/languages";
import Search from "./screens/auth/search";
import DoctorProfile from "./screens/auth/doctorProfile";
import SearchByCategories from "./screens/auth/searchByCategories";
import { SessionProvider } from "./providers/sessionProvider";
import "./i18next";

const Stack = createStackNavigator();
export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register_step1"
            component={Register_step1}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="register_step2"
            component={Register_step2}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="register_step3"
            component={Register_step3}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="register_step4"
            component={Register_step4}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="main"
            component={Tab}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="editProfileMain"
            component={EditProfileMain}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="editLanguage"
            component={EditLanguage}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="search"
            component={Search}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="doctorProfile"
            component={DoctorProfile}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="searchByCategories"
            component={SearchByCategories}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
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
