// Send a request to the server to send the verification email. Disable the send link 

// ====== IMPORTS ======

import { Alert } from "react-native";

// Functions
import startResendTimer from "./startResendTimer";

//  ====== FUNCTIONS ======

export default async function sendEmail (
    setEmailRequestOngoing, 
    emailAuthToken, 
    resendTimer, 
    setResendTimer, 
    setEmailSent,
    closeModal
    ) {
    // Fail Conditions
    if (!emailAuthToken) {
        return;
    }

    setEmailRequestOngoing(true);

    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 16000);

    let requestResult;

    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/send_verification_email`, {
            headers: {
                Authorization: `Bearer: ${emailAuthToken}`
            },
            signal
        });

        const result = await response.json();

        if ("result" in result) {
            switch (result.result) {
                case 'sent':
                    setEmailSent(true);
                    startResendTimer(setResendTimer);
                    break;
                case 'expired':
                    Alert.alert("Session Expired, please login again to continue");
                    closeModal();
                    break
            }
        } else {
            throw new Error("Bad response from server");
        }

        clearTimeout(id);
    } catch (err) {
        console.log(err);
        Alert.alert("Error", "An error occured while contacting the server.")
        clearTimeout(id);
    }
    


    setEmailRequestOngoing(false);
}