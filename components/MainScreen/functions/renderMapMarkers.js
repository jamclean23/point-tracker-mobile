// Renders map markers for the current site and corresponding points

// ====== IMPORTS ======

// React
import React from 'react';
import { Text } from 'react-native';
import { Marker, Circle, Callout } from 'react-native-maps';

// Keygen
import uuid from 'react-native-uuid';

// Functions
import getSiteDiameter from './getSiteDiameter';

// ====== FUNCTIONS ======

export default function renderMapMarkers (currentSite, points) {
    const mapMarkers = [];
    
    if (currentSite) {
        mapMarkers.push(
            <Circle
                key={uuid.v4()}
                center={{
                    latitude: +currentSite.lat,
                    longitude: +currentSite.long,
                }}
                radius={calculateRadius(currentSite, points)}
                strokeColor='rgba(0, 0, 255, 0.58)'
                fillColor='rgba(0, 0, 255, 0.3)'
            />
        );
    }

    if (Array.isArray(points) && points.length) {
        points.forEach((point) => {
            mapMarkers.push(
                <Marker
                    key={uuid.v4()}
                    coordinate={{
                        latitude: +point.lat,
                        longitude: +point.long,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        name: point.cp_name || "Control Point"
                    }}
                >
                    <Callout>

                        {/* Name */}
                        <Text>{(() => {
                            if ("cp_name" in point) {
                                return point.cp_name;
                            } else {
                                return 'Control Point'
                            }
                        })()}</Text>
                        
                        {/* Lat */}
                        <Text>Lat: {point.lat}</Text>

                        {/* Long */}
                        <Text>Long: {point.long}</Text>

                    </Callout>
                </Marker>
            );
        });
    }

    return mapMarkers;
}

function calculateRadius (currentSite, points) {
    const maxRadius = 1000000;
    const radius = (getSiteDiameter(currentSite, points)/2)*111320;
    if (radius > maxRadius || !radius) {
        return maxRadius;
    } else {
        return radius;
    }
}