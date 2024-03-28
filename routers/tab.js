/** @format */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { StyleSheet } from 'react-native';
import color from "../constants/colors";
import { useCurrentUser } from "../providers/sessionProvider";
import Home from "../screens/auth/main/home";
import ProfileStack from "./profileStack";
import ConsultationStack from "./consultationStack";
import MessagesStack from "./messageStack";

const Tabs = createBottomTabNavigator();
function Tab() {
  const {user} = useCurrentUser()
  const { t } = useTranslation();

  return (
      <Tabs.Navigator screenOptions={{tabBarStyle: styles.navigator}}>
        {
          user.type !== 'Doctor' &&
          <Tabs.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="home-outline"
                  color={focused ? color.base : "gray"}
                  size={24}
                />
              ),
              tabBarLabel: t("tabBar.screen1"),
            }}
          />
        }
        <Tabs.Screen
          name="consultation"
          component={ConsultationStack}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="document-text-outline"
                color={focused ? color.base : "gray"}
                size={24}
              />
            ),
            tabBarLabel: t("tabBar.screen2"),
          }}
        />
        <Tabs.Screen
          name="messages"
          component={MessagesStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="chatbubble-outline"
                color={focused ? color.base : "gray"}
                size={24}
              />
            ),
            tabBarLabel: t("tabBar.screen3"),
          }}
        />
        <Tabs.Screen
          name="profile"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name='person-circle-outline'
                color={focused ? color.base : "gray"}
                size={24}
              />
            ),
            tabBarLabel: t("tabBar.screen4"),
          }}
        />
      </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator:{
    height: 60,
    paddingBottom: 7
  }
})

export default Tab;
