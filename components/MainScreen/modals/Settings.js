// Settings Modal Component

// ====== IMPORTS ======

// React
import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

// Stylesheet
import styles from "../styles";

// Handlers
import logoutBtnHandler from "./functions/logoutBtnHandler";

//  ====== COMPONENT ======

export default function Settings (props) {
    return (
        <Modal
            animationType="slide"
            visible={props.showSettings}
            transparent={true}
            onRequestClose={() => {props.handleModalClose(props.setShowSettings)}}
        >   

            <View style={{...styles.modal}}>

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
                        
                        {/* Connectivity */}
                        <View style={{...styles.modalSettingsGroup}}>

                            {/* Sub Header */}
                            <Text style={{...styles.modalSubHeader}}>Connectivity</Text>

                            <View style={{...styles.modalSettingsGroupContent}}>

                                {/* Refresh Points */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.modalBtn}}>
                                        <Text style={{...styles.modalBtnText}}>Refresh Points</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Connection Test */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.modalBtn}}>
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
                                        onPress={() => {logoutBtnHandler(props.resetApp)}}
                                    >
                                        <Text style={{...styles.modalBtnText}}>Logout</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Delete Account */}
                                <View style={{...styles.modalSettingsGroupBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.modalBtn}}>
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
