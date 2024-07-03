// Settings Modal Component

// ====== IMPORTS ======

// React
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

// Stylesheet
import styles from "../../styles";

// Functions
import logoutHandler from "../../functions/logoutHandler";
import deleteAccountHandler from "../../functions/deleteAccountHandler";
import pingHandler from "../../functions/pingHandler";

//  ====== COMPONENT ======

export default function Settings (props) {

    // == STATE

    const [pinging, setPinging] = useState(false);


    // == RENDER

    return (
        <Modal
            animationType="slide"
            visible={props.showSettings}
            transparent={true}
            onRequestClose={() => {props.handleModalClose(props.setShowSettings)}}
        >   

            <View style={{...styles.modalView}}>

                {/* Dismiss Button */}
                <View style={{...styles.modalCloseBtnWrapper}}>
                    <TouchableOpacity style={{...styles.modalCloseBtn}} onPress={() => {props.handleModalClose(props.setShowSettings)}}>
                        <Text style={{...styles.closeBtnText}}>X</Text>
                    </TouchableOpacity>
                </View>

                
                {/* Header */}
                <View style={{...styles.modalHeaderWrapper}}>
                    <Text style={{...styles.modalHeaderText}}>Settings</Text>
                </View>

                {/* Settings in scrollview */}
                <View style={{...styles.modalContentWrapper}}>
                    <ScrollView style={{...styles.modalScrollContent}}>
                        
                        {/* Map */}
                        <View style={{...styles.modalSettingsGroup}}>

                            {/* Sub Header */}
                            <Text style={{...styles.modalSubHeader}}>Map Content</Text>

                            <View style={{...styles.modalSettingsGroupContent}}>

                                {/* Road */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{
                                            ...styles.modalBtn,
                                            ...(() => {
                                                if (!(props.mapContentType === 'standard')) {
                                                    return styles.disabledBtn;
                                                }
                                            })()
                                        }}
                                        onPress={() => {
                                            props.setMapContentType('standard');
                                            props.handleModalClose(props.setShowSettings);
                                        }}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Road</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Terrain*/}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{
                                            ...styles.modalBtn,
                                            ...(() => {
                                                if (!(props.mapContentType === 'terrain')) {
                                                    return styles.disabledBtn;
                                                }
                                            })()
                                        }}
                                        onPress={() => {
                                            props.setMapContentType('terrain');
                                            props.handleModalClose(props.setShowSettings);
                                        }}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Terrain</Text>
                                    </TouchableOpacity>
                                </View>   

                                {/* Satellite */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{
                                            ...styles.modalBtn,
                                            ...(() => {
                                                if (!(props.mapContentType === 'satellite')) {
                                                    return styles.disabledBtn;
                                                }
                                            })()
                                        }}
                                        onPress={() => {
                                            props.setMapContentType('satellite');
                                            props.handleModalClose(props.setShowSettings);
                                        }}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Satellite</Text>
                                    </TouchableOpacity>
                                </View>   

                            </View>

                        </View>

                        {/* Connectivity */}
                        <View style={{...styles.modalSettingsGroup}}>

                            {/* Sub Header */}
                            <Text style={{...styles.modalSubHeader}}>Connectivity</Text>

                            <View style={{...styles.modalSettingsGroupContent}}>

                                {/* Refresh Points */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{
                                            ...styles.modalBtn
                                        }}
                                    
                                    >
                                        <Text style={{...styles.modalBtnText}}>Refresh Points</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Connection Test */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{
                                            ...styles.modalBtn,
                                            ...(()=> {
                                                if (pinging) {
                                                    return {
                                                        backgroundColor: 'gray'
                                                    }
                                                } else {
                                                    return {}
                                                }
                                            })() 
                                        }}
                                        onPress={() => { pingHandler(setPinging) }}
                                        disabled={pinging}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Connection Test</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                        {/* Account Settings */}
                        <View style={{...styles.modalSettingsGroup}}>

                            {/* Sub Header */}
                            <Text style={{...styles.modalSubHeader}}>Account</Text>

                            <View style={{...styles.modalSettingsGroupContent}}>

                                {/* Logout */}
                                <View 
                                    style={{...styles.modalSettingsGroupBtnWrapper}}
                                >
                                    <TouchableOpacity 
                                        style={{...styles.modalBtn}}
                                        onPress={() => {logoutHandler(props.resetApp)}}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Logout</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Delete Account */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={{...styles.modalBtn}}
                                        onPress={() => {deleteAccountHandler(props.resetApp, props.userToken)}}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Delete Account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>

            </View>
            
        </Modal>        
    )
}
