// Builds an array of message components based on state

// ====== IMPORTS ======

import styles from '../styles';
import { View, Text } from 'react-native';
import uuid from 'react-native-uuid';

// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} currentSite - Current site object
 * @param {Array} sites - Array of available sites 
 * @returns 
 */
export default function renderMapMessages (currentSite, sites = []) {
    const messages = [];

    if (currentSite && 'name' in currentSite && currentSite.name) {
        messages.push(buildMessageComponent(currentSite.name));
    } else if (!sites.length) {
        messages.push(buildMessageComponent('Retrieving Sites...'));
    } else {
        messages.push(buildMessageComponent('No Site Selected'));
    }


    return messages;
}

function buildMessageComponent (message) {
    return (
        <View
            key={uuid.v4()}
            style={styles.message}
        >
            <Text style={styles.messageText}>{message}</Text>
        </View>
    )
}