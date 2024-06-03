// Logout function

// ====== IMPORTS ======

// React
import { Alert } from "react-native";

// Functions 
import logout from "../../../shared/functions/logout";

// ====== FUNCTIONS ======

/**
 * 
 * @param {Function} appResetter - Callback function called if token is deleted
 * @returns Boolean true if successful or false if failed
 */
export default function logoutHandler (appResetter) {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
            text: 'Cancel',
            style: 'cancel'
        },
        {
            text: 'Logout',
            onPress: () => { logout(appResetter)}
        }
    ]);

}