import react, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'

function ConsultationDetails({route}){
    const {t} = useTranslation();
    const navigation = useNavigation()
    const [consultationInfos, setConsultationsInfos] = useState(route.params.consultation)
    const [doctorInfos, setDoctorInfos] = useState(null)


    {/*
        consultationInfos => doctor_id => consultationInfos.doctor_id
        make a supabase request to get all the doctor informations with the doctor_id stored in the consultationInfos state
        and then set the doctorInfos state with these informations

        => consultation screen for the doctor
    */}
    
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
            <View>
                {
                    //user.type === 'Doctor' ? <DoctorScreen  /> : <PatientScreen consultationDetails={consultationDetails} />
                }
            </View>
        </View>
    )
}

function PatientScreen({consultationDetails}){
    return (
        <View>
            {/*t('consultationDetails.title2')} {new Date(consultationInfos.date).toLocaleDateString()*/}
        </View>
    )
}

function DoctorScreen({}){
    return (
        <View>
            {/*t('consultationDetails.title2')} {new Date(consultationInfos.date).toLocaleDateString()*/}
        </View>
    )
}


export default ConsultationDetails