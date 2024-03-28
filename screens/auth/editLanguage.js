import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import { SessionProvider } from "../../providers/sessionProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCurrentUser } from "../../providers/sessionProvider";
import { supabase } from "../../supabase";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import color from "../../constants/colors";

function EditLanguage(){
    const navigation = useNavigation()
    const { t } = useTranslation(); //used to transate the 
    const currentLanguage = i18next.language
    const [languageList, setLanguageList] = useState([
        {
            name: 'en',
            icon: <Image source={require('../../assets/Images/Icons/united-kingdom.png')} style={{height: 40, width: 40}} />
        },
        {
            name: 'fr',
            icon: <Image source={require('../../assets/Images/Icons/france.png')} style={{height: 40, width: 40}}  />
        }
    ])

    useEffect(()=>{
    }, [])

    async function updateLanguage(lang){
        i18next.changeLanguage(lang, (error)=>{
            console.log(error)
        })
    }

    return (
        <View style={{flex:1,backgroundColor:'white', paddingHorizontal: 25}}>
            {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50,justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {t('editlanguage.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>
            <View style={{marginTop: 25}}>
                {
                    //we map the state languageList
                    languageList.map((lang, index) => 
                        <TouchableOpacity key={index} onPress={()=> updateLanguage(lang.name)} style={{flexDirection: 'row', height: 50, width: '100', alignItems: 'center', gap: 15, borderBottomWidth: 0.5, borderBottomColor: 'rgb(226, 226, 226)'}}>
                            {/*icon container */}
                            <View style={{height: '100%', width: '15%', alignItems: 'center', justifyContent: 'center'}}>
                                {lang.icon}
                            </View>

                            {/*text container */}
                            <View style={{height: '100%', width: '70%', justifyContent: 'center'}}>
                                <Text style={{fontSize: 15}}>{lang.name}</Text>
                            </View>
                            
                            {
                                currentLanguage === lang.name &&
                                <Ionicons name="checkmark-circle" size={22} color={color.base} />
                            }
                        </TouchableOpacity>    
                    )
                }
            </View>
        </View>        
    )
}

export default EditLanguage;