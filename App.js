// Main App

// ====== IMPORTS ======

import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Components
import Loading from './components/Loading/loading';
import InitScreen from './components/InitScreen/InitScreen';
import Login from './components/Login/Login';
import MainScreen from './components/MainScreen/MainScreen';

// Functions
import retrieveToken from './shared/functions/retrieveToken';
import deleteToken from './shared/functions/deleteToken';
import validateUserToken from './shared/functions/validateUserToken';


// ====== FUNCTIONS ======

export default function App() {

    // == State

    const [isLoaded, setIsLoaded] = useState(false);
    const [outLoadTransComplete, setOutLoadTransComplete] = useState(false);
    const [outLoginTransComplete, setOutLoginTransComplete] = useState(false);
    const [outInitTransComplete, setOutInitTransComplete] = useState(false);
    const renderCounter = useRef(0);
    const [currentScreen, setCurrentScreen] = useState('init');
    const [shouldShowInit, setShouldShowInit] = useState(true);

    // Auth
    const [userToken, setUserToken] = useState('');
    const [userValid, setUserValid] = useState(false);
    const [user, setUser] = useState();



    // == Use Effect


    // Load events
    useEffect(() => {
        if (!renderCounter.current) {
            renderCounter.current++;
            handleLoad();
        }
    }, []);

    // InitScreen out transitions complete
    useEffect(() => {

        // Once transition complete, set main as the new page and reset state
        if (outInitTransComplete) {
            setCurrentScreen('main');
            setOutInitTransComplete(false);
        }

    }, [outInitTransComplete]);

    
    // == Functions
    
    function reportLoadTransComplete () {
        setOutLoadTransComplete(true);
    }
    
    function reportLoginTransComplete () {
        setOutLoginTransComplete(true);
        resetState();
        handleLoad();
    }

    function resetApp () {
        resetState();
        handleLoad();
    }

    function resetState () {
        setIsLoaded(false);
        setOutLoadTransComplete(false);
        setOutLoginTransComplete(false);
        renderCounter.current = 0;
        setUserToken('');
        setUserValid(false);
        setUser();
        setShouldShowInit(true);
        setOutInitTransComplete(false);
        setCurrentScreen('init')
    }

    async function handleLoad () {
        let result = {};    

        try {
            result = await retrieveToken();
        } catch (err) {
            console.log(err);
        }
        if ('token' in result && result.token) {
            setUserToken(result.token);
            try {
                const validationResult    = await validateUserToken(result.token);
                
                // Set the user and user validity 
                if (validationResult && 'user' in validationResult) {
                        setUserValid(true);
                        setUser(validationResult.user);
                } else {
                    // If the validation attempt did not return a user, delete the token. This will force the client to request a new jwt.
                    try {
                        await deleteToken();
                    } catch (err) {
                        console.log(err);
                    }
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('NO TOKEN FOUND');
        }


        // DEBUG TIMER
        setTimeout(() => {
            setIsLoaded(true)
        }, 1000);
    }

    // == Render
        return (
            <View style={styles.mainWrapper}>
                {(() => { 
                    switch (currentScreen) {

                        // INITALIZATION SCREEN
                        // Includes loading and login, proceeds to main screen after login
                        case 'init':
                            return <InitScreen shouldShowInit={shouldShowInit} setShouldShowInit={setShouldShowInit} setOutInitTransComplete={setOutInitTransComplete}>
                                    {(() => {
                                        if (!outLoadTransComplete) { // If the loading screen hasn't reported it's finished, render it
                                            
                                            // LOADING SCREEN
                                            // Changing isLoaded to true will trigger loading end animations
                                            // The Loading component will set outLoadTransComplete to true when loading end animations are finished
                                            return <Loading isLoaded={isLoaded} reportLoadTransComplete={reportLoadTransComplete}/>
                                            
                                        } else { // After loading finished, decide next route based on JWT status
                                            if (!userValid) { // User validation was unsuccessful, proceed to login form
                                                
                                                // TODO
                                                // LOGIN FORM
                                                return <Login reportLoginTransComplete={reportLoginTransComplete}/>
                                                
                                            } else if (shouldShowInit) {
                                                setShouldShowInit(false);
                                            }
                                        }
                                    })()}
                                </InitScreen>

                        // MAIN SCREEN
                        case 'main':
                            return <MainScreen userToken={userToken} resetApp={resetApp}/>
                    }
                })()}
            </View>

        );
    }


// ====== STYLES ======

const styles = StyleSheet.create({
    mainWrapper: {
        height: '100%',
        width: '100%'
    }
});