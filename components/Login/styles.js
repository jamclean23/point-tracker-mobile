// Styles for Login screen

// ====== IMPORTS ======

import { StyleSheet } from "react-native";


// ====== EXPORTS ======

export default StyleSheet.create({
    testBorder: {
        borderColor: 'yellow',
        borderWidth: 2
    },
    mainWrapper: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
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
    header: {
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        opacity: .8
    },
    backArrow: {
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        paddingHorizontal: 10,
        top: 0,
        bottom: 0
    },
    backArrowText: {
        borderColor: 'yellow',
        borderWidth: 3,
        fontSize: 36
    },
    loginScrollWrapper: {
        flex: 1,
    },
    scrollLoginForm: {
        borderRadius: 8,
        marginVertical: 30
    },
    inputWrapper: {
        alignItems: 'stretch',
        gap: 5,
        marginVertical: 5
    },
    formLabel: {
        textAlign: 'center',
        fontSize: 18
    },
    formErr: {
        textAlign: 'center',
        fontSize: 14,
        color: 'red',
        marginBottom: 30,
        marginHorizontal: 20
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'darkgray',
        borderRadius: 4,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        paddingVertical: 1
    },
    orSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 100
    },
    borderLine: {
        borderTopColor: 'darkgray',
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 15,
        opacity: .3
    },
    defaultBtnWrapper: {
        alignItems: 'center'
    },
    defaultBtn: {
        backgroundColor: '#ff002f',
        borderRadius: 6,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    defaultBtnText: {
        color: 'white',
        fontSize: 18
    },
    loginBtnWrapper: {
        marginTop: 25
    },
    screenWrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    reqAccScrollWrapper: {
        flex: 1
    },
    scrollReqAccForm: {
        borderRadius: 8,
        marginVertical: 30
    },
    descriptionText: {
        paddingHorizontal: 50,
        fontSize: 16,
        marginBottom: 30
    },
    disabledBtn: {
        backgroundColor: 'gray'
    },
    forgotPasswordBtn: {
        paddingHorizontal: 50,
        paddingVertical: 10
    }
});