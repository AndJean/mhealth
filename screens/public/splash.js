/** @format */

import { supabase } from "../../supabase";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import color from "../../constants/colors";

function Splash() {
  const navigation = useNavigation();

  //check if any user exist
  async function fetchUser() {
    const fetch = await supabase.auth.getSession();
    if (fetch.data.session === null) {
      //redirect to onBoarding screens
      navigation.replace("onBoarding");
    } else {
      //we will check if the user has already a type "patient or doctor"
      const getUser = await supabase.from('profiles').select('type').eq('id', fetch.data.session.user.id)
      if(getUser.error){
          console.log(getUser.error.message)
      }else{
          const type = getUser.data[0].type
          if(type){
            navigation.replace("main");
          }else{
            navigation.replace("register_step3");
          }
      }
    }
  }

  //useEffect with one dependency launched once when the component is mounted
  useEffect(() => {
    //we call our function here after 01 second
    let timeout = setTimeout(() => {
      fetchUser();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.base,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
        mHealth
      </Text>
    </View>
  );
}

export default Splash;
