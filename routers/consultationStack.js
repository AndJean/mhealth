import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Index from "../screens/auth/main/consultationStack"

const Stack = createStackNavigator()
function ConsultationStack(){

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
        </Stack.Navigator>
    )
}

export default ConsultationStack