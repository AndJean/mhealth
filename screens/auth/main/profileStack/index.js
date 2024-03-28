/** @format */

import { View, Text, StatusBar, ToastAndroid, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import color from "../../../../constants/colors";
import { useCurrentUser } from "../../../../providers/sessionProvider";
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../../supabase";
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function Index() {
  const {t} = useTranslation()
  const {user} = useCurrentUser() //a const to get all the states and the function passed by the session provider
  const navigation = useNavigation()

  //a function called when the user press the logout button
  async function logOut() {
    const logOutUser = await supabase.auth.signOut()
    if(logOutUser.error){
      console.log(logOutUser.error.message)
    }else{
      navigation.replace('welcome')
    }
  }
  
  
  
   return (
    <View style={{flex:1, backgroundColor:"white", paddingTop: StatusBar.currentHeight}}>
      <View style={{flexDirection:"row", justifyContent:"space-between", alignItems: 'center', paddingHorizontal: 15}}>
        <View style={{width: '30%'}} />
        <View style={{width: '40%'}}>
           <Text style={{alignSelf:"center", fontSize:17, fontWeight:"700"}}>{t("profile.title")}</Text> 
        </View>
        <View style={{width: '30%'}}>
          <TouchableOpacity onPress={()=> logOut()} style={{padding: 3, alignItems: 'flex-end'}}>
            <FontAwesome name="sign-out" size={24} color={color.base} />
          </TouchableOpacity>          
        </View>
      </View>
     
      <View style={{alignItems:"center",justifyContent:"center", height: 300,}}>
            <ProfilePic />
            {/*user type*/}
            <View style={{marginTop: 25, paddingHorizontal: 16, paddingVertical: 5, borderRadius: 100, backgroundColor: user.type === 'Patient' ? color.base: 'rgb(45, 97, 148)'}}>
              <Text style={{fontSize:16, fontWeight:'700', color: 'white'}}>
                {user.type}
              </Text>
            </View>
            {/*full name*/}
            <Text style={{marginTop: 7, fontSize:16,fontWeight:'700'}}>
              {user.full_name}
            </Text>
            {/*address*/}
              <Text style={{marginTop: 7, fontSize:16,}}>
                {user.address}
              </Text>              
      </View>
      <View style={{flex:1, backgroundColor:color.base, borderTopLeftRadius:45,borderTopRightRadius:45, paddingTop: 20, paddingHorizontal: 15}}>
         <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never">
            {/**profile informations container */}
            <TouchableOpacity onPress={()=> navigation.navigate('editProfile')} style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
              {/**Inicon on the left, inside profile informations container */}   
              <View style={{width:'20%', height:'100%', alignItems: 'center', justifyContent: 'center'}} >
                  <View style={{backgroundColor: 'rgb(219, 219, 219)', height: '100%', width: '80%', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name= "person-circle-outline" size={40} color='gray' />
                  </View>
              </View>
              {/**text center inside profile informations container */}
              <View style={{width:'60%', height:'100%', paddingLeft: 7}} >
                <Text style={{alignItems:"center",justifyContent:"center", marginTop: 20, fontWeight:700, color:'white'}}>
                  {t('profile.options1')}
                </Text>
              </View>
              {/**Inicon on the right, inside profile informations container */} 
              <View style={{width:'20%', height:'100%',}} >
                <View style={{height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name= "chevron-forward" size={25} color='white' />
                </View>
              </View>
            </TouchableOpacity>
            {/**Language information container */}
            <TouchableOpacity onPress={()=> navigation.navigate('editLanguage')} style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
              {/**Inicon on the left, inside Big container */}   
              <View style={{width:'20%', height:'100%', alignItems: 'center', justifyContent: 'center'}} >
                  <View style={{backgroundColor: 'rgb(219, 219, 219)', height: '100%', width: '80%', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name= "language-outline" size={30} color='gray' />
                  </View>
              </View>
              {/**text center inside Big container */}
              <View style={{width:'60%', height:'100%', paddingLeft: 7}} >
                <Text style={{alignItems:"center",justifyContent:"center", marginTop:20, fontWeight:700, color:'white'}}>
                  {t('profile.options2')}
                </Text>
              </View>
              {/**Inicon on the right, inside Big container */} 
              <View style={{width:'20%', height:'100%',}} >
                <View style={{height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="chevron-forward" size={25} color='white' />
                </View>
              </View>
            </TouchableOpacity>
            {/**Big container Payment setting */}
            <TouchableOpacity onPress={()=> navigation.navigate('paymentSettings')} style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
              {/**Inicon on the left, inside Big container */}   
              <View style={{width:'20%', height:'100%', alignItems: 'center', justifyContent: 'center'}} >
                  <View style={{backgroundColor: 'rgb(219, 219, 219)', height: '100%', width: '80%', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name= "card-outline" size={30} color='gray' />
                  </View>
              </View>
              {/**text center inside Big container */}
              <View style={{width:'60%', height:'100%', paddingLeft: 7}} >
                <Text style={{alignItems:"center",justifyContent:"center", marginTop:20, fontWeight:700, color:'white'}}>
                  {t('profile.options3')}
                </Text>
              </View>
              {/**Inicon on the right, inside Big container */} 
              <View style={{width:'20%', height:'100%',}} >
                <View style={{height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="chevron-forward" size={25} color='white' />
                </View>
              </View>
            </TouchableOpacity>
            {/**Big container privacy settings*/}
            <View style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
              {/**Inicon on the left, inside Big container */}   
              <View style={{width:'20%', height:'100%', alignItems: 'center', justifyContent: 'center'}} >
                  <View style={{backgroundColor: 'rgb(219, 219, 219)', height: '100%', width: '80%', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                      <Ionicons name= "lock-open-outline" size={30} color='gray' />
                  </View>
              </View>
              {/**text center inside Big container */}
              <View style={{width:'60%', height:'100%', paddingLeft: 7}} >
                <Text style={{alignItems:"center",justifyContent:"center", marginTop:20, fontWeight:700, color:'white'}}>
                  {t('profile.options4')}
                </Text>
              </View>
              {/**Inicon on the right, inside Big container */} 
              <View style={{width:'20%', height:'100%',}} >
                <View style={{height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="chevron-forward" size={25} color='white' />
                </View>
              </View>
            </View>          
         </ScrollView>

      </View> 
    </View>
  );
}

function ProfilePic(){
  const {user} = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const {t} = useTranslation()

  //called to pick a picture from the gallery
  async function openGallery(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
  

      if(result.assets.length > 0){
          const selectedPic = {
            uri: result.assets[0].uri,
            name: "profilePic"+user.id,
            type: result.assets[0].mimeType,
          }

          //if we have a file, then call the function to upload it
          uploadProfilePic(selectedPic)
      }

    } catch (error) {
      console.log(error)
    }
  }  

  //called to upload the selected picture
  async function uploadProfilePic(selectedPic){
    try {
      setLoading(true)
      const ext = selectedPic.type.replace('image/', '')
      const base64 = await FileSystem.readAsStringAsync(selectedPic.uri, {encoding: 'base64'})
      const fullpath = `${user.id}/${user.id}-${new Date()}-profilePic-mHealth.${ext}`
      const uploadToStorage = await supabase.storage.from('profiles').upload(fullpath, decode(base64), {
        cacheControl: 3600,
        upsert: true,
        contentType: selectedPic.type
      })

      if(uploadToStorage.error){
        console.log(uploadToStorage.error)
      }else{
        if(uploadToStorage.data){
          const getPicUrl = supabase.storage.from('profiles').getPublicUrl(fullpath)
          if(getPicUrl.data){
            const updateDb = await supabase.from('profiles').update({profile_pic: getPicUrl.data.publicUrl}).eq('id', user.id)
            
            if(updateDb.error){
              console.log(updateDb.error)
            }else{
              ToastAndroid.show(t('others.profilePicUpdated'), ToastAndroid.SHORT)
            }
          }      
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <View style={{height:140, width:140, borderRadius:100, backgroundColor: color.input}}>
        <View style={{height: '100%', width: '100%', borderRadius: 100, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
          {
            user.profile_pic
            ?
            <Image source={{uri: user.profile_pic}} style={{height: '100%', width: '100%'}} />
            :
            <FontAwesome name="user" size={130} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -30}} />
          }   
          {/*Show a spinner when there is a loading*/}
          {
            loading &&
            <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.47)', alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size='small' color='white' />
            </View>             
          }
        </View>
        <TouchableOpacity disabled={loading} onPress={()=> openGallery()} style={{position: 'absolute', bottom: 0, right: 0, borderRadius: 10, paddingHorizontal:7, paddingVertical:7, backgroundColor: color.base}} >
          <Ionicons name="camera" size={20} color={"white"}/>
        </TouchableOpacity>
    </View>
  )
}

export default Index;