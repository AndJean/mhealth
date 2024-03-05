import { useState } from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import { useCurrentUser } from "../../providers/sessionProvider";
import { useNavigation } from "@react-navigation/native";
import Animated, {LinearTransition} from "react-native-reanimated"
import { useTranslation } from "react-i18next";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import color from "../../constants/colors";




function DoctorProfile({route}){
    const {t} = useTranslation();
    const navigation = useNavigation();
    const [doctorInfos, setDoctorInfos] = useState(route.params.doctor)



    return(
        <View style={{flex:1, backgroundColor:'white', paddingHorizontal:25}}>
            {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50,justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {t('doctorProfile.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>

            {/** Card container*/}
            <View style={{flexDirection: 'row', width: '100%', marginTop: 50, gap: 20}}>
                <View>
                    {/*profile pic*/}
                    <View style={{height: 120, width: 120, borderRadius: 20, backgroundColor: color.input, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor: 'rgb(206, 206, 206)'}}>
                        {
                            doctorInfos.profile_pic
                            ?
                            <Image source={{uri: doctorInfos.profile_pic}} style={{height: '100%', width: '100%'}} />
                            :
                            <FontAwesome name="user" size={40} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -8}} />
                        }
                    </View>                
                </View>
                <View>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{doctorInfos.full_name}</Text>
                    <Text style={{fontSize: 15, marginTop: 3}}>{doctorInfos.doctor_category}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 15}}>
                        <Ionicons name="star" size={19} color={color.base} />
                        <Text style={{fontSize: 15, marginTop: 3}}>0.0</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8}}>
                        <Ionicons name="location-outline" size={23} color='#666666' />
                        <Text style={{fontSize: 15, marginTop: 3}}>{doctorInfos.address}</Text>
                    </View>
                </View>
            </View>

            {/*About section */}
            <View style={{marginTop: 25}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>{t('doctorProfile.about_title')}</Text>
                <Text style={{fontSize: 15, marginTop: 8, fontStyle: doctorInfos.doctor_description ? 'normal': 'italic'}}>{t('doctorProfile.empty_about')}</Text>
            </View>

            {/*bottom container*/}
            <Animated.View layout={LinearTransition.duration(300)} style={{position: 'absolute', bottom: 35, width: '90%', alignSelf: 'center'}}>
                <TouchableOpacity
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
                        {t("doctorProfile.appointment_button")}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}
export default DoctorProfile;