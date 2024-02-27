/** @format */

import { Ionicons, Fontisto, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
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
  Pressable,
  FlatList,
  TouchableWithoutFeedback

} from "react-native";
import color from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabase";
import Animated, {FadeInDown, FadeOutDown, FadeOutUp, LinearTransition} from 'react-native-reanimated'
import validator from "validator";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import Modal from "react-native-modal";
import { useCurrentUser } from "../../../providers/sessionProvider";
import { SessionProvider } from "../../../providers/sessionProvider";

function Register_step4({route}){
  return (
    <SessionProvider>
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: 'white'}}>
        {
          route.params.type === 0 ?
          <PatientForm /> :
          <DoctorForm />
        }
      </View>      
    </SessionProvider>
  )
}

function PatientForm() {
  const { t } = useTranslation(); //used to transate the app
  const navigation = useNavigation(); //used to navigate between screens
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [success, setSuccess] = useState(false); //used to set the success state
  const {user} = useCurrentUser()
  const [medicalConditions, setMedicalConditions] = useState([])
  const [field, setField] = useState({
    bloodType: null,
    niNumber:null,
    weight:null,
    medicalCondition: null,
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
    try {
      setLoading(true)
      let hasError = false
      setErrors({
        bloodType: null,
        niNumber:null,
        weight:null,
        medicalCondition:null,
        unknown: null,      
      })

      //validate the niNumber
      if (field.niNumber) {
        //check if the given niNumber is correct
        if (/\s/.test(field.niNumber.trim()) || !validator.isAlphanumeric(field.niNumber.trim())) {
          hasError = true;
          setErrors((prev) => ({
            ...prev,
            niNumber: t("register.errors.invalid_value"),
          }));
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          niNumber: t("register.errors.missing_value"),
        }));
      }

      //validate the weight
      if (field.weight) {
        //check if the given weight is correct
        if (parseFloat(field.weight.trim()) < 0 ) {
          hasError = true;
          setErrors((prev) => ({
            ...prev,
            weight: t("register.errors.invalid_value"),
          }));
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          weight: t("register.errors.missing_value"),
        }));
      }

      //validate the blood type
      if (field.bloodType) {
        //check if the given blood type is correct
        if (field.bloodType !== 'A' && field.bloodType !== 'B' && field.bloodType !== 'AB' && field.bloodType !== 'O') {
          hasError = true;
          setErrors((prev) => ({
            ...prev,
            bloodType: t("register.errors.invalid_value"),
          }));
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          bloodType: t("register.errors.missing_value"),
        }));
      }

      if(!hasError){
        //first we create an object with all the data
        const data = {
          type: 'Patient',
          niNumber: field.niNumber,
          weight: field.weight,
          bloodType: field.bloodType,
          medicalConditions
        }

        //then we store them in supabase
        const saveData = await supabase.from('profiles').update(data).eq('id', user.id)
        if(saveData.error){
          console.log(saveData.error.message)
        }else{
          navigation.replace('main')
        }
        setLoading(false)
      }      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //a function to insert a new medical condition
  function insertMedicalCondition(){
    setErrors(prev => ({...prev, medicalCondition: null}))
    //first we check if the medical condition field have a value
    if(field.medicalCondition){
      //and then we add it in 
      const arr = [...medicalConditions] || []
      arr.push(field.medicalCondition)
      setMedicalConditions(arr) 
      setField(prev => ({...prev, medicalCondition: null}))   
    }else{
      setErrors(prev => ({...prev, medicalCondition: t('register.errors.missing_value')}))
    }
  }

  function deleteMedicalCondition(medicalCondition){
    if(medicalConditions.length > 0){
      //first duplicate the arr
      const arr = [...medicalConditions]
      //filter the arr with the medicalcondition to delete
      const filter = arr.filter(prev => prev !== medicalCondition)

      //replace the original medicalCondition array
      setMedicalConditions(filter)
    }
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
                keyboardType="numeric"
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
                maxLength={2}
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

          {/*medical condition*/}
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("register.field13.label")}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
                  borderWidth: errors.medicalCondition && 1,
                  borderColor: errors.medicalCondition && "orangered",
                }}
              >
                <FontAwesome5 name="file-medical" size={24} color="black" />
                <TextInput
                  placeholder={t("register.field13.placeholder")}
                  value={field.medicalCondition}
                  onChangeText={(text) =>
                    setField((prev) => ({ ...prev, medicalCondition: text }))
                  }
                  onChange={() => onChange("medicalCondition")}
                  style={{ marginLeft: 20, width: "80%" }}
                />
                <TouchableOpacity onPress={()=> insertMedicalCondition()} style={{width: '15%', height: 55, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 30, borderBottomRightRadius: 30, backgroundColor: color.base}}>
                    <Ionicons name='add-outline' size={24} color='white' />
                </TouchableOpacity> 
              </View>               
            </View>
            {
                errors.medicalCondition && (
                <Text
                  style={{
                    fontSize: 14,
                    paddingLeft: 10,
                    color: "orangered",
                    marginTop: 10,
                  }}
                >
                  {errors.medicalCondition}
                </Text>
              )}            
          </View>

           {/*Show the list of all the selected medicalConditions with a map function */}
          <View style= {{flexDirection: "row", marginTop: 20}}> 
            {
              medicalConditions.map((item, index) => 
              <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(200)} key={index} style={{gap: 15, marginLeft: 5, paddingVertical: 5, paddingHorizontal: 5, borderWidth:1, borderColor:"gray", flexDirection:"row", borderRadius:100}}>
                <Text style={{fontSize: 15}}>{item}</Text>
                <TouchableOpacity onPress={()=> deleteMedicalCondition(item)} >
                  <Ionicons name="close-circle" size={22} color="orangered"/>
                </TouchableOpacity>
              </Animated.View>
              )
            }
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
  const {user} = useCurrentUser()
  const [showDropdown, setShowDropdown] = useState(false) //used to show or hide the dropdown
  const [categories, setCategories] = useState([
    t('register.field15.options.option1'),
    t('register.field15.options.option2'),
    t('register.field15.options.option3'),
    t('register.field15.options.option4'),
    t('register.field15.options.option5'),
    t('register.field15.options.option6'),
    t('register.field15.options.option7'),
  ])
  const [field, setField] = useState({
    GMCID: null,
    category: null
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    GMCID: null,
    category: null,
    unknown: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {
    setErrors({
      GMCID: null,
      category: null,
      unknown: null,      
    })
  }

  async function onSubmit(){
    try{
      setLoading(true)
      let hasError = false
      setErrors({
        GMCID: null,
        category: null,
        unknown: null,      
      })

      //validate the GMCID
      if (field.GMCID) {
        //check if the given GMCID is correct
        if (/\s/.test(field.GMCID.trim()) || !validator.isAlphanumeric(field.GMCID.trim())) {
          hasError = true;
          setErrors((prev) => ({
            ...prev,
            GMCID: t("register.errors.invalid_value"),
          }));
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          GMCID: t("register.errors.missing_value"),
        }));
      }

      //validate the category
      if(!field.category){
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          category: t("register.errors.missing_value"),
        }));    
      }

      if(!hasError){
        //first we create an object with all the data
        const data = {
          type: 'Doctor',
          doctor_GMCID: field.GMCID,
          doctor_category: field.category
        }

        //then we store them in supabase
        const saveData = await supabase.from('profiles').update(data).eq('id', user.id)
        if(saveData.error){
          console.log(saveData.error.message)
        }else{
          navigation.replace('main')
        }
        setLoading(false)
      }   
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  //a function to set the selected category by the user
  function onSelectCategory(category){
    setField(prev => ({...prev, category: category}))
    setShowDropdown(false)
  }

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={()=> setShowDropdown(false)}>
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
            {/*GMC ID input*/}
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                {t("register.field14.label")}
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
                  borderWidth: errors.GMCID && 1,
                  borderColor: errors.GMCID && "orangered",
                }}
              >
                <Ionicons name="text-outline" size={24} color="black" />
                <TextInput
                  placeholder={t("register.field14.placeholder")}
                  value={field.GMCID}
                  onChangeText={(text) =>
                    setField((prev) => ({ ...prev, GMCID: text }))
                  }
                  onChange={() => onChange("GMCID")}
                  style={{ marginLeft: 20, width: "73%" }}
                />
              </View>
              {errors.GMCID && (
                <Text
                  style={{
                    fontSize: 14,
                    paddingLeft: 10,
                    color: "orangered",
                    marginTop: 10,
                  }}
                >
                  {errors.GMCID}
                </Text>
              )}
            </View>
            
            {/*Category input*/}
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                {t("register.field15.label")}
              </Text>
              <Pressable
                onPress={()=> setShowDropdown(!showDropdown)}
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
                  borderWidth: errors.category && 1,
                  borderColor: errors.category && "orangered",
                }}
              >
                <MaterialCommunityIcons name="doctor" size={24} color="black" />
                <View style={{ marginLeft: 20, width: "73%" }}>
                  <Text style={{opacity: !field.category ? 0.5 : 1}}>
                    {field.category || t("register.field15.placeholder")}
                  </Text>
                </View>
              </Pressable>

              {/* dropdown */}
              {
                showDropdown && 
                <Animated.View entering={FadeInDown.duration(300)} style={{width: '100%', paddingVertical: 10, paddingHorizontal: 15, marginTop: 10, borderRadius: 15, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray'}}>
                  {
                    categories.map(item => 
                    <Pressable onPress={()=> onSelectCategory(item)} style={{paddingVertical: 3}}>
                      <Text>{item}</Text>
                    </Pressable>  
                  )}
                </Animated.View>
              }

              {
                errors.category && (
                <Text
                  style={{
                    fontSize: 14,
                    paddingLeft: 10,
                    color: "orangered",
                    marginTop: 10,
                  }}
                >
                  {errors.category}
                </Text>
              )}
            </View>


            {/*bottom container*/}
            <Animated.View layout={LinearTransition.duration(300)}>
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
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>      
    </TouchableWithoutFeedback>

  );
}

export default Register_step4;
