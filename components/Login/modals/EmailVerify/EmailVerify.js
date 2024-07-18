// Modal for Email verification process

// ====== IMPORTS ======

// React
import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";

// Styles
import styles from "./styles";

// Functions
import handleEmailVerifyClose from "./functions/handleEmailVerifyClose";
import getFormattedEmail from "./functions/getFormattedEmail";
import determineResendBtnDisabled from "./functions/determineResendBtnDisabled";
import handleOnShow from "./functions/handleOnShow";
import sendEmail from "./functions/sendEmail";
import tickResendTimer from "./functions/tickResendTimer";
import verifyListener from "./functions/verifyListener";


// ====== FUNCTIONS ======

export default function EmailVerify (props) {

    // == STATE
    
    const [resendTimer, setResendTimer] = useState(0);
    const [emailSent, setEmailSent] = useState(false);
    const [emailRequestOngoing, setEmailRequestOngoing] = useState(false);
    const [shouldListenForVerify, setShouldListenForVerify] = useState(false);
    const shouldListenForVerifyRef = useRef(false);

    // == USE EFFECT

    // Resend Btn timer
    useEffect(() => {
        if (resendTimer) {
            tickResendTimer(resendTimer, setResendTimer);
        }
    }, [resendTimer]);

    // Email verified listener
    useEffect(() => {
        if (shouldListenForVerify) {
            shouldListenForVerifyRef.current = true;
            verifyListener(props.emailAuthToken, shouldListenForVerifyRef, () => handleEmailVerifyClose(props.setShowEmailVerify, setShouldListenForVerify));
        } else {
            shouldListenForVerifyRef.current = false;
        }
    }, [shouldListenForVerify]);

    // == RENDER
    return (
        <Modal
        presentationStyle="overFullScreen"
            animationType="fade"
            visible={props.showEmailVerify}
            transparent={true}
            statusBarTranslucent
            onShow={() => handleOnShow(setResendTimer, setShouldListenForVerify)}
            onRequestClose={() => {
                handleEmailVerifyClose(props.setShowEmailVerify, setShouldListenForVerify);
            }}
            
        >   
            {/* Wrapper */}
            <View
                style={styles.wrapper}
            >
                {/* Main */}
                <View
                    style={styles.main}
                >
                    {/* Header */}
                    <Text
                        style={styles.header}
                    >
                        Verify Email
                    </Text>

                    {/* Content Wrapper */}
                    <ScrollView
                        style={styles.scrollView}
                    >   
                        <View
                            style={styles.contentWrapper}
                        >

                            {/* Message */}
                            <Text
                                style={styles.message}
                            >
                                {emailSent
                                    ? `A verification link has been sent to: \n\n${getFormattedEmail(props.recipient)}\n\nPlease follow the link in your email inbox to verify and continue.`
                                    : `Click to send a verification email to your inbox.`
                                }    
                            </Text>

                            {/* Resend Btn */}

                            <View
                                style={styles.btnWrapper}
                                >
                                <TouchableOpacity
                                    disabled={determineResendBtnDisabled(resendTimer) || emailRequestOngoing}
                                    style={{
                                        ...styles.btn,
                                        ...(() => {
                                            if (determineResendBtnDisabled(resendTimer) || emailRequestOngoing) {
                                                return styles.disabledBtn
                                            } else {
                                                return {}
                                            }
                                        })()   
                                    }}
                                    onPress={() => sendEmail(
                                        setEmailRequestOngoing, 
                                        props.emailAuthToken, 
                                        resendTimer, 
                                        setResendTimer,
                                        setEmailSent,
                                        () => handleEmailVerifyClose(props.setShowEmailVerify)

                                    )}
                                >
                                    <Text
                                        style={styles.btnText}
                                    >
                                        {resendTimer
                                            ? `Resend ${resendTimer}`
                                            : `Send Link`
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                    
                </View>
            </View>
        </Modal>
    )
}