// Styles for InitScreen.js

// ====== IMPORTS ======

import { StyleSheet } from "react-native";

// ====== FUNCTIONS ======



export default function buildStyles (Dimensions) {
    return StyleSheet.create({
        main: {
            height: '100%'
        },
        loading: {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bgImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: Dimensions.get('screen').height || '100%',
        },
        childrenContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
        }
    });
}