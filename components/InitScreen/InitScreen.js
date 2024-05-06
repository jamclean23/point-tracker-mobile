// Framework component for laoding and auth screens


// ====== IMPORTS ======

import React, { useState } from 'react';
import {ImageBackground, StyleSheet} from 'react-native';


// ====== FUNCTIONS ======

export default function InitScreen (props) {

    // == State

    const [bgBlur, setBgBlur] = useState(10);

    // == Render

    return (
        <ImageBackground resizeMode='cover' style={styles.main} blurRadius={bgBlur} source={require('../../assets/loading-bg.png')}>
            {props.children}
        </ImageBackground>
    );
}


// ====== STYLES ======

const styles = StyleSheet.create({
    main: {
        height: '100%',
    }
});