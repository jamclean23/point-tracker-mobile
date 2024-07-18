// Listener for email verification

// ====== IMPORTS ======

import { Alert } from 'react-native';

import sleep from '../../../../../shared/functions/sleep';

// ====== FUNCTIONS ======
/**
 * 
 * @param {String} emailAuthToken 
 * @param {Object} shouldListenForVerifyRef 
 * @param {Function} closeModal 
 */
export default async function verifyListener (emailAuthToken, shouldListenForVerifyRef, closeModal) {
    await sleep(2000);
    
    const controller = new AbortController;
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);
    
    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/query_verified`, {
            headers: {
                Authorization: `Bearer: ${emailAuthToken}`
            },
            signal
        });

        const result = await response.json();
        
        if ("verified" in result && result.verified) {
            Alert.alert("Success", "Your email was verified, please log in to continue.")
            closeModal();
        }

        if ("status" in result && result.status === 'expired') {
            Alert.alert("Login Expired", "Your session has expired, please log in to continue.");
            closeModal();
        }

        clearTimeout(id);
    } catch (e) {
        clearTimeout(id);
        console.log('Error in listener');
        console.log(e);
    }
    
    if (shouldListenForVerifyRef.current) {
        verifyListener(emailAuthToken, shouldListenForVerifyRef, closeModal);
    }
}