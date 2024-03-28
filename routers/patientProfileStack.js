import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Index from "../screens/auth/patientProfileStack"

const Stack = createStackNavigator()
function PatientProfileStack(){
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

export default PatientProfileStack