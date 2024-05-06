// Main App

// ====== IMPORTS ======

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Components
import Loading from './components/Loading/loading';
import InitScreen from './components/InitScreen/InitScreen';



// ====== FUNCTIONS ======

export default function App() {


  // == Render
  return (
    <InitScreen>
      <Loading/>
    </InitScreen>
  );
}


// ====== STYLES ======

const styles = StyleSheet.create({
});