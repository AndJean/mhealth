import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Index from "../screens/auth/paymentSettings"
import NewPaymentMethod from "../screens/auth/paymentSettings"

const Stack = createStackNavigator()
function PaymentSettingsStack(){

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="index"
                component={Index}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen 
                name="newPaymentMethod"
                component={NewPaymentMethod}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    )
}

export default PaymentSettingsStack