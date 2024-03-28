import react, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import i18next from 'i18next';
import { FontAwesome } from '@expo/vector-icons'
import { supabase } from '../../../supabase';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../../../providers/sessionProvider';
import Checkbox from 'expo-checkbox'
import { CardIcon } from './newPaymentMethod';
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import color from '../../../constants/colors';

function Index(){
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [selectedCard, setSelectedCard] = useState(null)
    const [showCardOptions, setShowCardOptions] = useState(false)
    const {user} = useCurrentUser()
    const { t } = useTranslation()

    function selectCard(card){
        setSelectedCard(card)
        setShowCardOptions(true)
    }
    
    function closeCardOptions(){
        setShowCardOptions(false)
        setSelectedCard(null)
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
             {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50, paddingHorizontal: 25, justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                       {t('paymentSettings.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>
            {
                (user && user.payment_methods && user.payment_methods.length > 0) ?
                <FlatList
                    data={user.payment_methods}
                    renderItem={({item})=> <RenderItem item={item} selectCard={selectCard} />}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                    contentContainerStyle={{gap: 12, paddingHorizontal: 25}}
                />
                :
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesome name="credit-card" size={100} color="black" style={{opacity: 0.3}} />
                    <Text style={{fontSize: 15, opacity: 0.6, marginTop: 7}}>
                        {t('others.nothingToShow')}
                    </Text>
                </View>                
            }
            {/*bottom container*/}
            <View style={{position: 'absolute', bottom: 20, width: '90%', alignSelf: 'center'}}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('newPaymentMethod')}
                    style={{
                        backgroundColor: color.base,
                        width: "100%",
                        height: 55,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 35,
                        elevation: 9,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
                        {t("paymentSettings.addButton")}
                    </Text>
                </TouchableOpacity>
            </View>
            {showCardOptions && <CardOptions selectedCard={selectedCard} setShowCardOptions={setShowCardOptions} closeCardOptions={closeCardOptions} />}
        </View>
    )
}

function RenderItem({item, selectCard}){
    const [isChecked, setChecked] = useState(item.selected)
    const navigation = useNavigation()
    const {t} = useTranslation()

    return (
      <TouchableOpacity onPress={()=> selectCard(item)} style={{width: '100%', height: 100, flexDirection: 'row', gap: 20, paddingVertical: 15, borderBottomWidth: 0.7, borderBottomColor: 'rgb(233, 233, 233)', alignItems: 'center'}}>
        <View style={{height: '100%', width: 70, backgroundColor: color.input, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
            {item.type && <CardIcon cardType={item.type} />}
        </View>
        <View style={{width: '60%'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{`${item.cardNumber.slice(0, 4)} **** ****`}</Text>
            <Text style={{fontSize: 14, marginTop: 3}}>{item.fullName}</Text>
            {item.selected && <View style={{backgroundColor: color.base, width: 100, paddingVertical: 3, borderRadius: 100, alignItems: 'center', marginTop: 8}}>
                <Text style={{fontSize: 13, color: 'white'}}>{t('paymentSettings.selected')}</Text>
            </View>}
        </View>
      </TouchableOpacity>
    )
}

function CardOptions({selectedCard, setShowCardOptions, closeCardOptions}){
    const bottomSheetRef = useRef(null)
	const snapPoints = ["20%"]
    const navigation = useNavigation()
    const {user} = useCurrentUser()
    const {t} = useTranslation()

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);
    
    async function setAsPreferred(){
        try {
            const getData = await supabase.from('profiles').select('payment_methods').eq('id', user.id).limit(1).single()
            if(getData.error){
                throw Error(getData.error.message)
            }

            const payment_methods = getData.data.payment_methods
            payment_methods.map((card)=>{
                if(card.cardNumber === selectedCard.cardNumber){
                    card.selected = true
                }else{
                    card.selected = false
                }
                
                return card
            })

            
            await supabase.from('profiles').update({payment_methods}).eq('id', user.id)
            ToastAndroid.show(t('paymentSettings.cardUpdated'), ToastAndroid.SHORT)
            closeCardOptions()
        } catch (error) {
            console.log('Error updating preferred card:', error)
        }
    }

    async function deleteCard(){
        try {
            const getData = await supabase.from('profiles').select('payment_methods').eq('id', user.id).limit(1).single()
            if(getData.error){
                throw Error(getData.error.message)
            }
            const payment_methods = getData.data.payment_methods
            const updated_payment_method = payment_methods.filter(prev => prev.cardNumber !== selectedCard.cardNumber)
            await supabase.from('profiles').update({payment_methods: updated_payment_method}).eq('id', user.id)
            ToastAndroid.show(t('paymentSettings.cardDeleted'), ToastAndroid.SHORT)
            closeCardOptions()
        } catch (error) {
            console.log('Error deleting card:', error)
        }
    }


    return (
        <View style={{position: 'absolute', height: Dimensions.get('screen').height, width: '100%'}}>
			<BottomSheet
				ref={BottomSheet}
				index={0}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
                onClose={() => setShowCardOptions(false)}
			>
				<View style={{flex: 1, padding: 20}}>
                    {!selectedCard.selected && <TouchableOpacity onPress={()=> setAsPreferred()}>
                        <Text style={{fontSize: 16, fontWeight:'700', marginLeft: 5, marginBottom: 10}}>{t('paymentSettings.setAsPreferred')}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={()=> deleteCard()}>
                        <Text style={{fontSize: 16, fontWeight:'700', marginLeft: 5, color: 'red'}}>{t('paymentSettings.deleteCard')}</Text>
                    </TouchableOpacity>
                </View>
			</BottomSheet>
        </View>
    )
}



export default Index;