import * as SecureStore from 'expo-secure-store';

export default async function deleteToken () {
    try {
        await SecureStore.deleteItemAsync('userToken');
    } catch (err) {
        console.log(err);
        throw new Error('Token not deleted');
    }
}