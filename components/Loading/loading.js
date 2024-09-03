// Loading screen

// ====== IMPORTS ======

// React
import React, { useState, useRef, useEffect } from 'react';
import {
    Animated, 
    Easing, 
    View, 
    Text, 
    Image, 
} from 'react-native';

// Styling
import styles from './styles';


// ====== FUNCTIONS ======

export default function Loading (props) {
    

    // == State

    // Logo text translate animation
    const textAnim = useRef(new Animated.Value(1)).current; // Amount logo text will be offset at start of animation

    const textAnimDuration = 1500;

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
    const spinAnim = useRef(new Animated.Value(0)).current;

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

    // isLoaded Listener
    useEffect(() => {
        if (props.isLoaded) {
            startOutTransitions();
        }
    }, [props.isLoaded]);


    // == Functions

    async function startOutTransitions () {
        await startOutTextAnim();
        props.reportLoadTransComplete();
    }

    function handleLogoTextAnim () {
        Animated.timing(
            textAnim, {
                toValue: 0,
                duration: textAnimDuration,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp)
            }
        ).start();
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

    function startOutTextAnim () {
        return new Promise((resolve) => {
            Animated.timing(
                textAnim, {
                    toValue: 1,
                    duration: textAnimDuration,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.exp)
                }
            ).start(resolve);
        });
    }


    // == Render
    
    return (
        <View style={styles.main}>
            <View style={{...styles.mainContainer, ...styles.logoContainer}}>
                <Animated.Image style={{...styles.mainGradient, opacity: textOpacAmount}} source={require('../../assets/gradient.png')}/>
                <View style={styles.pointWrapper}>
                    <Animated.Text style={{...styles.pointText, ...styles.logoText, transform:[{translateX: pointTextAmount}], opacity: textOpacAmount}}>Point</Animated.Text>
                    <Animated.Image style={{...styles.logo, opacity: textOpacAmount}} source={require('../../assets/point-tracker-logo.png')}/>
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
