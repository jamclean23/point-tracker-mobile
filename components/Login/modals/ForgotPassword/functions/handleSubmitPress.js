// Handle submit attempt

// ====== IMPORTS ======

// React
import { Alert } from "react-native";

// Functions
import Validate from "../../../functions/Validate";
import requestPasswordReset from "../../../../../shared/functions/requestPasswordReset";

// ====== FUNCTIONS/EXPORT ======

/**
 * 
 * @param {String} email 
 * @param {Function} setEmailErr - Displays email error
 * @param {Function} setSubmitting - Sets state for submit status
 * @param {Function} closeModal
 */
export default async function handleSubmitPress (email, setEmailErr, setSubmitting, closeModal) {
    // Disable submit button
    setSubmitting(true);

    // Validate
    const errs = Validate.email(email, { required: true });


    // If errs set errs, otherwise submit request
    if (errs.length) {
        setEmailErr(errs[0]);
    } else {
        setEmailErr();

        try {
            const result = await requestPasswordReset(email);
            console.log(result);
            if ("error" in result && result.error === 'User with email does not exist') {
                Alert.alert('Error', 'User with provided email does not exist.')
            } else if ("error" in result) {
                Alert.alert('Error', 'Trouble contacting server.\nPlease try again or contact an administrator.\n\n' + result.error);
            } else if ("result" in result && result.result === 'success'){
                Alert.alert('Success', 'Password reset email was sent to your inbox.');
                closeModal();
            } else {
                Alert.alert('Error', 'Password reset email was not sent.\nPlease try again or contact an administrator.');
            }

        } catch (err) {
            console.error('An error occurred in handleSubmitPress:', err.message);
            console.error('Error stack trace:', err.stack);
        }
    }

    

    // Enable submit button
    setSubmitting(false);
}