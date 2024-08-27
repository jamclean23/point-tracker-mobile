// Modal for sending password reset request

// ====== IMPORTS ======

// React
import React, { useState } from "react";
import { 
    Modal,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Styles
import modalStyles from "./styles";
import loginStyles from "../../styles";

// Functions
import handleForgotPasswordModalClose from "./functions/handleForgotPasswordModalClose";
import handleEmailChange from "./functions/handleEmailChange";

// ====== FUNCTIONS ======

export default function ForgotPassword (props) {

    // == STATE

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    // == RENDER
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
                        <TouchableOpacity style={{...loginStyles.backArrow}} onPress={() => handleForgotPasswordModalClose(props.setShowForgotPasswordModal)}>
                                <Ionicons name="arrow-back-sharp" size={30} color="black" />
                        </TouchableOpacity>
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

                                    {/* Label */}
                                    <Text style={{...loginStyles.formLabel}}>Email</Text>

                                    {/* Field */}
                                    <TextInput
                                        style={{...loginStyles.formInput}}
                                        value={email}
                                        onChangeText={(text) => handleEmailChange(text, setEmail, setEmailErr)}
                                    />

                                    {/* Errors */}
                                    <Text
                                        style={{...loginStyles.formErr}}
                                    >
                                        {emailErr}
                                    </Text>
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