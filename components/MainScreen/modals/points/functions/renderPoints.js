// Render point components for array of points

// ====== IMPORTS ======

// React
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Keygen
import uuid from 'react-native-uuid';

// Styling
import styles from "../../../styles";

// Functions
import sortPointsByName from "./sortPointsByName";
import handlePointBtnPress from "./handlePointBtnPress";

// ====== FUNCTIONS ======

/**
 * 
 * @param {Array} points - Array of point objects 
 * @param {Function} closeModal - Callback to close the modal
 */
export default function renderPoints (points, mapRef, closeModal) {

    // Fail Conditions
    if (!Array.isArray(points) || !points.length) {
        return [];
    }

    // Sort points
    const sortedPoints = sortPointsByName(points);

    // Render components array
    const pointsComponents = [];

    sortedPoints.forEach((point) => {
        if (!(typeof point === 'object')) {
            point = {};
        }

        if (!("cp_name" in point) || !point.cp_name) {
            point.cp_name = 'No name specified';
        }

        pointsComponents.push(
            <TouchableOpacity
                key={uuid.v4()}
                style={styles.modalEntry}
                onPress={() => handlePointBtnPress(point, mapRef, closeModal)}
            >
                {/* Name */}
                <Text
                    style={styles.pointNameText}
                >
                    {point.cp_name}
                </Text>

                {/* Lat */}
                <Text>Latitude: {point.lat}</Text>

                {/* Long */}
                <Text>Longitude: {point.long}</Text>

                {/* Id */}
                <Text>ID: {point.cp_uid}</Text>

            </TouchableOpacity>
        );
    });

    return pointsComponents;
}   