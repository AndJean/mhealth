import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Index from "../screens/auth/doctorProfileStack"
import NewAppointment from "../screens/auth/doctorProfileStack/newAppoitment"

const Stack = createStackNavigator()
function DoctorProfileStack(){
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
                name="newAppointment"
                component={NewAppointment}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    )
}

export default DoctorProfileStack