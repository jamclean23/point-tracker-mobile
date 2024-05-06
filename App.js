// Main App

// ====== IMPORTS ======

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Components
import Loading from './components/Loading/loading';
import InitScreen from './components/InitScreen/InitScreen';



// ====== FUNCTIONS ======

export default function App() {
  return (
    <InitScreen>
      <Loading/>
    </InitScreen>
  );
}


// ====== STYLES ======

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});