// Styles for loading.js


// ====== IMPORTS ======

import { StyleSheet } from "react-native"


// ====== FUNCTIONS ======

export default StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainGradient: {
        position: 'absolute',
        height: '140%',
        resizeMode: 'stretch'
    },
    compass: {
        height: 100,
        resizeMode: 'contain'
    },
    mainContainer: {
        height: '33%'    },
    compassContainer: {
        justifyContent: 'center'
    },
    logoContainer: {
        paddingTop: 60,
        paddingHorizontal: 60,
        width: '100%'
    },
    logo: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    pointText: {
        color: '#ff002f',
        marginRight: 20,
    },
    trackerText: {
        color: 'lightgray',
        alignSelf: 'flex-end',
    },
    logoText: {
        fontSize: 60,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, .8)',
        textShadowOffset: { width: 0, height: 0},
        textShadowRadius: 10   
    },
    pointWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loadingText: {
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    }
});