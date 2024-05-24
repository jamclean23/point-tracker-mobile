import * as SecureStore from 'expo-secure-store';

export default async function saveToken (token) {
    // Fail conditions
    if (!token || !(typeof token === 'string')) {
        return {
            saved: false,
            error: {
                message: 'Token does not exist or is wrong data type. Must be a string.'
            }
        }
    }

    try {
        await SecureStore.setItemAsync('userToken', token);
        return {
            saved: true
        }
    } catch (err) {
        console.log(err);
        return {
            saved: false,
            error: err
        }
    }
}