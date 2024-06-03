// Logout function

// ====== IMPORTS ======

// React
import { Alert } from "react-native";

// Functions 
import deleteToken from "../../../shared/functions/deleteToken";


// ====== FUNCTIONS ======

/**
 * 
 * @param {Function} appResetter - Callback function called if token is deleted
 * @returns Boolean true if successful or false if failed
 */
export default function logout (appResetter) {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
            text: 'Cancel',
            style: 'cancel'
        },
        {
            text: 'Logout',
            onPress: async () => {
                try {
                    await deleteToken();
                    if (appResetter && typeof appResetter === 'function') {
                        appResetter();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    ]);

}