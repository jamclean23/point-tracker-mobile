// Logout function

// ====== IMPORTS ======

// React
import { Alert } from "react-native";

// Functions 
import logout from "../../../shared/functions/logout";
import deleteAccount from "../../../shared/functions/deleteAccount";

// ====== FUNCTIONS ======

function confirmAlert (appResetter, userToken) {

    console.log('USER TOKEN ' + userToken);

    Alert.alert('Delete Account', 'This can not be undone. Are you sure you want to DELETE your account?', [
        {
            text: 'Cancel',
            style: 'cancel'
        },
        {
            text: 'DELETE ACCOUNT',
            onPress: async () => { 
                try {
                    await deleteAccount(userToken);
                    logout(appResetter);
                } catch (err) {
                    console.log(err);
                    Alert.alert('Error', 'An error occurred while attempting to delete your account. Please check your connection or contact an administrator.', [
                        {
                            text: 'Dismiss',
                            style: 'cancel'
                        }
                    ])
                }
            }
        }
    ]);
}

/**
 * 
 * @param {Function} appResetter - Callback function called if token is deleted
 * @returns Boolean true if successful or false if failed
 */
export default function deleteAccountHandler (appResetter, userToken) {
    Alert.alert('Delete Account', 'Are you sure you want to DELETE your account?', [
        {
            text: 'Cancel',
            style: 'cancel'
        },
        {
            text: 'DELETE ACCOUNT',
            onPress: () => { confirmAlert(appResetter, userToken) }
        }
    ]);

}