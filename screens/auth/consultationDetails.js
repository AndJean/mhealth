import react, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'
import { useCurrentUser } from '../../providers/sessionProvider'
import { DoctorCategoryIcon } from './consultation';
import { supabase } from '../../supabase';
import moment from 'moment';
import color from '../../constants/colors';

function ConsultationDetails({route}){
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [consultationInfos, setConsultationsInfos] = useState(route.params.consultation)
    const [doctorInfos, setDoctorInfos] = useState(null)
    const [patientInfos, setPatientInfos] = useState(null)
    const [canStart, setCanStart] = useState(false)
    const {user} = useCurrentUser()

    async function getDoctorsInfos(){
        try {
            setLoading(true)
            const req = await supabase.from('profiles').select('*').eq('id', consultationInfos.doctor_id).limit(1).single()
            if(req.error){
                throw Error(req.error.message)
            }
            setDoctorInfos(req.data)
            console.log(req.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('failed to retrieve doctors infos ', error)
        }
    }

    async function getPatientInfos(){
        try {
            setLoading(true)
            const req = await supabase.from('profiles').select('*').eq('id', consultationInfos.patient_id).limit(1).single()
            if(req.error){
                throw Error(req.error.message)
            }
            setPatientInfos(req.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('failed to retrieve doctors infos ', error)
        }
    }

    function checkDate(){
        const currentDate = new Date()
        const currentHour = moment().hour()+'h'
        const consultationDate = new Date(consultationInfos.date.appointmentDate)
        const consultationHour = consultationInfos.date.appointmentTime

        if(currentDate.toLocaleDateString() === consultationDate.toLocaleDateString() && currentHour === consultationHour ){
            setCanStart(true)
        }else{
            setCanStart(false)
        }
    }

    useEffect(()=>{
        if(!doctorInfos){
            getDoctorsInfos()            
        }

        if(!patientInfos){
            getPatientInfos()            
        }
    }, [])

    useEffect(()=>{
        if(consultationInfos){
            checkDate()            
        }
    }, [consultationInfos])


    //listen to consultations modifications
    useEffect(()=>{
        supabase
        .channel('consultation-changes')
        .on('postgres_changes', {event: '*', schema: 'public'}, (payload) => {
            if(payload.table === 'consultations' && payload.new.id === consultationInfos.id){
                setConsultationsInfos(payload.new)
            }
          }
        )
        .subscribe()      
    }, [])
    
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50, paddingHorizontal: 25, justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {t('consultationDetails.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>
            {
                !loading && doctorInfos && patientInfos ?
                <Infos canStart={canStart} consultationInfos={consultationInfos} doctorInfos={doctorInfos} patientInfos={patientInfos} /> :
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='small' color={color.base} />
                    <Text style={{fontSize: 15, opacity: 0.6, marginTop: 7}}>
                        {t('others.loading')}
                    </Text> 
                </View>             
            }
        </View>
    )
}

function Infos({canStart, consultationInfos, doctorInfos, patientInfos}){
    const {t} = useTranslation()
    const {user} = useCurrentUser()
    const navigation = useNavigation()

    return (
        <View style={{flex: 1, paddingHorizontal: 25, paddingTop: 50}}>
            <View style={{height: 70, width: 70, backgroundColor: color.input, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                <DoctorCategoryIcon category={consultationInfos.doctor_category} />
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', maxWidth: '70%', marginTop: 15}}>{t('consultationDetails.title2')} {new Date(consultationInfos.date.appointmentDate).toLocaleDateString()}</Text>
            <View style={{flex: 0.85}}>
                <ScrollView showVerticalScrollIndicator={false} bounces={false} overScrollMode='never'>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field0')}:</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>{consultationInfos.doctor_category}</Text>
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field1')}:</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>{new Date(consultationInfos.date.appointmentDate).toLocaleDateString()} - {consultationInfos.date.appointmentTime}</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field2')}:</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>{consultationInfos.reason}</Text>
                    </View>
                    {
                    user.type === 'Patient' ?
                        <View style={{marginTop: 15}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field3.label')}:</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 10}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field3.fullName')}:</Text>
                                <Text style={{fontSize: 15}}>{doctorInfos.full_name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 10}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field3.phone')}:</Text>
                                <Text style={{fontSize: 15}}>{doctorInfos.phone}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 10}}>
                                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field3.address')}:</Text>
                                <Text style={{fontSize: 15}}>{doctorInfos.address}</Text>
                            </View>
                        </View>  :
                        <View style={{marginTop: 15}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field7')}:</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('patientProfile', {patientInfos})}>
                                <Text style={{fontSize: 15, marginTop: 5, color: color.base}}>{patientInfos.full_name}</Text>
                            </TouchableOpacity>
                        </View>                  
                    }
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field4')}:</Text>
                        <Text style={{fontSize: 15, marginTop: 5}}>{consultationInfos.price} £</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field5.label')}:</Text>
                        {
                            consultationInfos.diagnostic ?
                            <View></View> :
                            <Text style={{fontSize: 15, marginTop: 5}}>{t('consultationDetails.notAvailable')}</Text>
                        }
                    </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{t('consultationDetails.field6.label')}:</Text>
                        {
                            consultationInfos.treatment ?
                            <View></View> :
                            <Text style={{fontSize: 15, marginTop: 5}}>{t('consultationDetails.notAvailable')}</Text>
                        }
                    </View>
                </ScrollView>                
            </View>


            <View style={{position: 'absolute', bottom: 15, width: '90%', alignSelf: 'center'}}>
                {
                    canStart &&
                    <TouchableOpacity
                        onPress={()=> {}}
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
                            {t("consultationDetails.buttonStart")}
                        </Text>
                    </TouchableOpacity>                    
                }
            </View>
        </View>
    )
}


export default ConsultationDetails