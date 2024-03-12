/** @format */

import { useTranslation } from "react-i18next";
import { View, Text, StatusBar, TouchableOpacity, Image} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import color from "../../constants/colors";
import {useState, useEffect} from 'react'

function Consultation() {
  const {t} = useTranslation()
  const [consultations, setConsultations] = useState([])

  async function getConsultations(){
    //get all consultations with supabase
  }

  useEffect(()=>{
    //getConsultations()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: StatusBar.currentHeight }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>

      <View style={{height: 70, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: color.input, paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: 20}} />
        <Text style={{fontWeight: "bold", fontSize: 15}}>
          {t('consultation.title')}
        </Text>       
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal-outline" size={20} color='black' />
        </TouchableOpacity> 
      </View>

      {
        consultations.length > 0 ?
        <View style={{flex: 1}}>

        </View> :
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/consultant.png')} style={{height: 100, width: 100, opacity: 0.4}} />
            <Text style={{fontSize: 15, opacity: 0.6, marginTop: 7}}>
              {t('others.nothingToShow')}
            </Text> 
        </View> 
      }

    </View>
  );
}

export default Consultation;
