import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next";
import color from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../supabase";
import validator from "validator";
import { useState } from "react";

function Register_step3(){
    const { t } = useTranslation(); //used to transate the app
    const navigation = useNavigation(); //used to navigate between screens


    function onSelect(type){
      navigation.navigate('register_step4', {type})
    }

    return (
       <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: StatusBar.currentHeight}}>
          <StatusBar barStyle="dark-content" translucent backgroundColor='transparent' />
          <View style={{ paddingHorizontal: 25 }}>
            <Text style={{ fontSize: 27, fontWeight: "bold", marginTop: 35 }}>
              {t("register.title2")}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.7 }}>
              {t("register.subtitle2")}
            </Text>
          </View>
          {/*card container */}
          <View style={{marginTop: 50, width: '100%'}}>
              {/*a card */}
              <View style={{height: 180, width: '90%', alignSelf: 'center', borderRadius: 22, backgroundColor: 'white', elevation: 7, overflow: 'hidden'}}>
                  <Image source={require('../../../assets/Images/welcome.jpg')} style={{height: '100%', width: '100%'}} />
                  <View style={{backgroundColor: 'black', opacity: 0.4, position: 'absolute', height: '100%', width: '100%'}} />
                  <View style={{position: 'absolute', width: '90%', bottom: 20, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{maxWidth: '70%'}}>
                      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                        {t("register.field9.choice1.title")}
                      </Text>     
                      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 10}}>
                        {t("register.field9.choice1.description")}
                      </Text>                 
                    </View>
                    <TouchableOpacity onPress={()=> onSelect(0)} style={{height: 45, width: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: "white", alignSelf: 'flex-end'}}>
                      <Ionicons name="arrow-forward" size={23} color='black' />
                    </TouchableOpacity>
                  </View>
              </View>

              {/*a card */}
              <View style={{marginTop: 20, height: 180, width: '90%', alignSelf: 'center', borderRadius: 22, backgroundColor: 'white', elevation: 7, overflow: 'hidden'}}>
                  <Image source={require('../../../assets/Images/doctors.jpg')} style={{height: '100%', width: '100%'}} />
                  <View style={{backgroundColor: 'black', opacity: 0.4, position: 'absolute', height: '100%', width: '100%'}} />
                  <View style={{position: 'absolute', width: '90%', bottom: 20, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{maxWidth: '70%'}}>
                      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                        {t("register.field9.choice2.title")}
                      </Text>     
                      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 10}}>
                        {t("register.field9.choice2.description")}
                      </Text>                 
                    </View>
                    <TouchableOpacity onPress={()=> onSelect(1)} style={{height: 45, width: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: "white", alignSelf: 'flex-end'}}>
                      <Ionicons name="arrow-forward" size={23} color='black' />
                    </TouchableOpacity>
                  </View>
              </View>
          </View>
       </View>
    )
}


export default Register_step3