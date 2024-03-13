import {useEffect, useState} from 'react'
import { View, Text, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import {
    IAppointment,
    IAvailableDates,
    TimeSlotPicker,
  } from '@dgreasi/react-native-time-slot-picker'
import color from "../../../constants/colors"
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'

function NewAppointmentSelectOptions({route}){
    const {t} = useTranslation()
    const navigation = useNavigation()
    const [availableDates, setAvailableDates] = useState([])
    const [dateOfAppointment, setDateOfAppointment] = useState(null)
    const [unaivalableDate, setUnaivalableDate] = useState([])
    const [field, setField] = useState({
        reason: null
    })
    const [errors, setErrors] = useState({
        reason: null
    })

    function onChange(name) {
        setErrors({
            reason: null
        })
    }

    async function onSubmit(){

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
                    <View style={{height: 100}} />                 
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
                    <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
                        {t("newAppointment.submitButton")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}




export default NewAppointmentSelectOptions