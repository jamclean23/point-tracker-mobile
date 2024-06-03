// Style for MainScreen

import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        minHeight: 85,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 15,
        gap: 8,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    pointText: {
        color: '#ff002f'
    },
    trackerText: {
        color: 'lightgray'
    },
    map: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    toolbarBtn : {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 80,
        minHeight: 30,
        marginVertical: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: 'lightgray'
    },
    toolbarText: {
        fontWeight: 'bold'
    },
    sitesBtn: {

    },
    pointsBtn: {

    },
    settingsBtn: {

    },
    modal: {
        marginVertical: '5%',
        marginHorizontal: '5%',
        padding: 12,
        flex: 1,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    closeBtnText: {
        fontSize: 16,
    },
    modalCloseBtnWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalCloseBtn: {
        borderColor: 'gray',
        borderWidth: 1,
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical: 8
    },
    modalHeaderText: {
        textAlign: 'center',
        fontSize: 18
    },
    modalContentWrapper: {
        flex: 1,
        paddingVertical: 32
    },
    modalScrollContent: {
        
    },
    modalSubHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'lightgray'
    },
    modalSettingsGroup: {
        borderColor: 'lightgray',
        borderWidth: 3,
        marginBottom: 16
    },
    modalSettingsGroupContent: {
        padding: 32,
        gap: 32
    },
    modalSettingsGroupBtnWrapper: {
        alignItems: 'center'
    },
    modalBtn: {
        backgroundColor: '#ff002f',
        borderRadius: 6,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    modalBtnText: {
        color: 'white',
        fontSize: 18
    }
});