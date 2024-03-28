import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Image} from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useCurrentUser } from "../../providers/sessionProvider"
import color from '../../constants/colors'
import { supabase } from "../../supabase"
function Search() {
    const {t} = useTranslation()
    const {user} = useCurrentUser()
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    async function onSearch(value){
        try {
            setLoading(true)
            const search = await supabase.from('profiles').select('*').ilike('full_name', `%${value}%`).eq('type', 'Doctor')   //or(`full_name.ilike.%${value}%, .eq.Doctor`)
            if(search.error){
                throw Error(search.error.message)
            }else{
                setSearchResults(search.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return(
        <View style={{flex:1, backgroundColor:'white', paddingHorizontal:25}}>
            {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50,justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
            </View>
            {/*search box*/}
            <View
                style={{
                    backgroundColor: color.input,
                    width: "100%",
                    height: 55,
                    borderRadius: 100,
                    marginTop: 10,
                    elevation: 9,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                }}
            >
                <Ionicons name="search-outline" size={23} color={color.base} />
                <TextInput 
                    onChangeText={(text)=> onSearch(text)}
                    placeholder={t("home.searchBox")}
                    style={{ marginLeft: 20, width: "80%" }}
                />
                <View>
                    {loading && <ActivityIndicator size='small' color={color.base} />}
                </View>
            </View>
            {
                searchResults.length > 0 &&
                <Text style={{fontSize: 15, marginTop: 15}}>{searchResults.length} {t('search.results_count')}</Text>
            }
            <ScrollView showsHorizontalScrollIndicator={false} bounces={false} overScrollMode='never' style={{marginTop: 15}}>
                {
                    searchResults.map((item, index) => 
                        <TouchableOpacity key={index} onPress={()=> navigation.navigate('doctorProfileStack', {doctor: item})} style={{width: '100%', height: 80, flexDirection: 'row', gap: 20, paddingVertical: 15, borderBottomWidth: 0.7, borderBottomColor: 'rgb(233, 233, 233)'}}>
                            {/*profile pic*/}
                            <View style={{height:45, width:45, borderRadius:100, backgroundColor:color.input, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    item.profile_pic
                                    ?
                                    <Image source={{uri: item.profile_pic}} style={{height: '100%', width: '100%'}} />
                                    :
                                    <FontAwesome name="user" size={40} color="rgb(156, 156, 156)" style={{position: 'absolute', bottom: -8}} />
                                }
                            </View>
                            <View>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.full_name}</Text>
                                <Text style={{fontSize: 15, marginTop: 3}}>{item.doctor_category}</Text>
                            </View>
                        </TouchableOpacity>    
                    )
                }
            </ScrollView>
        </View>

    )
}
export default Search