/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import color from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 25,
      }}
    >
      {/* header */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {/* Icon to go back to the previous screen */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={23} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 27, fontWeight: "bold", marginTop: 35 }}>
        {t("register.title")}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.7 }}>
        {t("register.subtitle")}
      </Text>

      {/*form*/}
      <View style={{ marginTop: 30, gap: 25 }}>
        {/*full name input*/}
        <View>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>
            {t("register.field1.label")}
          </Text>
          <View
            style={{
              backgroundColor: color.input,
              width: "100%",
              height: 55,
              borderRadius: 100,
              marginTop: 8,
              elevation: 9,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Ionicons name="people-outline" size={23} color={color.base} />
            <TextInput
              placeholder={t("register.field1.placeholder")}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>

        {/*email input*/}
        <View>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>
            {t("register.field2.label")}
          </Text>
          <View
            style={{
              backgroundColor: color.input,
              width: "100%",
              height: 55,
              borderRadius: 100,
              marginTop: 8,
              elevation: 9,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Ionicons name="mail-outline" size={23} color={color.base} />
            <TextInput
              placeholder={t("register.field2.placeholder")}
              keyboardType="email-address"
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>

        {/*phone input*/}
        <View>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>
            {t("register.field3.label")}
          </Text>
          <View
            style={{
              backgroundColor: color.input,
              width: "100%",
              height: 55,
              borderRadius: 100,
              marginTop: 8,
              elevation: 9,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Ionicons name="call-outline" size={23} color={color.base} />
            <TextInput
              placeholder={t("register.field3.placeholder")}
              keyboardType="phone-pad"
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>

        {/*password input*/}
        <View>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>
            {t("register.field4.label")}
          </Text>
          <View
            style={{
              backgroundColor: color.input,
              width: "100%",
              height: 55,
              borderRadius: 100,
              marginTop: 8,
              elevation: 9,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Ionicons name="key-outline" size={23} color={color.base} />
            <TextInput
              placeholder={t("register.field4.placeholder")}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>
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
          marginTop: 35,
          elevation: 9,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          {t("register.nextButton")}
        </Text>
      </TouchableOpacity>

      {/*lien de connexion*/}
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{t("register.loginText")}</Text>
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <Text style={{ color: color.base, fontWeight: "bold" }}>
            {t("register.loginButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;
