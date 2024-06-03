// Handler for connection test button

// ====== IMPORTS ======

// React
import { Alert } from "react-native";

// Functions
import ping from "../../../shared/functions/ping";

// ====== FUNCTIONS ======

export default async function pingHandler (setPinging) {
    try {   
        setPinging(true);
        const pingTime = await ping();
        setPinging(false);
        Alert.alert('Connection Test', `Connection to server successful. \nPing: ${pingTime}`);
    } catch (err) {
        setPinging(false);
        console.log(err);
        Alert.alert('Connection Test', 'Connection to server was unsuccesful. Please check your connection or contact an administrator.');
    }
}