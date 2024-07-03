// Screen to be render when user is authenticated

// ====== IMPORTS ======

import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";

// Functions
import handleModalOpenClick from "./functions/handleModalOpenClick";
import handleModalClose from "./functions/handleModalClose";
import renderMapMessages from "./functions/renderMapMessages";
import handleLoad from "./functions/handleLoad";
import renderMapMarkers from "./functions/renderMapMarkers";
import updateMap from "./functions/updateMap";

// Components
import Settings from "./modals/Settings/Settings";
import Sites from "./modals/sites/Sites";
import Points from "./modals/points/Points";


// ====== FUNCTIONS ======

export default function MainScreen (props) {

    // == STATE

    const [showSettings, setShowSettings] = useState(false);
    const [showSites, setShowSites] = useState(false);
    const [showPoints, setShowPoints] = useState(false);


    const [region, setRegion] = useState({
        latitude: 28.531960001731047,
        longitude: -98.4955169,
        latitudeDelta: 20,
        longitudeDelta: 0
    });
    const [sites, setSites] = useState([]);
    const [currentSite, setCurrentSite] = useState();
    const [points, setPoints] = useState([]);
    const [mapContentType, setMapContentType] = useState('satellite');

    const mapRef = useRef();

    // == USE EFFECT

    // Debug
    useEffect(() => {
    }, [points]);

    // On currentSiteChange
    useEffect(() => {
        if (currentSite) {
            updateMap(mapRef, currentSite, props.userToken, setPoints);
        } 
    }, [currentSite]);

    // On mount
    useEffect(() => {
        handleLoad(setSites, props.userToken);
    }, []);


    // == RENDER

    return (
        <Animated.View 
            style={styles.main}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={{...styles.headerText, ...styles.pointText}}>Point</Text>
                <Text style={{...styles.headerText, ...styles.trackerText}}>Tracker</Text>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map}
                    initialRegion={region}
                    ref={mapRef}
                    rotateEnabled={false}
                    mapType={mapContentType}
                >
                    {renderMapMarkers(currentSite, points)}
                </MapView>
                <View 
                    style={styles.messageContainer}
                >
                    {renderMapMessages(currentSite, sites, points, mapRef)}
                </View>
            </View>

            {/* Toolbar */}
            <View style={styles.toolbar}>

                {/* Find new site btn */}
                <TouchableOpacity 
                    style={{
                        ...styles.toolbarBtn,
                        ...(()=> {
                            if (sites.length) {
                                return {}
                            } else {
                                return styles.disabledBtn
                            }
                        })()
                    }}
                    disabled={!sites.length}
                    onPress={() => {handleModalOpenClick(setShowSites)}}
                >
                    <Text style={{...styles.toolbarText}}>Sites</Text>
                </TouchableOpacity>

                {/* Pick control point in this site */}
                <TouchableOpacity 
                    style={{
                        ...styles.toolbarBtn,
                        ...(() => {
                            if (points.length) {
                                return {}
                            } else {
                                return styles.disabledBtn
                            }
                        })()
                    }}
                    disabled={!points.length}
                    onPress={() => {handleModalOpenClick(setShowPoints)}}
                >
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
                userToken={props.userToken}
                mapContentType={mapContentType}
                setMapContentType={setMapContentType}
            />

            <Sites
                showSites={showSites}
                setShowSites={setShowSites}
                handleModalClose={handleModalClose}
                sites={sites}
                setCurrentSite={setCurrentSite}
            />

            <Points
                showPoints={showPoints}
                setShowPoints={setShowPoints}
                handleModalClose={handleModalClose}
                points={points}
                mapRef={mapRef}
            />
        </Animated.View>
    );

}
