// Stylesheet for EmailVerify Modal

// ====== IMPORTS ======

import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,.7)',
        minHeight: '100%',
        paddingTop: '10%',
        paddingBottom: '5%',
        paddingHorizontal: '5%'
    },
    main: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 8,
        paddingVertical: 20
    },
    header: {
        textAlign: 'center',
        fontSize:  20,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    scrollView: {
        paddingTop: '10%',
        paddingHorizontal: '10%'
    },
    contentWrapper: {
        gap: 50
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#ff002f',
        borderRadius: 6,
        paddingHorizontal: 50,
        paddingVertical: 10   
    },
    disabledBtn: {
        backgroundColor: 'gray'
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    message: {
        fontSize: 16
    }
});