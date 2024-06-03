// Screen to be render when user is authenticated

// ====== IMPORTS ======

import React, { useState, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";

// Functions
import handleModalOpenClick from "./functions/handleModalOpenClick";
import handleModalClose from "./functions/handleModalClose";

// Components
import Settings from "./modals/Settings";


// ====== FUNCTIONS ======

export default function MainScreen (props) {

    // == STATE

    const [showSettings, setShowSettings] = useState(false);

    // == USE EFFECT

    // Debug
    useEffect(() => {
    }, [showSettings]);

    // == RENDER

    return (
        <Animated.View style={styles.main}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={{...styles.headerText, ...styles.pointText}}>Point</Text>
                <Text style={{...styles.headerText, ...styles.trackerText}}>Tracker</Text>
            </View>

            {/* Map */}
            <MapView style={styles.map}/>

            {/* Toolbar */}
            <View style={styles.toolbar}>

                {/* Find new site */}
                <TouchableOpacity style={{...styles.toolbarBtn}}>
                    <Text style={{...styles.toolbarText}}>Sites</Text>
                </TouchableOpacity>

                {/* Pick control point in this site */}
                <TouchableOpacity style={{...styles.toolbarBtn}}>
                    <Text style={{...styles.toolbarText}}>Points</Text>
                </TouchableOpacity>

                {/* Settings */}
                <TouchableOpacity 
                    style={{...styles.toolbarBtn}}
                    onPress={() => {handleModalOpenClick(setShowSettings)}}
                >
                    <Text style={{...styles.toolbarText}}>Settings</Text>
                </TouchableOpacity>

            </View>

            <Settings 
                showSettings={showSettings} 
                setShowSettings={setShowSettings}
                handleModalClose={handleModalClose}
                resetApp={props.resetApp} 
            />

        </Animated.View>
    );

}
