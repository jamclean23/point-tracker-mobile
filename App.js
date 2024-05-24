// Main App

// ====== IMPORTS ======

import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Components
import Loading from './components/Loading/loading';
import InitScreen from './components/InitScreen/InitScreen';
import Login from './components/Login/Login';

// Functions
import retrieveToken from './shared/functions/retrieveToken';


// ====== FUNCTIONS ======

export default function App() {

  // == State

  const [isLoaded, setIsLoaded] = useState(false);
  const [outLoadTransComplete, setOutLoadTransComplete] = useState(false);
  const renderCounter = useRef(0);
  const [currentScreen, setCurrentScreen] = useState('init');

  // Auth
  const [userToken, setUserToken] = useState('');
  const [userValid, setUserValid] = useState(false);


  // == Use Effect

  // DEBUG listen for transition report from loading
  useEffect(() => {
  }, [outLoadTransComplete]);


  // Load events
  useEffect(() => {
    if (!renderCounter.current) {
      renderCounter.current++;

      handleLoad();
      
    }
  }, []);
  
  
  // == Functions
  
  function reportLoadTransComplete () {
    setOutLoadTransComplete(true);
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
      console.log('USER TOKEN:', '\n', result.token);
    } else {
      console.log('NO TOKEN FOUND');
    }

    // DEBUG TIMER
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000);
  }

  // == Render
    return (
      <View style={styles.mainWrapper}>
        {(() => { 
          switch (currentScreen) {

            // INITALIZATION SCREEN
            // Includes loading and login, proceeds to main screen after login
            case 'init':
              return <InitScreen>
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
                        return <Login />
                        
                      } else {
                        
                        // TODO
                        // DISPLAY MAIN APP
                        // Set current screen to main
                      }
                    }
                  })()}
                </InitScreen>

            // MAIN SCREEN
            case 'main':
              return
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