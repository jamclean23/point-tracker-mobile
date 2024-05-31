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

    }
});