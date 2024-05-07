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


// ====== FUNCTIONS ======

export default function App() {

  // == State

  const [isLoaded, setIsLoaded] = useState(false);
  const [outLoadTransComplete, setOutLoadTransComplete] = useState(false);
  const renderCounter = useRef(0);
  const [currentScreen, setCurrentScreen] = useState('init');

  // Auth
  const [userJwt, setUserJwt] = useState();
  const [userValid, setUserValid] = useState(false);


  // == Use Effect

  // DEBUG listen for transition report from loading
  useEffect(() => {
    console.log('Load transition completion:');
    console.log(outLoadTransComplete);
  }, [outLoadTransComplete]);


  // Load events
  useEffect(() => {
    if (!renderCounter.current) {
      renderCounter.current++;

      // TODO Find json web token and store in state

      // TODO fetch request to validate, update validity in state

      // DEBUG TIMER
      setTimeout(() => {
        setIsLoaded(true)
      }, 6000);

    }
  }, []);


  // == Functions

  function reportLoadTransComplete () {
    setOutLoadTransComplete(true);
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
                      console.log('LOADING SCREEN');
                      return <Loading isLoaded={isLoaded} reportLoadTransComplete={reportLoadTransComplete}/>
                      
                    } else { // After loading finished, decide next route based on JWT status
                      if (!userValid) { // User validation was unsuccessful, proceed to login form
                        
                        // TODO
                        // LOGIN FORM
                        console.log('LOGIN SCREEN');
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