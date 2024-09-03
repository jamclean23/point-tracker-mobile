// Framework component for laoding and auth screens


// ====== IMPORTS ======

import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Easing, Dimensions } from 'react-native';

import buildStyles from './styles';
const styles = buildStyles(Dimensions);

// ====== FUNCTIONS ======

export default function InitScreen (props) {

    // == State

    const [bgBlur, setBgBlur] = useState(5);
    const [bgLoaded, setBgLoaded] = useState(false);


    // == Animations

    const bgAnim = useRef(new Animated.Value(1)).current;
    const bgAnimDuration = 1000;
    const bgOpac = bgAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    // == Use Effect

    useEffect(() => {

        // Start out animations if shouldShowInit is set to false
        if (!props.shouldShowInit) {
            handleOutAnimations();
        }
    }, [props.shouldShowInit]);


    // == Functions

    function handleBgLoad () {
        setBgLoaded(true);
    }

    function handleOutAnimations () {
        Animated.timing(
            bgAnim, {
                toValue: 0,
                duration: bgAnimDuration,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp)
            }
        ).start(() => {
            props.setOutInitTransComplete(true);
        });
    }

    // == Render

    return (
        <View style={styles.main}>
            <Animated.Image onLoad={handleBgLoad} resizeMode='cover' style={{...styles.bgImage, opacity: bgOpac}} blurRadius={bgBlur} source={require('../../assets/loading-bg.png')}/>
            <View style={styles.childrenContainer}>
                {bgLoaded
                    ? props.children
                    : null
                }
            </View>
        </View>
    );
}


// ====== STYLES ======

// const styles = StyleSheet.create({
//     main: {
//         height: '100%'
//     },
//     loading: {
//         height: '100%',
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     bgImage: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: Dimensions.get('screen').height || '100%',
//     },
//     childrenContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         height: '100%',
//         width: '100%'
//     }
// });