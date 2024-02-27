/** @format */

import { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useCurrentUser } from "../../providers/sessionProvider";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import {FontAwesome} from '@expo/vector-icons'
import { Ionicons } from "@expo/vector-icons";


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

      <View>
        {/**Text, image,button */}
      </View>
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
