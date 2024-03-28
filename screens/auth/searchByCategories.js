import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Image, FlatList} from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useCurrentUser } from "../../providers/sessionProvider"
import color from '../../constants/colors'
import { supabase } from "../../supabase"

function SearchByCategories({route}) {
    const {t} = useTranslation()
    const {user} = useCurrentUser()
    const [initialResults, setInitialsResults] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [initialLoading, setInitialLoading]= useState(false)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState(route.params.category)
    const navigation = useNavigation()

    //a funtion called everytime the user type in the search box
    async function onSearch(value){
        try {
            setLoading(true)
            const search = await supabase.from('profiles').select('*').ilike('full_name', `%${value}%`).eq('type', 'Doctor').eq('doctor_category', `${category}`)   //or(`full_name.ilike.%${value}%, .eq.Doctor`)
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

    //a function to preselect a list of doctors with the selected category from our database
    async function getData(){
        try {
            setInitialLoading(true)
            const search = await supabase.from('profiles').select('*').eq('type', 'Doctor').eq('doctor_category', `${category}`).limit(25)
            if(search.error){
                throw Error(search.error.message)
            }else{
                console.log(search.data.length)
                setInitialsResults(search.data)
            }
            setInitialLoading(false)
        } catch (error) {
            setInitialLoading(false)
            console.log(error)
        }
    }

    //a useEffect called once when the screen is mounted
    useEffect(()=>{
        if(initialResults.length === 0)
        getData()
    }, [])

    return(
        <View style={{flex:1, backgroundColor:'white', paddingHorizontal:25}}>
            {/* header */}
            <View style={{flexDirection: "row", paddingTop: 50, justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {category}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>

            {/*search box*/}
            <View
                style={{
                    backgroundColor: color.input,
                    width: "100%",
                    height: 55,
                    borderRadius: 100,
                    marginTop: 25,
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

            {
                initialLoading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='small' color={color.base} />
                </View> :
                <FlatList
                    data={searchResults.length ? searchResults : initialResults}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 15}}
                    bounces={false}
                    overScrollMode='never'
                    renderItem={({item})=> 
                        <TouchableOpacity onPress={()=> navigation.navigate('doctorProfileStack', {doctor: item})} style={{width: '100%', height: 80, flexDirection: 'row', gap: 20, paddingVertical: 15, borderBottomWidth: 0.7, borderBottomColor: 'rgb(233, 233, 233)'}}>
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
                    }
                />                
            }


        </View>

    )
}
export default SearchByCategories