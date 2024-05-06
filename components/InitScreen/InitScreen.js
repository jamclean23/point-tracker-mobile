// Framework component for laoding and auth screens


// ====== IMPORTS ======

import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import { AppLoading } from 'expo';

// ====== FUNCTIONS ======

export default function InitScreen (props) {

    // == State

    const [bgBlur, setBgBlur] = useState(10);
    const [bgLoaded, setBgLoaded] = useState(false);
    const [bgImage, setBgImage] = useState(require('../../assets/loading-bg.png'));


    // == Functions

    function handleBgLoad () {
        setBgLoaded(true);
    }


    // == Render

    return (
        <ImageBackground onLoad={handleBgLoad} resizeMode='cover' style={styles.main} blurRadius={bgBlur} source={require('../../assets/loading-bg.png')}>
            {bgLoaded
                ? props.children
                : null
            }
        </ImageBackground>
    );
}


// ====== STYLES ======

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    loading: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});