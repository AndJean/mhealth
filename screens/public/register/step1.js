/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import color from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import validator from "validator";
import { useState } from "react";

function Register_step1() {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [field, setField] = useState({
    full_name: null,
    email: null,
    phone: null,
    password: null,
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    full_name: null, //if null there is no error, if !== null there is an error
    email: null,
    phone: null,
    password: null,
  }); //a state to store all the form errors
  const [showPassword, setShowPassword] = useState(false);

  //a function called whenever an input value is modified
  function onChange(name) {
    //reset all the errors
    setErrors({
      full_name: null,
      email: null,
      password: null,
      phone: null,
    });
  }

  //a function called when the user submit the form
  async function onSubmit() {
    let hasError = false;
    //first, reset all the errors
    setErrors({
      full_name: null,
      email: null,
      password: null,
      phone: null,
    });

    //full name validation
    //check if the full name exist
    if (field.full_name) {
      if (!validator.isAlpha(field.full_name.replace(/\s/g, ""))) {
        //check if the given full name contain only letters
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          full_name: t("register.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        full_name: t("register.errors.missing_value"),
      }));
    }

    //email validation
    //check if the email exist
    if (field.email) {
      if (!validator.isEmail(field.email.trim())) {
        //check if the email is correct
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          email: t("register.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        email: t("register.errors.missing_value"),
      }));
    }

    //phone validation
    //check if the phone number exist
    if (field.phone) {
      if (!validator.isMobilePhone(field.phone.trim(), "en-GB")) {
        //check if the given phone number is correct
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          phone: t("register.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        phone: t("register.errors.missing_value"),
      }));
    }

    //password validation
    //first check if the password exist
    if (field.password) {
      if (/\s/.test(field.password)) {
        //check if the strin contain a white space
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          password: t("register.errors.invalid_value"),
        }));
      } else if (
        !validator.isStrongPassword(field.password.trim(), { minSymbols: 0 })
      ) {
        //else check if the given password is strong
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          password: t("register.errors.invalid_password"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        password: t("register.errors.missing_value"),
      }));
    }

    //if there is no errors
    if (!hasError) {
      //navigate
      navigation.navigate("register_step2", { field });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
      }}
    >
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 25,
        }}
      >
        {/* Icon to go back to the previous screen */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={23} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Text style={{ fontSize: 27, fontWeight: "bold", marginTop: 35 }}>
          {t("register.title")}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.7 }}>
          {t("register.subtitle")}
        </Text>
      </View>

      {/*form*/}
      <KeyboardAvoidingView style={{ marginTop: 30 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 20 }}
        >
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
                borderWidth: errors.full_name && 1,
                borderColor: errors.full_name && "orangered",
              }}
            >
              <Ionicons name="people-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field1.placeholder")}
                value={field.full_name}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, full_name: text }))
                }
                onChange={() => onChange("full_name")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.full_name && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.full_name}
              </Text>
            )}
          </View>

          {/*email input*/}
          <View style={{ marginTop: 15 }}>
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
                borderWidth: errors.email && 1,
                borderColor: errors.email && "orangered",
              }}
            >
              <Ionicons name="at-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field2.placeholder")}
                value={field.email}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, email: text }))
                }
                onChange={() => onChange("email")}
                style={{ marginLeft: 20, width: "73%" }}
                keyboardType="email-address"
              />
            </View>
            {errors.email && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.email}
              </Text>
            )}
          </View>

          {/*phone input*/}
          <View style={{ marginTop: 15 }}>
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
                borderWidth: errors.phone && 1,
                borderColor: errors.phone && "orangered",
              }}
            >
              <Ionicons name="call-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field3.placeholder")}
                value={field.phone}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, phone: text }))
                }
                onChange={() => onChange("phone")}
                style={{ marginLeft: 20, width: "73%" }}
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.phone}
              </Text>
            )}
          </View>

          {/*password input*/}
          <View style={{ marginTop: 15 }}>
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
                borderWidth: errors.password && 1,
                borderColor: errors.password && "orangered",
              }}
            >
              <Ionicons name="key-outline" size={23} color={color.base} />
              <TextInput
                secureTextEntry={showPassword}
                placeholder={t("register.field4.placeholder")}
                value={field.password}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, password: text }))
                }
                onChange={() => onChange("password")}
                style={{ marginLeft: 20, width: "75%" }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  paddingHorizontal: 6,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={!showPassword ? "eye-off-outline" : "eye-outline"}
                  size={23}
                  color={color.base}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.password}
              </Text>
            )}
          </View>

          {/*bottom container*/}
          <View>
            {/* Boutton register */}
            <TouchableOpacity
              onPress={() => onSubmit()}
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
              <Text
                style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
              >
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register_step1;
