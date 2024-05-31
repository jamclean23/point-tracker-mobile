// Screen to be render when user is authenticated

// ====== IMPORTS ======

import React, { useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";


// ====== FUNCTIONS ======

export default function MainScreen (props) {

    // == STATE

    // == USE EFFECT

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
                    <Text style={{...styles.toolbarText}}>New Site</Text>
                </TouchableOpacity>

                {/* Pick control point in this site */}
                <TouchableOpacity style={{...styles.toolbarBtn}}>
                    <Text style={{...styles.toolbarText}}>Points</Text>
                </TouchableOpacity>

                {/* Settings */}
                <TouchableOpacity style={{...styles.toolbarBtn}}>
                    <Text style={{...styles.toolbarText}}>Settings</Text>
                </TouchableOpacity>

            </View>

        </Animated.View>
    );

}
