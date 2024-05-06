// Main App

// ====== IMPORTS ======

import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Components
import Loading from './components/Loading/loading';
import InitScreen from './components/InitScreen/InitScreen';



// ====== FUNCTIONS ======

export default function App() {

  // == State

  const [isLoaded, setIsLoaded] = useState(false);
  const [outLoadTransComplete, setOutLoadTransComplete] = useState(false);
  const renderCounter = useRef(0);

  // == Use Effect



  // DEBUG listen for transition report from loading
  useEffect(() => {
    console.log('Load transition completion:');
    console.log(outLoadTransComplete);
  }, [outLoadTransComplete]);


  // DEBUG send isLoaded event after timer
  useEffect(() => {
    if (!renderCounter.current) {
      renderCounter.current++;
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
    <InitScreen>
      {outLoadTransComplete
        ? <View></View>
        : <Loading isLoaded={isLoaded} reportLoadTransComplete={reportLoadTransComplete}/>
      }
    </InitScreen>
  );
}


// ====== STYLES ======

const styles = StyleSheet.create({
});