// Points Modal Component

// ====== IMPORTS ======

// React
import React, { useEffect, useState } from "react";
import { 
    Modal, 
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard
} from "react-native";

// Styling
import styles from "../../styles";

// Functions
import renderPoints from "./functions/renderPoints";


// ====== FUNCTIONS ======

export default function Points (props) {

    // == RENDER

    return (
        <Modal
            animationType="slide"
            visible={props.showPoints}
            transparent={true}
            onRequestClose={() => {
                props.handleModalClose(props.setShowPoints)
            }}
            style={styles.modal}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <View style={styles.modalView}>
                    
                    {/* Dismiss Button */}
                    <View style={{...styles.modalCloseBtnWrapper}}>
                        <TouchableOpacity style={{...styles.modalCloseBtn}} onPress={() => {props.handleModalClose(props.setShowPoints)}}>
                            <Text style={{...styles.closeBtnText}}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Header */}
                    <View style={{...styles.modalHeaderWrapper}}>
                        <Text style={{...styles.modalHeaderText}}>Points</Text>
                    </View>                

                    {/* Points in scrollview */}
                    <View style={{...styles.modalContentWrapper}}>
                        <ScrollView style={{...styles.modalScrollContent}}>
                            <View onStartShouldSetResponder={() => true}>
                                {renderPoints(props.points, props.mapRef, () => {props.handleModalClose(props.setShowPoints)})}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>   
    )
}