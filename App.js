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
import "./i18next";
import { SessionProvider } from "./providers/sessionProvider";
import PublicStack from './routers/publicStack'
import AuthStack from './routers/authStack'

const Stack = createStackNavigator();
export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="publicStack" component={PublicStack} options={{headerShown: false}} />
          <Stack.Screen name="authStack" component={AuthStack} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}
