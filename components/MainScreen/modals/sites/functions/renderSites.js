// Render site components for array of sites

// ====== IMPORTS ======

// React
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Keygen
import uuid from 'react-native-uuid';

// Styling
import styles from "../../../styles";

// Functions
import handleSiteBtnPress from "./handleSiteBtnPress";

// ====== FUNCTIONS ======

/**
 * 
 * @param {Array} sites - Array of site entries
 * @param {*} sortMethod - 'name' || 'op', used for sorting returned component array
 * @returns 
 */
export default function renderSites (sites, sortMethod = 'op', filter = '', setCurrentSite, closeModal) {

    // Fail conditions
    if (!Array.isArray(sites) || !sites.length) {
        return [];
    }


    if (sortMethod != 'op' && sortMethod != 'client') {
        console.log('Bad sort method provided');
        throw new Error('Bad sort method');
    }

    // Apply filter
    const filteredSites = filterSites(sites, filter);

    // Apply sort method
    let sortedSites = [];

    switch (sortMethod) {
        case 'op':
            sortedSites = sortByOp(filteredSites);
            break;

        case 'client':
            sortedSites = sortByClient(filteredSites);
            break;
    }
    
    // Render components array
    const sitesComponents = []
    
    sortedSites.forEach((site) => {
        sitesComponents.push(
            <TouchableOpacity
                key={uuid.v4()}
                style={styles.modalEntry}
                onPress={() => handleSiteBtnPress(site, setCurrentSite, closeModal)}
            >
                {/* Operation */}
                <Text style={styles.opText}>{site.op_name}</Text>

                {/* Client */}
                <Text>Client: {site.client_name}</Text>

                {/* Lat */}
                <Text>Lat: {site.lat}</Text>

                {/* Longitude */}
                <Text>Long: {site.long}</Text>

            </TouchableOpacity>
        );
    });

    return sitesComponents;
    
}

function filterSites (sites, filter) {
    if (!filter) {
        return sites;
    }

    const filteredSites = [];
    const filterRegex = new RegExp(`.*${filter}.*`, 'i');
    sites.forEach((site) => {
        if (
            filterRegex.test(site.client_name)
            || filterRegex.test(site.op_name)
        ) {
            filteredSites.push(site);
        }
    });
    return filteredSites;
}

function sortByOp (sites) {
    // Fail conditions
    if (!Array.isArray(sites) || !sites.length) {
        return []
    }

    

    const sortedSites = sites.sort((siteA, siteB) => {
        return siteA.op_name.localeCompare(siteB.op_name);
    });

    return sortedSites;
}

function sortByClient (sites) {
    // Fail conditions
    if (!Array.isArray(sites) || !sites.length) {
        return []
    }

    return sites.sort((siteA, siteB) => {
        // Sort by client's name. if client's name is the same, sort by op name
        const clientsCompare = siteA.client_name.localeCompare(siteB.client_name);
        if (clientsCompare === 0) {
            return siteA.op_name.localeCompare(siteB.op_name);
        } else {
            return clientsCompare;
        }
    });

}