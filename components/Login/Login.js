// Component for login form

// ====== IMPORTS ======

import React, { useEffect, useState, useRef} from 'react';
import { Keyboard, Animated, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';


// ====== FUNCTIONS ======

export default function Login () {

    // == STATE

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // == USE EFFECT

    // == FUNCTIONS

    function handleScreenTouch () {
        Keyboard.dismiss();
    }


    // == RENDER
    return (
        <TouchableWithoutFeedback style={{...styles.screenWrapper}} onPress={handleScreenTouch}>
            <Animated.View style={{...styles.mainWrapper}}>
                <View style={{...styles.main}}>

                    {/* Header */}
                    <Text style={{...styles.header}}>Login</Text>

                    {/* Scrollable Form */}
                    <View style={{...styles.loginScrollWrapper}}>
                        <ScrollView style={{...styles.scrollLoginForm}}>

                            {/* Username */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Username</Text>
                                <TextInput style={{...styles.formInput}}/>
                            </View>

                            {/* Password */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Password</Text>
                                <TextInput style={{...styles.formInput}} secureTextEntry={true}/>
                            </View>

                            {/* Login Button */}
                            <View>
                                <View style={{...styles.defaultBtnWrapper, ...styles.loginBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.defaultBtn}}>
                                        <Text style={{...styles.defaultBtnText}}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Border */}
                            <View style={{...styles.borderContainer}}>
                                <View style={{...styles.borderLine}}></View>
                                <Text>OR</Text>
                                <View style={{...styles.borderLine}}></View>
                            </View>

                            {/* OR section */}
                            <View style={{...styles.orSection}}>
                                {/* Request Access Btn */}
                                <View style={{...styles.defaultBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.defaultBtn}}>
                                        <Text style={{...styles.defaultBtnText}}>Request Access</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}


// ====== STYLES ======

const styles = StyleSheet.create({
    mainWrapper: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    main: {
        marginTop: 50,
        marginBottom: 20,
        flex: 1,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: 'darkGray',
        borderWidth: 1
    },
    header: {
        textAlign: 'center',
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
        paddingVertical: 5,
        fontSize: 18,
        opacity: .8
    },
    loginScrollWrapper: {
        flex: 2,
    },
    scrollLoginForm: {
        borderRadius: 8,
        marginVertical: 30
    },
    inputWrapper: {
        alignItems: 'stretch',
        gap: 10,
        marginVertical: 20
    },
    formLabel: {
        textAlign: 'center',
        fontSize: 18
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'darkgray',
        borderRadius: 4,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 1,
        textAlign: 'center'
    },
    orSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 50
    },
    borderLine: {
        borderTopColor: 'darkgray',
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 15
    },
    defaultBtnWrapper: {
        alignItems: 'center'
    },
    defaultBtn: {
        backgroundColor: '#ff002f',
        borderRadius: 6,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    defaultBtnText: {
        color: 'white',
        fontSize: 18
    },
    loginBtnWrapper: {
        marginTop: 25
    },
    screenWrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    }
})