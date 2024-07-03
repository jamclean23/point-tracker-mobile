// Builds an array of message components based on state

// ====== IMPORTS ======

import styles from '../styles';
import { View, Text, TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import handleMsgContainerPress from './handleMsgContainerPress';

// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} currentSite - Current site object
 * @param {Array} sites - Array of available sites 
 * @returns 
 */
export default function renderMapMessages (currentSite, sites = [], points, mapRef) {
    const messages = [];

    if (currentSite && 'op_name' in currentSite && currentSite.op_name) {
        messages.push(buildMessageComponent(currentSite.op_name, currentSite, points, mapRef));
    } else if (!sites.length) {
        messages.push(buildMessageComponent('Retrieving Sites...'));
    } else {
        messages.push(buildMessageComponent('No Site Selected'));
    }


    return messages;
}

function buildMessageComponent (message, currentSite, points, mapRef) {
    return (
        <TouchableOpacity
            key={uuid.v4()}
            style={styles.message}
            onPress={(() => {
                if (currentSite) {
                    return () => {handleMsgContainerPress(currentSite, points, mapRef)}
                }
            })()}
        >
            <Text style={styles.messageText}>{message}</Text>
        </TouchableOpacity>
    )
}