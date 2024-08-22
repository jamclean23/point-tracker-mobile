// Stylesheet for ForgotPassword Modal

// ====== IMPORTS ======

import { StyleSheet } from "react-native";


// ====== EXPORTS ======

export default styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    main: {
        marginTop: 50,
        marginBottom: 20,
        flex: 1,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: 'darkGray',
        borderWidth: 1
    },
    contentWrapper: {
        flex: 1
    },
    contentScrollview: {
        borderRadius: 8,
        marginVertical: 30
    },
    innerContentWrapper: {
        flex: 1,
        marginVertical: 50,
        gap: 50
    },
    inputWrapper: {
        gap: 10
    }
});