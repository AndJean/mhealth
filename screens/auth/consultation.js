/** @format */

import { useTranslation } from "react-i18next";
import { View, Text, StatusBar, TouchableOpacity, Image, ActivityIndicator, FlatList} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import color from "../../constants/colors";
import {useState, useEffect} from 'react'
import { supabase } from "../../supabase";
import { useCurrentUser } from "../../providers/sessionProvider";
import { useNavigation } from '@react-navigation/native';

function Consultation() {
  const {t} = useTranslation()
  const {user} = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const [consultations, setConsultations] = useState([])

  async function getConsultations(){
    //get all consultations with supabase
    try {
      setLoading(true)
      const req = await supabase.from('consultations').select('*').eq('patient_id', user.id)
      if(req.error){
        throw Error(req.error.message)
      }
      setConsultations(req.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(consultations.length === 0)
    getConsultations()      
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
        !loading ?
        consultations.length > 0 ?
        <View style={{flex: 1}}>
            <FlatList
              data={consultations}
              renderItem={({item})=> <RenderItem item={item} />}
              showsVerticalScrollIndicator={false}
              bounces={false}
              overScrollMode="never"
              contentContainerStyle={{gap: 12, paddingHorizontal: 25}}
            />
        </View> :
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/Images/Icons/consultant.png')} style={{height: 100, width: 100, opacity: 0.4}} />
            <Text style={{fontSize: 15, opacity: 0.6, marginTop: 7}}>
              {t('others.nothingToShow')}
            </Text> 
        </View> :
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='small' color={color.base} />
          <Text style={{fontSize: 15, opacity: 0.6, marginTop: 7}}>
            {t('others.loading')}
          </Text> 
        </View>
      }

    </View>
  );
}

function RenderItem({item}){
  const {t} = useTranslation()
  const navigation = useNavigation()
  return (
    <View style={{width: '100%', height: 100, flexDirection: 'row', gap: 20, paddingVertical: 15, borderBottomWidth: 0.7, borderBottomColor: 'rgb(233, 233, 233)', alignItems: 'center'}}>
      <View style={{height: '100%', width: 70, backgroundColor: color.input, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
        <DoctorCategoryIcon category={item.doctor_category} />
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('consultationDetails', {consultation: item})}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.doctor_category}</Text>
          <Text style={{fontSize: 14, marginTop: 3}}>{t('consultation.itemDateText')} {new Date(item.date.appointmentDate).toLocaleDateString()} {t('consultation.itemTimeText')} {item.date.appointmentTime}</Text>
          <View style={{backgroundColor: color.input, width: 100, paddingVertical: 3, borderRadius: 100, alignItems: 'center', marginTop: 8}}>
            <Text style={{fontSize: 13}}>{item.completed ? t('consultation.completed') : t('consultation.notCompleted')}</Text>
          </View>
      </TouchableOpacity>
    </View>
  )
}

export function DoctorCategoryIcon({ category }) {
  const [categoryImage, setCategoryImage] = useState(null);

  useEffect(() => {
    switch (category) {
      case 'General Practitioner':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/medical-team.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Pediatrician':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/pediatrics.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Dermatology':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/dermatologist.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Dentist':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/dentist.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Cardiology':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/cardiologist.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Gynécology':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/gynecologist.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      case 'Ophtalmology':
        setCategoryImage(
          <Image
            source={require('../../assets/Images/Icons/ophthalmologist.png')}
            style={{ height: 50, width: 50 }}
          />
        );
        break;
      default:
        setCategoryImage(null);
        break;
    }
  }, [category]);

  if (!categoryImage) {
    return <View />;
  }

  return (
    <View>
      {categoryImage}
    </View>
  )
}

export default Consultation;
