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
import color from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase";
import validator from "validator";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import Modal from "react-native-modal";

function Register_step2({ route }) {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [success, setSuccess] = useState(false); //used to set the success state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [field, setField] = useState({
    gender: 0,
    birth: null,
    address: null,
    postcode: null,
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    gender: null,
    birth: null,
    address: null,
    postcode: null,
    unknown: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {
    //reset all the errors
    setErrors({
      gender: null,
      birth: null,
      address: null,
      postcode: null,
      unknown: null,
    });
  }

  //a function called when the user submit the form
  async function onSubmit() {
    let hasError = false;
    //first, reset all the errors
    setErrors({
      gender: null,
      birth: null,
      address: null,
      postcode: null,
      unknown: null,
    });

    setLoading(true);

    //birth date validation
    //check if the date of birth exist
    if (field.birth) {
      //check if the given birth date is correct
      if (!validator.isDate(field.birth.trim())) {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          birth: t("register.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        birth: t("register.errors.missing_value"),
      }));
    }

    //address validation
    //check if the date of birth exist
    if (!field.address) {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        address: t("register.errors.missing_value"),
      }));
    }

    //PostCode validation
    //check if the postcode exist
    if (field.postcode) {
      //check if the given postcode is correct
      if (!validator.isPostalCode(field.postcode.trim(), "GB")) {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          postcode: t("register.errors.invalid_value"),
        }));
      }
    } else {
      hasError = true;
      setErrors((prev) => ({
        ...prev,
        postcode: t("register.errors.missing_value"),
      }));
    }

    //if there is no errors
    if (!hasError) {
      //first we create an object with all our values
      const data = {
        full_name: route.params.field.full_name,
        email: route.params.field.email,
        phone: route.params.field.phone,
        gender: field.gender === 0 ? "Male" : "Female",
        birth: field.birth,
        address: field.address,
        postCode: field.postcode,
      };

      //check if the given email address already exist in the db
      const fetchEmail = await supabase
        .from("profiles")
        .select("id")
        .eq("email", data.email);
      if (fetchEmail.error) {
        console.log(fetchEmail.error.message);
      } else {
        if (fetchEmail.data.length > 0) {
          setErrors((prev) => ({
            ...prev,
            unknown: t("register.errors.existing_email"),
          }));
          setShowErrorModal(true);
        } else {
          //we save the user
          const saveUser = await supabase.auth.signUp({
            email: data.email,
            password: route.params.field.password,
          });
          if (saveUser.error) {
            console.log(saveUser.error.message);
          } else {
            //we store all the informations in the database
            const saveIntoDb = await supabase
              .from("profiles")
              .insert({ ...data, id: saveUser.data.user.id });
            if (saveIntoDb.error) {
              console.log(saveIntoDb.error.message);
            } else {
              setShowSuccessModal(true);
            }
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
          {t("register.title2")}
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
          {/* gender*/}
          <View style={{ fontSize: 15, paddingLeft: 10 }}>
            <Text>{t("register.field5.label")}</Text>
            <View style={{ flexDirection: "row", marginTop: 7 }}>
              <RadioButton
                label={t("register.field5.choice1")}
                value={t("register.field5.choice1")}
                selected={field.gender === 0}
                onPress={() => setField((prev) => ({ ...prev, gender: 0 }))}
                color={color.base}
                borderColor={color.base}
              />
              <RadioButton
                label={t("register.field5.choice2")}
                value={t("register.field5.choice2")}
                selected={field.gender === 1}
                onPress={() => setField((prev) => ({ ...prev, gender: 1 }))}
                color={color.base}
                borderColor={color.base}
              />
            </View>
          </View>

          {/*birth date input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field6.label")}
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
                borderWidth: errors.birth && 1,
                borderColor: errors.birth && "orangered",
              }}
            >
              <Ionicons name="calendar-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field6.placeholder")}
                value={field.birth}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, birth: text }))
                }
                onChange={() => onChange("birth")}
                maxLength={10}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.birth && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.birth}
              </Text>
            )}
          </View>

          {/*address input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field7.label")}
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
                borderWidth: errors.address && 1,
                borderColor: errors.address && "orangered",
              }}
            >
              <Ionicons name="location-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field7.placeholder")}
                value={field.address}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, address: text }))
                }
                onChange={() => onChange("address")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.address && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.address}
              </Text>
            )}
          </View>

          {/*postcode input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field8.label")}
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
                borderWidth: errors.postcode && 1,
                borderColor: errors.postcode && "orangered",
              }}
            >
              <Ionicons name="mail-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field8.placeholder")}
                value={field.postcode}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, postcode: text }))
                }
                onChange={() => onChange("postcode")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.postcode && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.postcode}
              </Text>
            )}
          </View>

          {/*bottom container*/}
          <View>
            {/* Boutton login */}
            <TouchableOpacity
              onPress={() => onSubmit()}
              disabled={loading}
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
                  t("register.registerButton")
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
              <Text>{t("register.loginText")}</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("login")}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: color.base, fontWeight: "bold" }}>
                  {t("register.loginButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/*show the success modal if there is no errors */}
      {showSuccessModal && <SuccessModal setShowModal={setShowSuccessModal} />}
      {/*show all the unknown errors */}
      {showErrorModal && (
        <ErrorModal setShowModal={setShowErrorModal} error={errors.unknown} />
      )}
    </View>
  );
}

function SuccessModal({ setShowModal }) {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible
      onBackdropPress={() => setShowModal(false)}
      backdropOpacity={0.4}
      deviceHeight={Dimensions.get("screen").height}
      backdropTransitionOutTiming={0}
      useNativeDriver
      statusBarTranslucent
    >
      <View
        style={{
          height: 400,
          width: "100%",
          borderRadius: 30,
          paddingHorizontal: 30,
          paddingVertical: 15,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            marginTop: 40,
            borderRadius: 120,
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: "rgb(238, 238, 238)",
          }}
        >
          <Ionicons name="checkmark-sharp" size={80} color={color.base} />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 35,
            textAlign: "center",
          }}
        >
          {t("register.success_modal.title")}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          {t("register.success_modal.text")}
        </Text>
      </View>
    </Modal>
  );
}
function ErrorModal({ setShowModal, error }) {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible
      onBackdropPress={() => setShowModal(false)}
      backdropOpacity={0.4}
      deviceHeight={Dimensions.get("screen").height}
      backdropTransitionOutTiming={0}
      useNativeDriver
      statusBarTranslucent
    >
      <View
        style={{
          height: 400,
          width: "100%",
          borderRadius: 30,
          paddingHorizontal: 30,
          paddingVertical: 15,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            marginTop: 40,
            borderRadius: 120,
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: "rgb(238, 238, 238)",
          }}
        >
          <Ionicons name="alert-outline" size={80} color="orangered" />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 35,
            textAlign: "center",
          }}
        >
          {t("register.error_modal.title")}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          {error || ""}
        </Text>
      </View>
    </Modal>
  );
}

export default Register_step2;
