// Stack navigator for login

// ====== IMPORTS/INIT ======

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// Components
import Login from "../../components/Login/Login";
import RequestAccess from "../../components/RequestAccess/RequestAccess";

// ====== FUNCTIONS ======

export default function LoginStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{
                    presentation: 'transparentModal',
                    cardStyle: {backgroundColor: 'transparent'},
                    cardOverlayEnabled: true
                }}
            />
            <Stack.Screen name="RequestAccess" component={RequestAccess}/>
        </Stack.Navigator>
    );
}