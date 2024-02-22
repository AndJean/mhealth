/** @format */

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../constants/colors";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInRight } from "react-native-reanimated";

function OnBoarding() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigation = useNavigation();

  function switchScreen() {
    //show the screen according to the current state
    if (currentScreen === 0) {
      setCurrentScreen(1);
    } else if (currentScreen === 1) {
      setCurrentScreen(2);
    } else {
      navigation.replace("welcome");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 25,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.replace("welcome")}
        style={{ alignSelf: "flex-end" }}
      >
        <Text>Skip</Text>
      </TouchableOpacity>
      {currentScreen === 0 && <Screen1 />}
      {currentScreen === 1 && <Screen2 />}
      {currentScreen === 2 && <Screen3 />}

      <LinearGradient
        colors={[color.base2, "white"]}
        locations={[0, 0.8]}
        style={{
          position: "absolute",
          width: "100%",
          alignSelf: "center",
          height: 200,
          borderRadius: 25,
          bottom: 20,
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {currentScreen === 0 && t("onBoarding.screen1.title")}
          {currentScreen === 1 && t("onBoarding.screen2.title")}
          {currentScreen === 2 && t("onBoarding.screen3.title")}
        </Text>
        <TouchableOpacity
          onPress={() => switchScreen()}
          style={{
            alignSelf: "flex-end",
            marginTop: 20,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: 100,
            backgroundColor: color.base,
          }}
        >
          <Ionicons name="arrow-forward-outline" size={20} color="black" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

function Screen1() {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 90,
        paddingLeft: 35,
        paddingRight: 35,
      }}
    >
      <Image
        source={require("../../assets/Images/onboarding1.png")}
        style={{ height: "70%", width: 300 }}
      />
    </Animated.View>
  );
}

function Screen2() {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 90,
        paddingLeft: 35,
        paddingRight: 35,
      }}
    >
      <Image
        source={require("../../assets/Images/onboarding2.png")}
        style={{ height: "70%", width: 300 }}
      />
    </Animated.View>
  );
}

function Screen3() {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 90,
        paddingLeft: 35,
        paddingRight: 35,
      }}
    >
      <Image
        source={require("../../assets/Images/onboarding3.png")}
        style={{ height: "70%", width: 300 }}
      />
    </Animated.View>
  );
}

export default OnBoarding;
