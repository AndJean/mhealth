/** @format */

import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import { useCurrentUser } from "../../providers/sessionProvider";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { supabase } from "../../supabase";
import { useNavigation } from "@react-navigation/native";

function Profile() {
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
          {/*profile pic*/}
          <View style={{height:140, width:140, borderRadius:100, backgroundColor:color.input, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
              {
                user.profile_pic
                ?
                <Image source={{uri: user.profile_pic}} style={{height: '100%', width: '100%'}} />
                :
                <FontAwesome name="user" size={130} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -30}} />
              }
          </View>
          {/*full name*/}
            <Text style={{marginTop:25, fontSize:16,fontWeight:'700'}}>
              {user.full_name}
            </Text>
          {/*address*/}
          <Text style={{marginTop:7, fontSize:16}}>
              {user.address}
          </Text>
      </View>
      <View style={{flex:1, backgroundColor:color.base, borderTopLeftRadius:45,borderTopRightRadius:45, paddingTop: 50, paddingHorizontal: 15}}>
         {/**Big container */}
        <View style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
          {/**Inicon on the left, inside Big container */}   
          <View style={{width:'20%', height:'100%', alignItems: 'center', justifyContent: 'center'}} >
              <View style={{backgroundColor: 'rgb(219, 219, 219)', height: '100%', width: '80%', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name= "person-circle-outline" size={40} color='gray' />
              </View>
          </View>
          {/**text center inside Big container */}
          <View style={{width:'60%', height:'100%', paddingLeft: 7}} >
            <Text style={{alignItems:"center",justifyContent:"center", marginTop: 20, fontWeight:700, color:'white'}}>
              {t('profile.options1')}
            </Text>
          </View>
          {/**Inicon on the right, inside Big container */} 
          <View style={{width:'20%', height:'100%',}} >
            <View style={{height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name= "chevron-forward" size={25} color='white' />
            </View>
          </View>
        </View>
         {/**Big container */}
        <View style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
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
        </View>
         {/**Big container Payment setting */}
        <View style={{flexDirection:"row", width:'100%', height: 64, marginBottom:20, padding: 3}}> 
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
        </View>
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
      </View> 
    </View>
  );
}

export default Profile;
