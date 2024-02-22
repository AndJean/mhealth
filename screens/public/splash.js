/** @format */

import { supabase } from "../../supabase";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"
import color from "../../constants/colors";

function Splash() {
  const navigation = useNavigation()

  //check if any user exist
  async function fetchUser() {
    const fetch = await supabase.auth.getSession();
    if(fetch.data.session ===null) {
      //redirect to onBoarding screens
      //navigation.replace()
    }else{
      //redirect to home screen
    }
  }


  //useEffect with one dependency launched once when the component is mounted
  useEffect(() => {
    //we call our function here
    fetchUser()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.base,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
        mHealth
      </Text>
    </View>
  );
}

export default Splash;
