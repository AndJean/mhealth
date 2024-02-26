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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import color from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../supabase";
import validator from "validator";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";

function Login({ route }) {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [showPassword, setShowPassword] = useState(false);
  const [field, setField] = useState({
    email: null,
    password: null,
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    unknown: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {
    //reset all the errors
    setErrors({
      email: null,
      password: null,
    });
  }

  //a function called when the user submit the form
  async function onSubmit() {
    let hasError = false;
    //first, reset all the errors
    setErrors({
      email: null,
      password: null,
      unknown: null,
    });

    setLoading(true);

    //email validation
    //check if the email exist
    if (field.email) {
      if (!validator.isEmail(field.email.trim())) {
        //check if the email is correct
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          email: t("login.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        email: t("login.errors.missing_value"),
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
          password: t("login.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        password: t("login.errors.missing_value"),
      }));
    }

    //if there is no errors
    if (!hasError) {
      const loginUser = await supabase.auth.signInWithPassword({
        email: field.email,
        password: field.password,
      });
      if (loginUser.error) {
        if (loginUser.error.status === 400) {
          setErrors((prev) => ({
            ...prev,
            unknown: t("login.errors.invalid_credentials"),
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            unknown: t("login.errors.unknown_error"),
          }));
        }
      } else {
        //we will check if the user has already a type "patient or doctor"
        const getUser = await supabase.from('profiles').select('type').eq('id', loginUser.data.user.id)
        if(getUser.error){
           console.log(getUser.error.message)
        }else{
           const type = getUser.data[0].type
           if(type){
             navigation.replace("main");
           }else{
             navigation.replace("register_step3");
           }
        }
        
      }
    }
    setLoading(false);
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
          {t("login.title")}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.7 }}>
          {t("login.subtitle")}
        </Text>
      </View>

      {/*form*/}
      <KeyboardAvoidingView style={{ marginTop: 30 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 20 }}
        >
          {/*email input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("login.field1.label")}
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
                borderWidth: errors.email || (errors.unknown && 1),
                borderColor: errors.email || (errors.unknown && "orangered"),
              }}
            >
              <Ionicons name="at-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("login.field1.placeholder")}
                value={field.email}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, email: text }))
                }
                onChange={() => onChange("email")}
                keyboardType="email-address"
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.email ||
              (errors.unknown && (
                <Text
                  style={{
                    fontSize: 14,
                    paddingLeft: 10,
                    color: "orangered",
                    marginTop: 10,
                  }}
                >
                  {errors.email || errors.unknown}
                </Text>
              ))}
          </View>

          {/*password input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("login.field2.label")}
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
                placeholder={t("login.field2.placeholder")}
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
            {/* Boutton login */}
            <TouchableOpacity
              disabled={loading}
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
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t("login.loginButton")
                )}
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
              <Text>{t("login.registerText")}</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("register_step1")}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: color.base, fontWeight: "bold" }}>
                  {t("login.registerButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Login;
