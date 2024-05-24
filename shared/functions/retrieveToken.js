import * as SecureStore from 'expo-secure-store';

export default async function retrieveToken () {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        return {
            retrieved: true,
            token
        }
    } catch (err) {
        console.log(err);
        return {
            retrieved: false,
            error: err
        }
    }
}