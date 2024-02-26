/** @format */

import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from "react-native";
import { useCurrentUser } from "../../providers/sessionProvider";
import { useTranslation } from "react-i18next";
import color from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
function Home() {
  const { t } = useTranslation();
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
        {/*Image*/}
        <Image
          source={require("../../assets/Images/welcome1.jpg")}
          style={{ height: 50, width: 50}}
        />
      </View>
  
     
      {/*Header category*/}
      <View>
            
      </View>
      {/*Icones category*/}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator>
        <TouchableOpacity>
          <Image source={require("../../assets/Images/welcome.jpg")}
          style={{height:150}}/>
        </TouchableOpacity>
      </ScrollView>
      

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
