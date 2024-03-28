import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import { useCurrentUser } from "../../../providers/sessionProvider";
import { useNavigation } from "@react-navigation/native";
import Animated, {LinearTransition} from "react-native-reanimated"
import { useTranslation } from "react-i18next";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import color from "../../../constants/colors";


function Index({route}){
    const {t} = useTranslation();
    const navigation = useNavigation();
    const [patientInfos, setPatientInfos] = useState(route.params.patientInfos)


    useEffect(()=>{

    }, [])


    return (
        <View style={{flex:1, backgroundColor:'white', paddingHorizontal: 25}}>
            {/* header */}
            <View style={{flexDirection: "row", paddingTop: 50, justifyContent: "space-between", }}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {t('patientProfile.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>

            {/** Card container*/}
            <View style={{marginTop: 50, width: '100%', alignItems: 'center'}}>
                <View style={{ height: 120, width: 120, borderRadius: 20, overflow: 'hidden', borderWidth:1, borderColor: 'rgb(206, 206, 206)'}}>
                    {
                        patientInfos.profile_pic
                        ?
                        <Image source={{uri: patientInfos.profile_pic}} style={{height: '100%', width: '100%'}} />
                        :
                        <FontAwesome name="user" size={100} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -20}} />
                    }                   
                </View>
                <View style={{marginTop: 25}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center'}}>{patientInfos.full_name}</Text>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, elevation: 5, marginTop: 8, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 100, backgroundColor: color.base}}>
                        <Text style={{fontSize: 15, color: 'white'}}>{t('patientProfile.historyButton')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginTop: 40}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.birth')}:</Text>
                <Text style={{fontSize: 15, marginTop: 5}}>{patientInfos.birth}</Text>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.phone')}:</Text>
                <Text style={{fontSize: 15, marginTop: 5}}>{patientInfos.phone}</Text>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.gender')}:</Text>
                <Text style={{fontSize: 15, marginTop: 5}}>{patientInfos.gender}</Text>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.bloodType')}:</Text>
                <Text style={{fontSize: 15, marginTop: 5}}>{patientInfos.bloodType}</Text>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.weight')}:</Text>
                <Text style={{fontSize: 15, marginTop: 5}}>{patientInfos.weight}</Text>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>{t('patientProfile.medicalConditions')}:</Text>
                {
                    patientInfos.medicalConditions ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false} overScrollMode="never" contentContainerStyle={{gap: 8}} style={{marginTop: 7}}>
                        {
                            patientInfos.medicalConditions.map((condition, index)=>(
                                <View key={index} style={{paddingHorizontal: 12, paddingVertical: 5, borderRadius: 100, backgroundColor: color.base}}>
                                    <Text style={{fontSize: 15, color: 'white'}}>{condition}</Text>
                                </View>
                            ))
                        }
                    </ScrollView> :
                    <Text style={{fontSize: 15, marginTop: 5}}>{t('consultationDetails.notAvailable')}</Text>
                }
            </View>
        </View>
    )
}


export default Index