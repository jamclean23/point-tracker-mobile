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
    mapContainer: {
        flex: 1
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
        height: '100%',
        width: '100%'
    },
    modalView: {
        paddingVertical: '5%',
        paddingHorizontal: '5%',
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
        paddingTop: 8
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
    },
    disabledBtn: {
        backgroundColor: 'gray'
    },
    messageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        alignItems: 'center',
        width: '100%'
    },
    message: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1
    },
    messageText: {
        fontSize: 18
    },
    // Sites Modal
    siteEntry: {
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 32,
        paddingVertical: 8
    },
    opText: {
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: 'bold'
        },
    sortMethodInfo: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    // Sites searchbar
    searchBarWrapper: {
        flexDirection: 'row',
    },
    sitesSearchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 4,
        flex: 1
    },
    sortBtn: {
        backgroundColor: 'lightgray',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    sortBtnText: {
        fontSize: 24
    },
    sortMenu: {
        top: '100%',
        right: 0,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 1,
        borderColor: 'gray',
        borderWidth: 1,
    },
    sortMenuBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray'
    },
    sortMenuBtnText: {
        fontSize: 18,
        textAlign: 'center'
    },
    sortMenuSubHeader: {
        paddingVertical: 8,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});