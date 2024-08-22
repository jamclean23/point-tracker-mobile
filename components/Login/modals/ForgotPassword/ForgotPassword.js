// Modal for sending password reset request

// ====== IMPORTS ======

// React
import React from "react";
import { 
    Modal,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";

// Styles
import modalStyles from "./styles";
import loginStyles from "../../styles";

// Functions
import handleForgotPasswordModalClose from "./functions/handleForgotPasswordModalClose";

// ====== FUNCTIONS ======

export default function ForgotPassword (props) {
    return (
        <Modal
            presentationStyle="overFullScreen"
            animationType="fade"
            visible={props.showForgotPasswordModal}
            transparent={true}
            statusBarTranslucent
            onRequestClose={() => {
                handleForgotPasswordModalClose(props.setShowForgotPasswordModal);
            }}        
        >   
            <View style={{...loginStyles.mainWrapper}}>
                <View style={{...loginStyles.main}}>

                    {/* Header */}
                    <View style={{...loginStyles.header}}>
                        <Text style={{...loginStyles.headerText}}>Reset Password</Text>
                    </View>

                    {/* Scrollable Content */}
                    <View style={{...styles.contentWrapper}}>
                        <ScrollView style={{...styles.contentScrollView}}>
                            <View style={{...styles.innerContentWrapper}}>

                                {/* Description */}
                                <View>
                                    <Text style={{...loginStyles.descriptionText}}>
                                        Submit your email to receive a Password Reset link in your inbox. 
                                    </Text>
                                </View>

                                {/* Email */}
                                <View style={{...styles.inputWrapper}}>
                                    <Text style={{...loginStyles.formLabel}}>Email</Text>
                                    <TextInput
                                        style={{...loginStyles.formInput}}
                                        />
                                </View>

                                {/* Submit Button */}
                                <View style={{...loginStyles.defaultBtnWrapper}}>
                                    <TouchableOpacity style={{...loginStyles.defaultBtn}}>
                                        <Text style={{...loginStyles.defaultBtnText}}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}