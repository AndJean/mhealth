import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Splash from "../screens/public/splash"
import Welcome from "../screens/public/welcome"
import Login from "../screens/public/login"
import OnBoarding from "../screens/public/onBoarding"
import Register_step1 from "../screens/public/register/step1"
import Register_step2 from "../screens/public/register/step2"
import Register_step3 from "../screens/public/register/step3"
import Register_step4 from "../screens/public/register/step4"

const Stack = createStackNavigator()
function PublicStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="onBoarding"
                component={OnBoarding}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="welcome"
                component={Welcome}
                options={{
                headerShown: false,
                }}
            />
            <Stack.Screen
                name="register_step1"
                component={Register_step1}
                options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="register_step2"
                component={Register_step2}
                options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="register_step3"
                component={Register_step3}
                options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="register_step4"
                component={Register_step4}
                options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                }}
            />            
        </Stack.Navigator>
    )
}

export default PublicStack