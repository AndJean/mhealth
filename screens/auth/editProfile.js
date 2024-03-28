import { View, TouchableOpacity, Text, TextInput, ActivityIndicator, ToastAndroid, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import Animated, {LinearTransition} from 'react-native-reanimated'
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useCurrentUser } from "../../providers/sessionProvider";
import { supabase } from "../../supabase";
import validator from "validator";
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet'
import { SessionProvider } from "../../providers/sessionProvider";
import Modal from "react-native-modal";

function EditProfile(){
  const {user} = useCurrentUser()

  return (
    user && user.type === 'Doctor' ?
    <EditDoctorInformations />:
    <EditPatientInformations />
  )
}

function EditPatientInformations(){
  const navigation = useNavigation()
  const { t } = useTranslation(); //used to transate the app
  const [loading, setLoading] = useState(false); //used to set the loading state
  const {user} = useCurrentUser()
  const [field, setField] = useState({
    address: null,
    phone: null,
    postCode: null,
    weight: null,
    password: null,
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    address: null, //if null there is no error, if !== null there is an error
    phone: null,
    postCode: null,
    weight: null,
    password: null,
  }); //a state to store all the form errors
  const [showPassword, setShowPassword] = useState(false);

  //a function called whenever an input value is modified
  function onChange(name) {
    //reset all the errors
    setErrors({
      address: null,
      postCode: null,
      password: null,
      weight: null,
      phone: null,
    });
  }
  //a function called when the user submit the form
  async function onSubmit() {
      let hasError = false;
      //first, reset all the errors
      setErrors({
        address: null,
        password: null,
        weight: null,
        postCode: null,
        phone: null,
      });
      setLoading(true)

      //address validation
      //check if the address exist
      if (field.address) {
        if(field.address !== user.address){
          //check if the given address contain only letters
          if (!validator.isAlphanumeric(field.address.replace(/\s/g, ""))) {
            hasError = true;
            setErrors((prev) => ({
              ...prev,
              address: t("register.errors.invalid_value"),
            }));
          }            
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          address: t("register.errors.missing_value"),
        }));
      }
      //phone validation
      //check if the phone number exist
      if (field.phone) {
        if(field.phone !== user.phone){
          if (!validator.isMobilePhone(field.phone.trim(), "en-GB")) {
            //check if the given phone number is correct
            hasError = true;
            setErrors((prev) => ({
              ...prev,
              phone: t("register.errors.invalid_value"),
            }));
          }            
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          phone: t("register.errors.missing_value"),
        }));
      }

      //validate the weight
      if (field.weight) {
        //check if the given weight is correct
        if(field.weight !== user.weight ){
          if (parseFloat(field.weight.trim()) < 0 ) {
            hasError = true;
            setErrors((prev) => ({
              ...prev,
              weight: t("register.errors.invalid_value"),
            }));
          }            
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          weight: t("register.errors.missing_value"),
        }));
      }


      //PostCode validation
      //check if the postcode exist
      if (field.postCode) {
        if(field.postCode !== user.postCode){
          //check if the given postcode is correct
          if (!validator.isPostalCode(field.postCode.trim(), "GB")) {
            hasError = true;
            setErrors((prev) => ({
              ...prev,
              postCode: t("register.errors.invalid_value"),
            }));
          }            
        }
      } else {
        hasError = true;
        setErrors((prev) => ({
          ...prev,
          postCode: t("register.errors.missing_value"),
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
      }

      //if there is no errors
      if (!hasError) {
          let data = {
            address: field.address,
            postCode: field.postCode,
            phone: field.phone
          }

          //if the user change the password
          if(field.password){
            const updatePassword = await supabase.auth.updateUser({
              password: field.password
            })
            if(updatePassword.error){
              console.log(updatePassword.error.message)
            }
          }

          const updateInfos = await supabase.from('profiles').update(data).eq('id', user.id)
          if(updateInfos.error){
            console.log(updateInfos.error.message)
          }else{
            ToastAndroid.show(t('others.profileUpdated'), ToastAndroid.SHORT)
          }


          
      }
      setLoading(false)
  }

  //pre-fill fields with default values
  useEffect(()=>{
      if(user){
        if(field.address === null || field.phone === null || field.postCode === null || field.weight === null){
          setField({
            address: user.address,
            phone: user.phone,
            postCode: user.postCode,
            weight: user.weight.toString()
          })            
        }
      }
  }, [user])


  return(
      <View style={{flex:1, backgroundColor:'white', paddingHorizontal: 25,}}>
          {/* header */}
          <View style={{flexDirection: "row",paddingTop: 50,justifyContent: "space-between"}}>
              {/* Icon to go back to the previous screen */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-outline" size={23} color="black" />
              </TouchableOpacity>
              <View>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>
                      {t('profile.editButton')}
                  </Text>
              </View>
              <View style={{width: 23}}></View>
          </View>
          {/*address input*/}
          <View style={{marginTop: 50}}>
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
          {/*postCode input*/}
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
                marginTop:  8,
                elevation: 9,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                borderWidth: errors.postCode && 1,
                borderColor: errors.postCode && "orangered",
              }}
            >
              <Ionicons name="mail-outline" size={23} color={color.base} />
              <TextInput
                placeholder={t("register.field8.placeholder")}
                value={field.postCode}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, postCode: text }))
                }
                onChange={() => onChange("postCode")}
                style={{ marginLeft: 20, width: "73%" }}
              />
            </View>
            {errors.postCode && (
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "orangered",
                  marginTop: 10,
                }}
              >
                {errors.postCode}
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
                marginTop:  8,
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
              <FontAwesome5 name="weight" size={20} color={color.base} />
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
          <Animated.View layout={LinearTransition.duration(300)}>
            {/* Boutton submit */}
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
                  t("register.editButton")
                )}
              </Text>
            </TouchableOpacity>
          </Animated.View>
      </View>
  )
}

function EditDoctorInformations(){
  const navigation = useNavigation()
  const { t } = useTranslation(); //used to transate the app
  const [loading, setLoading] = useState(false); //used to set the loading state
  const [selectedDay, setSelectedDay] = useState(null)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const {user} = useCurrentUser()
  const [doctorWorkingDays, setDoctorWorkingDays] = useState([
      {
        name: t('editDoctorProfile.working_days.option1'),
        schedule: ['09', '17'],
        selected: false
      },
      {
        name: t('editDoctorProfile.working_days.option2'),
        schedule: ['09', '17'],
        selected: false
      },
      {
        name: t('editDoctorProfile.working_days.option3'),
        schedule: ['09', '17'],
        selected: false
      },
      {
        name: t('editDoctorProfile.working_days.option4'),
        schedule: ['09', '17'],
        selected: false
      },
      {
        name: t('editDoctorProfile.working_days.option5'),
        schedule: ['09', '17'],
        selected: false
      },
      {
        name: t('editDoctorProfile.working_days.option6'),
        schedule: ['09', '17'],
        selected: false
      }
    ])
  const [field, setField] = useState({
    doctor_fees: null,
    description: null
  }); //a state to store all the values
  const [errors, setErrors] = useState({
    doctor_working_days: null,
    description: null,
    doctor_fees: null,
  }); //a state to store all the form errors

  //a function called whenever an input value is modified
  function onChange(name) {
    //reset all the errors
    setErrors({
      doctor_working_days: null,
      doctor_fees: null,
    });
  }
  //a function called when the user submit the form
  async function onSubmit() {
    try {
      let hasError = false;
      let selectedDay = false
      setErrors({
        doctor_working_days: null,
        doctor_fees: null,
      })
      setLoading(true)

      //check the doctor fees field
      if(field.doctor_fees){
        if(parseFloat(field.doctor_fees) <= 0){
          hasError = true
          setErrors(prev => ({...prev, doctor_fees: t('register.errors.invalid_value')}))
        }
      }else{
        hasError = true
        setErrors(prev => ({...prev, doctor_fees: t('register.errors.missing_value')}))
      }

      //a loop for check each working day
      doctorWorkingDays.forEach(day => {
        if(day.selected){
          selectedDay = true
        }
      })

      if(!selectedDay){
        hasError = true
        setErrors(prev => ({...prev, doctor_working_days: t('register.errors.missing_working_day')}))        
      }

      if(!hasError){
        const data = {
          doctor_fees: field.doctor_fees,
          doctor_working_days: doctorWorkingDays,
          doctor_description: field.description
        }
        const updateInfos = await supabase.from('profiles').update(data).eq('id', user.id)
        if(updateInfos.error){
          console.log(updateInfos.error)
        }else{
          ToastAndroid.show(t('others.profileUpdated'), ToastAndroid.SHORT)
        }
      }
      setLoading(false)    
    } catch (error) {
      console.log(error)
      setLoading(false) 
    }
  }

  //pre-fill fields with default values
  useEffect(()=>{
      if(user){
        setField({
          doctor_fees: user.doctor_fees ? user.doctor_fees.toString() : null  ,
          description: user.doctor_description ? user.doctor_description.toString() : null,
        })

        if(user.doctor_working_days){
          setDoctorWorkingDays(user.doctor_working_days)
        }
      }
  }, [])

  //a function called when the doctor pick a day
  function openTimePicker(index){
    setSelectedDay(index)
    setShowTimePicker(true)
  }

  function closeTimePicker(){
    setShowTimePicker(false)
    setSelectedDay(null)
  }

  return(
      <View style={{flex:1, backgroundColor:'white'}}>
          {/* header */}
          <View style={{flexDirection: "row",paddingTop: 50,justifyContent: "space-between",  paddingHorizontal: 25}}>
              {/* Icon to go back to the previous screen */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-outline" size={23} color="black" />
              </TouchableOpacity>
              <View>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>
                      {t('profile.editButton')}
                  </Text>
              </View>
              <View style={{width: 23}}></View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never" style={{}}>
                {/*fees input*/}
                <View style={{ marginTop: 50,  paddingHorizontal: 25 }}>
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {t("editDoctorProfile.field1.label")}
                  </Text>
                  <View
                    style={{
                      backgroundColor: color.input,
                      width: "100%",
                      height: 55,
                      borderRadius: 100,
                      marginTop:  8,
                      elevation: 9,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 16,
                      borderWidth: errors.doctor_fees && 1,
                      borderColor: errors.doctor_fees && "orangered",
                    }}
                  >
                    <Ionicons name="cash" size={23} color={color.base} />
                    <TextInput
                      placeholder={t("editDoctorProfile.field1.placeholder")}
                      value={field.doctor_fees}
                      onChangeText={(text) =>
                        setField((prev) => ({ ...prev, doctor_fees: text }))
                      }
                      keyboardType="numeric"
                      onChange={() => onChange("doctor_fees")}
                      style={{ marginLeft: 20, width: "73%" }}
                    />
                  </View>
                  {
                    errors.doctor_fees && 
                    <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
                      {errors.doctor_fees}
                    </Text>
                  }
                </View>

                {/*working days list*/}
                <View style={{ marginTop: 20,  paddingHorizontal: 25 }}>
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {t("editDoctorProfile.field2.label")}
                  </Text>
                  <View style={{marginTop: 15}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false} overScrollMode="never" contentContainerStyle={{gap: 10}}>
                      {
                        doctorWorkingDays.map((day, index)=>
                          <TouchableOpacity 
                            key={index} 
                            onPress={()=> openTimePicker(index)} 
                            style={{paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, borderWidth: 1, borderColor: 'rgb(214, 214, 214)', backgroundColor: day.selected ? color.base : 'transparent'}}
                          >
                            <Text style={{fontSize: 15}}>{day.name}</Text>
                          </TouchableOpacity>
                        )
                      }                 
                    </ScrollView>    
                    {
                      errors.doctor_working_days && 
                      <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
                        {errors.doctor_working_days}
                      </Text>
                    }   
                  </View>
                </View>

                {/*description input*/}
                <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {t("editDoctorProfile.field3.label")}
                  </Text>
                  <View
                    style={{
                      backgroundColor: color.input,
                      width: "100%",
                      height: 140,
                      borderRadius: 15,
                      marginTop:  8,
                      elevation: 9,
                      flexDirection: "row",
                      paddingHorizontal: 16,
                      borderWidth: errors.description && 1,
                      borderColor: errors.description && "orangered",
                    }}
                  >
                    <Ionicons name="text-outline" size={23} color={color.base} style={{marginTop: 15}} />
                    <TextInput
                      placeholder={t("editDoctorProfile.field3.placeholder")}
                      value={field.description}
                      onChangeText={(text) =>
                        setField((prev) => ({ ...prev, description: text }))
                      }
                      maxLength={240}
                      multiline
                      textAlignVertical="top"
                      onChange={() => onChange("description")}
                      style={{ marginLeft: 20, width: "73%", height: '100%', paddingVertical: 16 }}
                    />
                  </View>
                  {
                    errors.description && 
                    <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
                      {errors.description}
                    </Text>
                  }
                </View>
              
                {/*bottom container*/}
                <Animated.View layout={LinearTransition.duration(300)} style={{marginBottom: 50, paddingHorizontal: 25}}>
                  {/* Boutton submit */}
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
                        t("register.editButton")
                      )}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>              
            </ScrollView>
          </KeyboardAvoidingView>
          {showTimePicker && <TimePicker closeTimePicker={closeTimePicker} selectedDay={selectedDay} setSelectedDay={setSelectedDay} doctorWorkingDays={doctorWorkingDays} setDoctorWorkingDays={setDoctorWorkingDays} />}       
      </View>
  )
}

function TimePicker({closeTimePicker, selectedDay, setSelectedDay, doctorWorkingDays, setDoctorWorkingDays}){
  const ref = useRef(null)
  const {t} = useTranslation()
  const [loading, setLoading] = useState(false)
  const [field, setField] = useState({
    start: '09',
    end: '17'
  })
  const [errors, setErrors] = useState({
    start: null,
    end: null
  })

  useEffect(()=>{
    if(doctorWorkingDays[selectedDay]){
      setField({
        start: doctorWorkingDays[selectedDay].schedule[0],
        end: doctorWorkingDays[selectedDay].schedule[1]
      })      
    }
  }, [])

  async function onSubmit(){
    let hasError = false

    if(field.start){
      if(field.start < 8 || field.start > 16){
        hasError = true
        setErrors(prev => ({...prev, start: t('register.errors.invalid_value')}))
      }
    }else{
      hasError = true
      setErrors(prev => ({...prev, start: t('register.errors.missing_value')}))
    }

    if(field.end){
      if(field.end < 9 || field.end > 17){
        hasError = true
        setErrors(prev => ({...prev, end: t('register.errors.invalid_value')}))
      }
    }else{
      hasError = true
      setErrors(prev => ({...prev, end: t('register.errors.missing_value')}))
    }

    if(field.start && field.end && field.start === field.end || parseFloat(field.start) > parseFloat(field.end)){
      hasError = true
      setErrors(prev => ({...prev, start: t('register.errors.invalid_value')}))
      setErrors(prev => ({...prev, end: t('register.errors.invalid_value')}))
    }

    
    if(!hasError){
      if(doctorWorkingDays[selectedDay]){
        const arr = [...doctorWorkingDays]
        arr[selectedDay].selected = true
        arr[selectedDay].schedule = [field.start, field.end]
        setDoctorWorkingDays(arr)
        closeTimePicker()   
      }
    }
  }

  function onChange(name) {
    //reset all the errors
    setErrors({
      start: null,
      end: null,
    });
  }

  function onClose(){
    setSelectedDay(null)
  }

  return (
    <Modal
      isVisible
      onBackdropPress={() => closeTimePicker()}
      backdropOpacity={0.4}
      deviceHeight={Dimensions.get("screen").height}
      backdropTransitionOutTiming={0}
      useNativeDriver
      statusBarTranslucent
    >
        <View style={{width: '100%', backgroundColor: 'white', borderRadius: 25, paddingHorizontal: 25, paddingVertical: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{t('editDoctorProfile.timerPicker.title')} {doctorWorkingDays[selectedDay].name}</Text>
          <Text style={{fontSize: 15}}>{t('editDoctorProfile.timerPicker.subtitle')}</Text>

          <View style={{ marginTop: 20, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("editDoctorProfile.timerPicker.field1.label")}
            </Text>
            <View
              style={{
                backgroundColor: color.input,
                width: "30%",
                height: 40,
                borderRadius: 100,
                marginTop:  8,
                elevation: 9,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                borderWidth: errors.start && 1,
                borderColor: errors.start && "orangered",
              }}
            >
              <TextInput
                value={field.start}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, start: text }))
                }
                keyboardType="numeric"
                onChange={() => onChange("start")}
                style={{ marginLeft: 20, width: "100%" }}
              />
            </View>
          </View>
          {
            errors.start && 
            <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
              {errors.start}
            </Text>
          }
          <View style={{ marginTop: 15, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>
              {t("editDoctorProfile.timerPicker.field2.label")}
            </Text>
            <View
              style={{
                backgroundColor: color.input,
                width: "30%",
                height: 40,
                borderRadius: 100,
                marginTop:  8,
                elevation: 9,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                borderWidth: errors.end && 1,
                borderColor: errors.end && "orangered",
              }}
            >
              <TextInput
                value={field.end}
                onChangeText={(text) =>
                  setField((prev) => ({ ...prev, end: text }))
                }
                keyboardType="numeric"
                onChange={() => onChange("end")}
                style={{ marginLeft: 20, width: "100%" }}
              />
            </View>
          </View>
          {
            errors.end && 
            <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
              {errors.end}
            </Text>
          }
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
                  t("register.editButton")
                )}
              </Text>
            </TouchableOpacity>
        </View>      
    </Modal>
  )
}

export default EditProfile