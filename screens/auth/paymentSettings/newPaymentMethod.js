import react, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image,  ActivityIndicator, ToastAndroid} from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useCurrentUser } from '../../../providers/sessionProvider';
import color from '../../../constants/colors';
const valid = require("card-validator")
import validator from 'validator';
import {supabase} from '../../../supabase'

function NewPaymentMethod(){
    const navigation = useNavigation()
    const { t } = useTranslation()
    const [cardType, setCardType] = useState(null)
    const {user} = useCurrentUser()
    const [field, setField] = useState({
        cardNumber: null,
        fullName: null,
        expiryDate: null,
        cvv: null,
        selected: false
    })
    const [errors, setErrors] = useState({
        cardNumber: null,
        fullName: null,
        expiryDate: null,
        cvv: null,
        unknown: null,
    });
    const [loading, setLoading] = useState(false)

    const formatCardNumber = (input) => {
        const cleanedInput = input.replace(/\D/g, '');
        const formattedInput = cleanedInput.replace(/(.{4})/g, '$1 ').trim();
        return formattedInput;
    }

    const formatExpiryDate = (input) => {
        const cleanedInput = input.replace(/\D/g, '');
        const formattedInput = cleanedInput.replace(/^(\d{2})/, '$1/').trim();
        return formattedInput;
    };

    function onChange(name, value){
        setErrors({
            cardNumber: null,
            fullName: null,
            expiryDate: null,
            cvv: null,
            unknown: null,
        })
        
        if(name === 'cardNumber'){
            let formated = formatCardNumber(value)
            let isValid = null
            if(value){
                isValid = valid.number(value.trim())
            }else{
                setCardType(null)
            }
            setField(prev => ({...prev, cardNumber: formated}))
            if(isValid && isValid.card && isValid.card.niceType){
                setCardType(isValid.card.niceType)
            }
        }else if(name === "expiryDate"){
            let formated = formatExpiryDate(value)
            setField(prev => ({...prev, expiryDate:formated}))
        }else{
            setField(prev => ({...prev, [name]:value}))
        }
    }

    async function onSubmit(){
        //reset
        setErrors({
            cardNumber: null,
            fullName: null,
            expiryDate: null,
            cvv: null,
            unknown: null,
        })

        try{
            setLoading(true)
            let hasErrors = false

            //check the card number
            if(field.cardNumber){
                if(!valid.number(field.cardNumber.replace(/\s/g, "")).isPotentiallyValid){
                    hasErrors = true
                    setErrors(prev => ({...prev, cardNumber: t('login.errors.invalid_value')}))
                }
            }else{
                hasErrors = true
                setErrors(prev => ({...prev, cardNumber: t('login.errors.missing_value')}))
            }

            //check the full name
            if (field.fullName) {
                if (!validator.isAlpha(field.fullName.replace(/\s/g, ""))) {
                  //check if the given full name contain only letters
                  hasErrors = true;
                  setErrors((prev) => ({
                    ...prev,
                    fullName: t("register.errors.invalid_value"),
                  }));
                }
            } else {
                hasErrors = true;
                setErrors((prev) => ({
                    ...prev,
                    fullName: t("register.errors.missing_value"),
                }));
            }

            //check the expiry date
            if(field.expiryDate){
                if(!valid.expirationDate(field.expiryDate).isPotentiallyValid){
                    hasErrors = true
                    setErrors(prev => ({...prev, expiryDate: t('login.errors.invalid_value')}))
                }
            }else{
                hasErrors = true
                setErrors(prev => ({...prev, expiryDate: t('login.errors.missing_value')}))
            }

            //check the cvv
            if(field.cvv){
                if(!valid.cvv(field.cvv).isValid){
                    hasErrors = true
                    setErrors(prev => ({...prev, cvv: t('login.errors.invalid_value')}))
                }
            }else{
                hasErrors = true
                setErrors(prev => ({...prev, cvv: t('login.errors.missing_value')}))
            }

            if(!hasErrors){
                //submit the form
                const getPaymentMethods = await supabase.from('profiles').select('payment_methods').eq('id', user.id).limit(1).single()
                if(getPaymentMethods.error){
                    throw Error(getPaymentMethods.error.message)
                }

                let existingPaymentMethods = getPaymentMethods.data.payment_methods
                if(!existingPaymentMethods){
                    existingPaymentMethods = []
                    field.selected = true
                }

                field.type = cardType
                existingPaymentMethods.push(field)
                const updatePaymentMethods = await supabase.from('profiles').update({payment_methods: existingPaymentMethods}).eq('id', user.id)
                
                if(updatePaymentMethods.error){
                    throw Error(updatePaymentMethods.error.message)
                }

                ToastAndroid.show(t('newPaymentMethod.saved'), ToastAndroid.SHORT)
                navigation.goBack()
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }


    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            {/* header */}
            <View style={{flexDirection: "row",paddingTop: 50,  paddingHorizontal: 25,justifyContent: "space-between"}}>
                {/* Icon to go back to the previous screen */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={23} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                        {t('newPaymentMethod.title')}
                    </Text>
                </View>
                <View style={{width: 23}}></View>
            </View>

            {/*card number*/}
            <View style={{ marginTop: 50, paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {t("newPaymentMethod.field2.label")}
                </Text>
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
                        borderWidth: errors.cardNumber && 1,
                        borderColor: errors.cardNumber && "orangered",
                    }}
                >
                    <TextInput
                        placeholder={t("newPaymentMethod.field2.placeholder")}
                        value={field.cardNumber}
                        onChangeText={(text) => onChange("cardNumber", text)}
                        keyboardType='numeric'
                        style={{ marginLeft: 20, width: "85%" }}
                        maxLength={19}
                    />
                    <View>
                        {cardType && <CardIcon cardType={cardType} />}
                    </View>
                </View>
                {
                    errors.cardNumber &&
                    <Text
                        style={{
                            fontSize: 14,
                            paddingLeft: 10,
                            color: "orangered",
                            marginTop: 10,
                        }}
                    >
                    {errors.cardNumber}
                    </Text>                    
                }
            </View>

            {/*card holder*/}
            <View style={{ marginTop: 15, paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {t("newPaymentMethod.field1.label")}
                </Text>
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
                        borderWidth: errors.fullName && 1,
                        borderColor: errors.fullName && "orangered",
                    }}
                >
                    <TextInput
                        placeholder={t("newPaymentMethod.field1.placeholder")}
                        value={field.fullName}
                        onChangeText={(text) => onChange("fullName", text)}
                        style={{ marginLeft: 20, width: "85%" }}
                    />
                </View>
                {
                    errors.fullName &&
                    <Text
                        style={{
                            fontSize: 14,
                            paddingLeft: 10,
                            color: "orangered",
                            marginTop: 10,
                        }}
                    >
                        {errors.fullName}
                    </Text>
                }
            </View>    
            <View style={{marginTop: 20, paddingHorizontal: 25, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                {/*expiry date*/}
                <View style={{width: '47%' }}>
                    <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                        {t("newPaymentMethod.field3.label")}
                    </Text>
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
                            borderWidth: errors.expiryDate && 1,
                            borderColor: errors.expiryDate && "orangered",
                        }}
                    >
                        <TextInput
                            placeholder={t("newPaymentMethod.field3.placeholder")}
                            value={field.expiryDate}
                            onChangeText={(text) => onChange("expiryDate", text)}
                            style={{ marginLeft: 20, width: "85%" }}
                            maxLength={5}
                            keyboardType='numeric'
                        />
                    </View>
                    {
                        errors.expiryDate &&
                        <Text
                            style={{
                                fontSize: 14,
                                paddingLeft: 10,
                                color: "orangered",
                                marginTop: 10,
                            }}
                        >
                            {errors.expiryDate}
                        </Text>
                    }
                </View>       
                {/*cvv*/}
                <View style={{width: '47%' }}>
                    <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                        {t("newPaymentMethod.field4.label")}
                    </Text>
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
                            borderWidth: errors.cvv && 1,
                            borderColor: errors.cvv && "orangered",
                        }}
                    >
                        <TextInput
                            placeholder={t("newPaymentMethod.field4.placeholder")}
                            value={field.cvv}
                            onChangeText={(text) => onChange("cvv", text)}
                            style={{ marginLeft: 20, width: "85%" }}
                            maxLength={3}
                            keyboardType='numeric'
                        />
                    </View>
                    {
                        errors.cvv &&
                        <Text
                            style={{
                                fontSize: 14,
                                paddingLeft: 10,
                                color: "orangered",
                                marginTop: 10,
                            }}
                        >
                            {errors.cvv}
                        </Text>
                    }
                </View>            
            </View>  

            <View style={{marginTop: 35, paddingHorizontal: 25}}>
                <TouchableOpacity
                disabled={loading}
                onPress={() => onSubmit()}
                style={{
                    backgroundColor: color.base,
                    width: "100%",
                    height: 55,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 9,
                }}
                >
                <Text
                    style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                >
                    {loading ? (
                    <ActivityIndicator size="small" color="white" />
                    ) : (
                    t("newPaymentMethod.submitButton")
                    )}
                </Text>
                </TouchableOpacity>
            </View>                  
        </View>
    )
}

export function CardIcon({cardType}){
    const [cardImage, setCardImage] = useState(null)

    useEffect(()=>{
        switch (cardType) {
            case 'Visa':
                setCardImage(<Image source={require(`../../../../assets/Images/Icons/Visa.png`)} style={{height: 35, width: 35}} />)
                break;
            case 'Mastercard':
                setCardImage(<Image source={require(`../../../../assets/Images/Icons/Mastercard.png`)} style={{height: 35, width: 35}} />)
                break; 
            case 'American Express':
                setCardImage(<Image source={require(`../../../../assets/Images/Icons/American Express.png`)} style={{height: 35, width: 35}} />)
                break;       
            default: <View />
                break;
        }
    }, [])

    if(!cardImage){
        return <View />
    }

    return (
        <View>
            {cardImage}
        </View> 
    )
}
export default NewPaymentMethod;