/** @format */

import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function Welcome() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 150,
        paddingHorizontal: 30,
      }}
    >
      {/*Make the status bar transparent */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Image */}
      <Image
        source={require("../../assets/Images/welcome1.jpg")}
        style={{ height: 250, width: 300 }}
      />

      {/* Textes */}
      <View style={{ marginTop: 40, width: "100%" }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
          {t("welcome.title")}
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            opacity: 0.7,
          }}
        >
          {t("welcome.subtitle")}
        </Text>
      </View>

      {/* Boutton LogIn */}
      <TouchableOpacity
        style={{
          backgroundColor: color.base,
          width: "100%",
          height: 55,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          {t("welcome.loginButton")}
        </Text>
      </TouchableOpacity>

      {/* Boutton SignUp */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 55,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          borderWidth: 2,
          borderColor: color.base,
        }}
      >
        <Text
          style={{
            color: color.base,
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          {t("welcome.RegisterButton")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Welcome;
