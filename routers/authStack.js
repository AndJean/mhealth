import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import Tab from "./tab";
import Search from "../screens/auth/search";
import { ConsultationProvider } from "../providers/consultationProvider";
import SearchByCategories from "../screens/auth/searchByCategories";
import PatientProfileStack from "./patientProfileStack";
import DoctorProfileStack from "./doctorProfileStack";
import EditProfile from "../screens/auth/editProfile";
import EditLanguage from "../screens/auth/editLanguage";
import ConsultationDetails from "../screens/auth/consultationDetails";

const Stack = createStackNavigator()
function AuthStack(){

    return (
        <ConsultationProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="main"
                    component={Tab}
                    options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                    }}
                />
                <Stack.Screen
                    name="search"
                    component={Search}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                />  
                <Stack.Screen
                    name="searchByCategories"
                    component={SearchByCategories}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                /> 
                <Stack.Screen
                    name="editProfile"
                    component={EditProfile}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                /> 
                <Stack.Screen
                    name="editLanguage"
                    component={EditLanguage}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                />
                <Stack.Screen
                    name="consultationDetails"
                    component={ConsultationDetails}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                />
                <Stack.Screen
                    name="patientProfileStack"
                    component={PatientProfileStack}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                /> 
                <Stack.Screen
                    name="doctorProfileStack"
                    component={DoctorProfileStack}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}
                /> 
            </Stack.Navigator>              
        </ConsultationProvider>
          
    )
}

export default AuthStack