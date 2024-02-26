/** @format */

import { Ionicons, Fontisto, FontAwesome5 } from "@expo/vector-icons";
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
  StatusBar,
  FlatList

} from "react-native";
import color from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase";
import validator from "validator";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import Modal from "react-native-modal";


function Register_step4({route}){
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: 'white'}}>
      {
        route.params.type === 0 ?
        <PatientForm /> :
        <DoctorForm />
      }
    </View>
  )
}

function PatientForm() {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [success, setSuccess] = useState(false); //used to set the success state
  const [field, setField] = useState({
    bloodType: null,
    niNumber:null,
    weight:null,
    medicalCondition: [],
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    bloodType: null,
    niNumber:null,
    weight:null,
    insuranceCompany:null,
    medicalCondition:null,
    unknown: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {
    setErrors({
      bloodType: null,
      niNumber:null,
      weight:null,
      medicalCondition: null,
      unknown: null,      
    })
  }

  async function onSubmit(){
    setErrors({
      bloodType: null,
      niNumber:null,
      weight:null,
      medicalCondition:null,
      unknown: null,      
    })


  }

  return (
    <View style={{flex: 1}}>
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
          {t("register.title3")}
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
          {/*niNumber input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field11.label")}
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
                borderWidth: errors.niNumber && 1,
                borderColor: errors.niNumber && "orangered",
              }}
            >
              <Ionicons name="text-outline" size={24} color="black" />
              <TextInput
                placeholder={t("register.field11.placeholder")}
                value={field.niNumber}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, niNumber: text }))
                }
                onChange={() => onChange("niNumber")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.niNumber && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.niNumber}
              </Text>
            )}
          </View>
          
          {/*weight input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field12.label")}
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
                borderWidth: errors.weight && 1,
                borderColor: errors.weight && "orangered",
              }}
            >
              <FontAwesome5 name="weight" size={20} color="black" />
              <TextInput
                placeholder={t("register.field12.placeholder")}
                value={field.weight}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, weight: text }))
                }
                onChange={() => onChange("weight")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.weight && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.weight}
              </Text>
            )}
          </View>

          {/*bloodType input*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field10.label")}
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
                borderWidth: errors.bloodType && 1,
                borderColor: errors.bloodType && "orangered",
              }}
            >
              <Fontisto name="blood-drop" size={24} color="black" />
              <TextInput
                placeholder={t("register.field10.placeholder")}
                value={field.bloodType}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, bloodType: text }))
                }
                onChange={() => onChange("bloodType")}
                maxLength={3}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.bloodType && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.bloodType}
              </Text>
            )}
          </View>
          
          {/*a component to show a list of all the selected medicalConditions */}
          <FlatList
            data={field.medicalCondition}
            style={{marginTop: 23}}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> 
              <View style={{width: '100%', height: 55, backgroundColor: color.input, borderRadius: 23}}>

              </View>
            }  
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            ListHeaderComponent={
              <View style={{width: 210, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: color.base, flexDirection: 'row', gap: 8}}>
                  <Ionicons name='add-outline' size={24} color='white' />
                  <Text style={{color: 'white', fontSize: 15}}>{t('register.addMedicalConditionButton')}</Text>
              </View>
            }
          />

          <View >

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
                  t("register.finishButton")
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function DoctorForm() {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [success, setSuccess] = useState(false); //used to set the success state
  const [field, setField] = useState({

  }); //a state to store all the values
  const [errors, setErrors] = useState({

    unknown: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {

  }

  async function onSubmit(){

  }

  return (
    <View style={{flex: 1}}>
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
          {t("register.title4")}
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
                  t("register.finishButton")
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register_step4;
