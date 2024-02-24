/** @format */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import { Ionicons } from "@expo/vector-icons";
import color from "../../constants/colors";
import { useTranslation } from "react-i18next";
import Profile from "./profile";
import Consultation from "./consultation";
import Messages from "./messages";
import { SessionProvider } from "../../providers/sessionProvider";

const Tabs = createBottomTabNavigator();
function Tab() {
  const { t } = useTranslation();

  return (
    <SessionProvider>
      <Tabs.Navigator>
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
        <Tabs.Screen
          name="consultation"
          component={Consultation}
          options={{
            headerShown: false,
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
          component={Messages}
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
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle-outline"
                color={focused ? color.base : "gray"}
                size={24}
              />
            ),
            tabBarLabel: t("tabBar.screen4"),
          }}
        />
      </Tabs.Navigator>
    </SessionProvider>
  );
}

export default Tab;