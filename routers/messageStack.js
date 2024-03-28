import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Index from "../screens/auth/main/messagesStack"

const Stack = createStackNavigator()
function MessagesStack(){

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

export default MessagesStack