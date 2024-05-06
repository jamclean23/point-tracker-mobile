// Loading screen

// ====== IMPORTS ======

import React, { useState, useRef, useEffect } from 'react';
import {Animated, Easing, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';


// ====== FUNCTIONS ======

export default function Loading () {
    

    // == State
    
    const [isLoaded, setIsLoaded] = useState(false);

    // Logo text translate animation
    const textAnim = new Animated.Value(1); // Amount logo text will be offset at start of animation

    const pointTextAmount = textAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100]
    });

    const trackerTextAmount = textAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    const textOpacAmount = textAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    // Spinner animation
    const spinAnim = new Animated.Value(0);

    const spinDegrees = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['45deg', '404deg']
    });


    // == UseEffect

    // Start animations on mount
    useEffect(() => {
        handleSpinAnim();
        handleLogoTextAnim();
    }, []);

    // Handle load event
    useEffect(() => {

        if (isLoaded) {
            handleIsLoaded();
        }

    }, [isLoaded]);


    // == Functions

    function handleLogoTextAnim () {
        Animated.timing(
            textAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp)
            }
        ).start(() => {
            
        });
    }

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
                <Image style={styles.mainGradient} source={require('../../assets/gradient.png')}/>
                <View style={styles.pointWrapper}>
                    <Animated.Text style={{...styles.pointText, ...styles.logoText, transform:[{translateX: pointTextAmount}], opacity: textOpacAmount}}>Point</Animated.Text>
                    <Image style={styles.logo} source={require('../../assets/point-tracker-logo.png')}/>
                </View>
                <Animated.Text style={{...styles.trackerText, ...styles.logoText, transform:[{translateX: trackerTextAmount}], opacity: textOpacAmount}}>Tracker</Animated.Text>
            </View>
            
            <Animated.View style={{...styles.mainContainer, ...styles.compassContainer, opacity: textOpacAmount}}>
                <Animated.View style={{transform:[{rotate:spinDegrees}]}}>
                    <Image style={styles.compass} source={require('../../assets/compass.png')}/>
                </Animated.View>
                <Text style={styles.loadingText}>Loading</Text>
            </Animated.View>

            <View style={styles.mainContainer}>

            </View>
        </View>
    );
}


//  ====== STYLES ======

const styles = StyleSheet.create({
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
    },
    loadingText: {
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    }
});
