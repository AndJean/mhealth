/** @format */

import { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useCurrentUser } from "../../providers/sessionProvider";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import {FontAwesome} from '@expo/vector-icons'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


function Home() {
  const { t } = useTranslation();
  const [field, setField] = useState({
    search: null
  })
  const { user } = useCurrentUser();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={{flexDirection:"row", justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center'}}>
        <Text
            style={{
              paddingTop: 15,
              paddingHorizontal: 25,
              fontSize: 25,
              fontWeight: "bold",
              maxWidth: '60%'
            }}
        >
          {t("home.title")}
        </Text>

        {/*profile pic*/}
        <View style={{height:45, width:45, borderRadius:100, backgroundColor:color.input, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
            {
              user && user.profile_pic
              ?
              <Image source={{uri: user.profile_pic}} style={{height: '100%', width: '100%'}} />
              :
              <FontAwesome name="user" size={40} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -8}} />
            }
        </View>
      </View>
  
     
      {/*searchbox category*/}
      <View style={{ marginTop: 15, paddingHorizontal:16}}>
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
          }}
        >
          <Ionicons name="search-outline" size={23} color={color.base} />
          <TextInput
            placeholder={t("home.searchBox")}
            value={field.search}
            onChangeText={(text) =>
              setField((prev) => ({ ...prev, search: text }))
            }
            style={{ marginLeft: 20, width: "73%" }}
          />
        </View>
      </View>
      
      {/**categories list*/}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} overScrollMode="never" style={{marginTop: 25, flexGrow: 0}}>
        <View style={{width:15}} />
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/medical-team.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option1')}</Text>
          </View>
        </TouchableOpacity>
        {/**Pediatrician category */}   
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/pediatrics.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option2')}</Text>
          </View>
        </TouchableOpacity>
        {/**Pediatrician category */}   
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/dermatologist.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option3')}</Text>
          </View>
        </TouchableOpacity>   
         {/**Pediatrician category */} 
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/dentist.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option4')}</Text>
          </View>
        </TouchableOpacity> 
         {/**Pediatrician category */}   
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/cardiologist.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option5')}</Text>
          </View>
        </TouchableOpacity> 
         {/**Pediatrician category */}   
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/gynecologist.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option6')}</Text>
          </View>
        </TouchableOpacity> 
         {/**Pediatrician category */}   
        <TouchableOpacity onPress={() => ('')} style={{width: 100, alignItems: 'center'}}>
          <View style={{height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/ophthalmologist.png')} style={{height: 50, width: 50}} />
          </View>
          <View style={{alignItems: 'center', marginTop: 12}}>
              <Text style={{textAlign: 'center'}}>{t('home.category.option7')}</Text>
          </View>
        </TouchableOpacity>
        <View style={{width:15}} />   
      </ScrollView>
      
      <View>
        {/**Header, text */}
      </View>
      <View>
        {/**Doctor card */}
      </View>

      


      {/* */}
    </View>
  );
}

export default Home;
