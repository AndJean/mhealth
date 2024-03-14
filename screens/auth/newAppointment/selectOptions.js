import {useEffect, useState} from 'react'
import { View, Text, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator, Dimensions } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import Modal from 'react-native-modal'
import {
    IAppointment,
    IAvailableDates,
    TimeSlotPicker,
  } from '@dgreasi/react-native-time-slot-picker'
import color from "../../../constants/colors"
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../../../supabase'
import { useCurrentUser } from '../../../providers/sessionProvider'

function NewAppointmentSelectOptions({route}){
    const {t} = useTranslation()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [availableDates, setAvailableDates] = useState([])
    const [success, setSuccess] = useState(false)
    const [dateOfAppointment, setDateOfAppointment] = useState(null)
    const [unaivalableDate, setUnaivalableDate] = useState([])
    const [serverError, setServerError] = useState(null)
    const {user} = useCurrentUser()
    const [field, setField] = useState({
        reason: null
    })
    const [errors, setErrors] = useState({
        reason: null,
    })

    function onChange(name) {
        setErrors({
            reason: null
        })
    }

    async function onSubmit(){
        try{
            let hasErrors = false
            setErrors({
                reason: null
            })
            setLoading(true)

            if(field.reason){
                if(field.reason.length < 10){
                    hasErrors = true
                    setErrors(prev => ({...prev, reason: t("register.errors.short_value")}))                    
                }
            }else{
                hasErrors = true
                setErrors(prev => ({...prev, reason: t("login.errors.missing_value")}))
            }

            /*
                //payment validation
            */

            if(!hasErrors){
                const data = {
                    patient_id: user.id,
                    doctor_id: route.params.doctorInfos.id,
                    reason: field.reason.trim(),
                    date: dateOfAppointment,
                    price: route.params.doctorInfos.doctor_fees,
                    medical_conditions: user.medical_conditions
                }
                const saveInformations = await supabase.from('consultations').insert(data)
                if(saveInformations.error){
                    throw Error(saveInformations.error.message)
                }else{
                    setSuccess(true)
                }
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setServerError(t('login.errors.unknown_error'))
            setLoading(false)
        }
    }

    
    function onFinish(){
        setSuccess(false)
        setServerError(null)
        navigation.replace('main', {screen: 'consultation'})
    }

    //a useEffect called when the screen is mounted to set the available dates of appointment
    useEffect(()=>{
        if(route.params && route.params.doctorInfos){
            const working_days = route.params.doctorInfos.doctor_working_days
            const arr1 = [...working_days] //duplicate the original working_days array
            const arr2 = []
            const formated_working_days = [] //a new arr to store the formated working_days

            /*
                convert this
                [
                    {
                        "name": "Monday",
                        "schedule": [
                            "09",
                            "17"
                        ],
                        "selected": true
                    },
                    {
                        "name": "Tuesday",
                        "schedule": [
                            "09",
                            "17"
                        ],
                        "selected": true
                    },
                ]

                to get this
                [
                    {
                        date: '2023-08-17T21:00:00.000Z', // new Date().toISOString()
                        slotTimes: ['08', '09'],
                    },
                    {
                        date: '2023-08-18T21:00:00.000Z',
                        slotTimes: [], // No availability
                    },
                    {
                        date: '2023-08-19T21:00:00.000Z',
                        slotTimes: ['08:00-09:00', '09:00-10:00'],
                    },
                ]
            */

            arr1.forEach(day => {
                const formatedDate = moment().day(day.name).toISOString()
                const formatedHours = []

                if(day.selected){
                    for(let i = 0; i <= parseFloat(day.schedule[1]) - parseFloat(day.schedule[0]); i++){
                        const hour = day.schedule[0]
                        let convertedHour = parseFloat(hour)
                        convertedHour = convertedHour + i
                        formatedHours.push(`${convertedHour}h`)
                    }                        
                }

                formated_working_days.push({
                    date: formatedDate,
                    slotTimes: formatedHours
                })
            })
            setAvailableDates(formated_working_days)
        }
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 50,}}>
            {/* header */}
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 25,
                    marginBottom: 25
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior='padding'>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode='never'>
                    <View style={{ paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: 27, fontWeight: "bold"}}>
                            {t("newAppointment.title")}
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.7 }}>
                            {t("newAppointment.subtitle")}
                        </Text>
                    </View>

                    {/*Date*/}
                    <View style={{marginTop: 25}}>
                        <Text style={{ fontSize: 14, paddingLeft: 25, fontWeight: '600', opacity: 0.6 }}>
                            {t("newAppointment.field1")}
                        </Text>
                        <View style={{paddingHorizontal: 10}}>
                            {
                                availableDates.length > 0 &&
                                <TimeSlotPicker
                                    availableDates={availableDates}
                                    setDateOfAppointment={setDateOfAppointment}
                                    mainColor={color.base}
                                    timeSlotWidth={65}
                                />                        
                            }
                        </View>
                    </View>

                    {/*Reason input*/}
                    <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                            {t("newAppointment.field3.label")}
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
                                borderWidth: errors.reason && 1,
                                borderColor: errors.reason && "orangered",
                                }}
                            >
                            <Ionicons name="text-outline" size={23} color={color.base} style={{marginTop: 15}} />
                            <TextInput
                                placeholder={t("newAppointment.field3.placeholder")}
                                value={field.reason}
                                onChangeText={(text) =>
                                    setField((prev) => ({ ...prev, reason: text }))
                                }
                                maxLength={240}
                                multiline
                                textAlignVertical="top"
                                onChange={() => onChange("reason")}
                                style={{ marginLeft: 20, width: "73%", height: '100%', paddingVertical: 16 }}
                                />
                            </View>
                        {
                            errors.reason && 
                            <Text style={{fontSize: 14, paddingLeft: 10, color: "orangered", marginTop: 10}}>
                                {errors.reason}
                            </Text>
                        }
                    </View>  
                    <View style={{height: 200}} />                 
                </ScrollView>
            </KeyboardAvoidingView>
            {/*bottom container*/}
            <View style={{position: 'absolute', height: 80, paddingHorizontal: 15, bottom: 0, width: '100%', alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", opacity: 0.6, textAlign: 'left' }}>Total</Text> 
                    <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: 'left' }}>
                        {route.params.doctorInfos.doctor_fees} £
                    </Text>                    
                </View>

                <TouchableOpacity
                    onPress={()=> onSubmit()}
                    disabled={loading}
                    style={{
                        backgroundColor: color.base,
                        width: "65%",
                        height: 55,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 9,
                    }}
                >
                    {
                        loading ?
                        <ActivityIndicator size='small' color='white' /> :
                        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
                            {t("newAppointment.submitButton")}
                        </Text>                        
                    }
                </TouchableOpacity>
            </View>


            {/*Modals */}
            {success && <SuccessModal setShowModal={setSuccess} onFinish={onFinish} />}
            {serverError && <ErrorModal error={serverError} setShowModal={setServerError} />}
        </View>
    )
}

function SuccessModal({ setShowModal, onFinish }) {
    const { t } = useTranslation();
    const navigation = useNavigation()

    return (
        <Modal
            isVisible
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
                {t("newAppointment.success_modal.title")}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    marginTop: 10,
                    textAlign: "center",
                    opacity: 0.7,
                }}
            >
                {t("newAppointment.success_modal.subtitle")}
            </Text>
            <TouchableOpacity
                onPress={()=> onFinish()}
                style={{
                    backgroundColor: color.base,
                    width: "65%",
                    height: 55,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 9,
                    marginTop: 20
                }}
            >
                <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
                    {t("register.finishButton")}
                </Text>   
            </TouchableOpacity>
        </View>
        </Modal>
    );
}
function ErrorModal({ setShowModal, error }) {
    const { t } = useTranslation();

    return (
    <Modal
        isVisible
        onBackdropPress={() => setShowModal(null)}
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
  


export default NewAppointmentSelectOptions