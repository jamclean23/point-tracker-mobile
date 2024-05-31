// Framework component for laoding and auth screens


// ====== IMPORTS ======

import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Animated, View, Dimensions } from 'react-native';

// ====== FUNCTIONS ======

export default function InitScreen (props) {

    // == State

    const [bgBlur, setBgBlur] = useState(5);
    const [bgLoaded, setBgLoaded] = useState(false);

    // == Functions

    function handleBgLoad () {
        setBgLoaded(true);
    }


    // == Render

    return (
        <View style={styles.main}>
            <Animated.Image onLoad={handleBgLoad} resizeMode='cover' style={styles.bgImage} blurRadius={bgBlur} source={require('../../assets/loading-bg.png')}/>
            <View>
                {bgLoaded
                    ? props.children
                    : null
                }
            </View>
        </View>
    );
}


// ====== STYLES ======

const styles = StyleSheet.create({
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
    }
});