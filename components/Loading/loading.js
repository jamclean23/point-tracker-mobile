// Loading screen

// ====== IMPORTS ======

import React, { useState, useRef, useEffect } from 'react';
import {Animated, Easing, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';


// ====== FUNCTIONS ======

export default function Loading () {
    

    // == State
    
    const [isLoaded, setIsLoaded] = useState(false);

    // Spinner animation
    const spinAnim = new Animated.Value(0);

    const spinDegrees = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['45deg', '404deg']
    });


    // == UseEffect

    useEffect(() => {
        handleSpinAnim();
    }, []);

    useEffect(() => {

        if (isLoaded) {
            handleIsLoaded();
        }

    }, [isLoaded]);

    // == Functions

    function handleIsLoaded () {
        stopSpinAnim();
    }

    function handleSpinAnim () {
        Animated.loop(
            Animated.timing(
                spinAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                    easing: Easing.elastic(1)
                }
            )
        ).start(() => {
            spinAnim.setValue(0);
        });
    }

    async function stopSpinAnim () {

        // TEST TIMER TO SIMULATE LOAD TIMES
        await (() => {
            return new Promise((resolve) => {
                setTimeout(resolve, 4000);
            });
        })();

        Animated.timing(spinAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.elastic(1)
        }).start();
    }


    // == Render
    
    return (
        <View style={styles.main}>
            <View style={{...styles.mainContainer, ...styles.logoContainer}}>
                <View style={styles.pointWrapper}>
                    <Animated.Text style={{...styles.pointText, ...styles.logoText}}>Point</Animated.Text>
                    <Image style={styles.logo} source={require('../../assets/point-tracker-logo.png')}/>
                </View>
                <Animated.Text style={{...styles.trackerText, ...styles.logoText}}>Tracker</Animated.Text>
            </View>
            
            <View style={{...styles.mainContainer, ...styles.compassContainer}}>
                <Animated.View style={{transform:[{rotate:spinDegrees}]}}>
                    <Image style={styles.compass} source={require('../../assets/compass.png')}/>
                </Animated.View>
            </View>

            <View style={styles.mainContainer}>

            </View>
        </View>
    );
}


//  ====== STYLES ======

const styles = StyleSheet.create({
    main: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',

    },
    logo: {
        height: 60,
        width: 60,
        opacity: .8,
        resizeMode: 'contain'
    },
    pointText: {
        color: '#ff002f',
        marginRight: 20,
    },
    trackerText: {
        color: '#b4bbc2',
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
    }
});
