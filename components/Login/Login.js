// Component for login form

// ====== IMPORTS ======

// React
import React, { useEffect, useState, useRef} from 'react';
import { 
    Keyboard, 
    Animated, 
    Easing, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    ScrollView,
    Alert,
    TouchableOpacity, 
    TouchableWithoutFeedback 
} from 'react-native';

// Expo
import { Ionicons } from '@expo/vector-icons';

// Functions 
import sleep from '../../shared/functions/sleep';
import attemptLogin from '../../shared/functions/attemptLogin';
import attemptCreateAccount from '../../shared/functions/attemptCreateAccount';
import saveToken from '../../shared/functions/saveToken';

// From validation
import Validate from './functions/Validate';


// ====== FUNCTIONS ======

export default function Login (props) {

    // == STATE

    const renderCounter = useRef(0);

    // Sub page routing
    const [currentPage, setCurrentPage] = useState('login');

    // Login form fields
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // Setters for clearing fields
    const loginFieldSetters = {
        username: setUsername,
        password: setPassword
    }

    // Setter for error handling
    const loginErrSetters = {
        usernameErr: setUsernameErr,
        passwordErr: setPasswordErr
    }

    // Login submit state
    const [loginValid, setLoginValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs to elements
    const reqScrollviewRef = useRef();

    // Request Access form fields
    const [newUsername, setNewUsername] = useState('');
    const [newUsernameErr, setNewUsernameErr] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');    
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [phoneNumErr, setPhoneNumErr] = useState('');
    const [notes, setNotes] = useState('');
    const [notesErr, setNotesErr] = useState('');
    const [requestSubmitEnabled, setRequestSubmitEnabled] = useState(true); // Used for disabling submit button

    // Setter for field clearing
    const requestFieldSetters = {
        newUsername: setNewUsername,
        newPassword: setNewPassword,
        confirmPassword: setConfirmPassword,
        firstName: setFirstName,
        lastName: setLastName,
        email: setEmail,
        phoneNum: setPhoneNum,
        notes: setNotes
    }

    // Setters for handling server messages
    const reqAccessErrSetters = {
        newUsername: setNewUsernameErr,
        newPassword: setNewPasswordErr,
        confirmPassword: setConfirmPasswordErr,
        firstName: setFirstNameErr,
        lastName: setLastNameErr,
        email: setEmailErr,
        phoneNum: setPhoneNumErr,
        notes: setNotesErr
    }

    // Animations
    const opacAnim = useRef(new Animated.Value(0)).current;
    const opacDuration = 2000;
    const pageChangeDuration = 500;
    const opacInterpolated = opacAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });


    // == USE EFFECT

    // On mount
    useEffect(() => {

        // Check for previous render
        if (!renderCounter.current) {
            renderCounter.current++;
            
            // Start Animations
            handleInAnimations();
        }
    }, []);

    // Check if username and password are present, enable login button if so
    useEffect(() => {
        if (username && password && !isSubmitting) {
            setLoginValid(true);
        } else {
            setLoginValid(false);
        }
    }, [username, password]);


    // == FUNCTIONS

    function clearInputs () {

        // Clear login fields
        for (const loginFieldSetter in loginFieldSetters) {
            loginFieldSetters[loginFieldSetter]('');
        }

        // Clear request form fields
        for (const requestFieldSetter in requestFieldSetters) {
            requestFieldSetters[requestFieldSetter]('');
        }
    }

    function handleInAnimations (duration = opacDuration) {
        Animated.timing(opacAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.exp)
        }).start();
    }

    function handleOutAnimations (duration = opacDuration) {
        return new Promise((resolve) => {
            Animated.timing(opacAnim, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp)
            }).start(resolve);
        });
    }

    async function handlePageChange (newPage = 'login') {
        await handleOutAnimations(pageChangeDuration);
        setCurrentPage(newPage);
        handleInAnimations();
    }

    function handleScreenTouch () {
        Keyboard.dismiss();
    }

    // Button handlers

    function handleToRequestPagePress () {
        handlePageChange('reqAccess');
    }

    function handleToLoginPagePress () {
        handlePageChange('login');
    }

    async function handleLoginSubmitPress () {
        setIsSubmitting(true);
        setLoginValid(false);

        // DO LOGIN THINGS HERE

        // Submit credentials in exchange for JWT
        let loginResult = {};
        if (username && password) {
            loginResult = await submitLogin();
        }

        if (loginResult && typeof loginResult === 'object') {
            if ('errors' in loginResult) { // Distribute errors
                distributeLoginServerMessages(loginResult.errors);
            } else if ('token' in loginResult) { // Or save the token
                let result = {};

                try {
                    result = await saveToken(loginResult.token);
                    await handleOutAnimations();
                    props.reportLoginTransComplete(true);
                } catch (err) {
                    console.log(err);
                }

                if ('error' in result) {
                    console.log(error);
                }
            }
        }

        setIsSubmitting(false);
        setLoginValid(true);
    }

    function distributeLoginServerMessages (errors) {
        // Fail conditions
        if (!Array.isArray(errors)) {
            return;
        }

        errors.forEach((error, index) => {
            if ('field' in error && 'message' in error) {
                if (error.field === 'serverMsg') {
                    Alert.alert('Login Failed', error.message);
                } else {
                    // Update error state for designated field
                    loginErrSetters[error.field](error.message);
                }
            }
        });
    }

    async function submitLogin () {
        try {// TODO handle error/success msg handling
            
            return await attemptLogin(username, password);
        } catch (err) {
            console.log('Error in "Login" request');
            console.log(err);
            Alert.alert('Connection Error', 'Unable to complete your request. Please check your internet connection, or contact an administrator.', )
        }
    }

    // TextInput handlers

    // LOGIN

    function handleUsernameChange (text) {
        setUsername(text);
    }

    function handlePasswordChange (text) {
        setPassword(text);
    }

    // REQUEST ACCESS

    function distributeRequestServerMessages (errors) {

        // Fail conditions
        if (!Array.isArray(errors)){
            return;
        }

        // Loop over errors and update to state
        errors.forEach((error, index) => {
            if ('field' in error && 'message' in error) {
                // Update error state for designated field
                reqAccessErrSetters[error.field](error.message);
            }
        });
    }

    async function handleRequestSubmitPress () {

        const valid = validateAll();

        if (valid) {
            setRequestSubmitEnabled(false);

            // SUBMIT REQUEST ACCESS FORM HERE

            let fetchResult;

            try {
                fetchResult = await submitRequestAccount();
            } catch (err) {
                console.log('Error in "Request Account" request.');
                console.log(err);
                Alert.alert('Connection Error', 'Unable to complete your request. Please check your internet connection, or contact an administrator.', )
            }

            if (fetchResult && typeof fetchResult === 'object') {
                if ('errors' in fetchResult) {
                    distributeRequestServerMessages(fetchResult.errors);
                } else {
                    Alert.alert('Request Submitted', 'Your request for an account has been successfully submitted. You will receive an email when the account is approved by an administrator.')
                    clearInputs();
                    handlePageChange('login');
                }
            }

            // DEBUG SLEEP
            // await sleep(3000);

            setRequestSubmitEnabled(true);
        } else {
            reqScrollTop();
        }
    }

    async function submitRequestAccount () {
        let result = {};
        try {

            result = await attemptCreateAccount(
                newUsername,
                newPassword,
                confirmPassword,
                firstName,
                lastName,
                email,
                phoneNum,
                notes
            );
            
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }

        return result;
    }

    function validateAll () {
        const results = [
            handleNewUsernameChange(newUsername),
            handleNewPasswordChange(newPassword),
            handleConfirmPasswordChange(confirmPassword),
            handleFirstNameChange(firstName),
            handleLastNameChange(lastName),
            handleEmailChange(email),
            handlePhoneNumChange(phoneNum),
            handleNotesChange(notes)
        ]

        let valid = true;

        results.forEach((result) => {
            if (result && result.length) {
                valid = false;
            }
        });

        return valid;
    }

    function reqScrollTop () {
        reqScrollviewRef.current.scrollTo({y: 0, animated: true});
    }

    function handleNewUsernameChange (text) {
        const errors = Validate.username(text);

        setNewUsername(text);

        if (errors.length) {
            setNewUsernameErr(errors[0]);
            return errors;
        } else {
            setNewUsernameErr('');
        }

    }

    function handleNewPasswordChange (text) {
        const errors = Validate.password(text);
        
        setNewPassword(text)
        setConfirmPassword('');

        if (errors.length) {
            setNewPasswordErr(errors[0]);
            return errors;
        } else {
            setNewPasswordErr('');
        }
    }

    function handleConfirmPasswordChange (text) {
        const errors = Validate.confirmPassword(text, newPassword);

        setConfirmPassword(text);

        if (errors.length) {
            setConfirmPasswordErr(errors[0]);
            return errors;
        } else {
            setConfirmPasswordErr('');
        }
    }

    function handleFirstNameChange (text) {
        const errors = Validate.name(text);

        setFirstName(text);


        if (errors.length) {
            setFirstNameErr(errors[0]);
            return errors;
        } else {
            setFirstNameErr('');
        }
        
    }

    function handleLastNameChange (text) {
        const errors = Validate.name(text);

        setLastName(text);

        if (errors.length) {
            setLastNameErr(errors[0]);
            return errors;
        } else {
            setLastNameErr('');
        }

    }

    function handleEmailChange (text) {
        const errors = Validate.email(text);

        setEmail(text);

        if (errors.length) {
            setEmailErr(errors[0]);
            return errors;
        } else {
            setEmailErr('');
        }

    }

    function handlePhoneNumChange (text) {
        const onlyDigits = text.replaceAll(/\D/g, '');
        const errors = Validate.phone(onlyDigits, {required: false});

        setPhoneNum(onlyDigits);

        if (errors.length) {
            setPhoneNumErr(errors[0]);
            return errors;
        } else {
            setPhoneNumErr('');
        }

    }

    function handleNotesChange (text) {
        const errors = Validate.note(text);

        setNotes(text);

        if (errors.length) {
            setNotesErr(errors[0]);
            return errors;
        } else {
            setNotesErr('');
        }

    }

    // == RENDER

    const pages =
        {
            // LOGIN FORM
            'login':  
                <View style={{...styles.main}}>

                    {/* Header */}
                    <TouchableWithoutFeedback onPress={handleScreenTouch}>
                        <View style={{...styles.header}}>
                            <Text style={{...styles.headerText}}>Login</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Scrollable Form */}
                    <View style={{...styles.loginScrollWrapper}}>
                        <ScrollView style={{...styles.scrollLoginForm}}>

                            {/* Description */}
                            <Text style={{...styles.descriptionText}}>
                                Log in with your existing credentials, or apply for a new account.
                            </Text>                            

                            {/* Username */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Username</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={username} 
                                    onChangeText={(text) => handleUsernameChange(text)}
                                    placeholder='Username'
                                    editable={!isSubmitting}
                                />
                                <Text style={{...styles.formErr}}>{usernameErr}</Text>
                            </View>

                            {/* Password */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Password</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={password} 
                                    onChangeText={(text) => handlePasswordChange(text)}secureTextEntry={true}
                                    placeholder='Password'
                                    editable={!isSubmitting}
                                />
                                <Text style={{...styles.formErr}}>{passwordErr}</Text>
                            </View>

                            {/* Login Button */}
                            <View>
                                <View style={{...styles.defaultBtnWrapper, ...styles.loginBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={
                                            loginValid 
                                            ? {...styles.defaultBtn}
                                            : {...styles.defaultBtn, ...styles.disabledBtn}
                                        }
                                        disabled={!loginValid}
                                        onPress={handleLoginSubmitPress}
                                    >
                                        <Text style={{...styles.defaultBtnText}}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Border */}
                            <View style={{...styles.borderContainer}}>
                                <View style={{...styles.borderLine}}></View>
                                <Text>OR</Text>
                                <View style={{...styles.borderLine}}></View>
                            </View>

                            {/* OR section */}
                            <View style={{...styles.orSection}}>
                                {/* Request Access Btn */}
                                <View style={{...styles.defaultBtnWrapper}}>
                                    <TouchableOpacity style={{...styles.defaultBtn}} onPress={handleToRequestPagePress}>
                                        <Text style={{...styles.defaultBtnText}}>
                                            Request Access
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>,

            // REQUEST ACCESS FORM
            'reqAccess': 
                <View style={{...styles.main}}>

                    {/* Header */}
                    <TouchableWithoutFeedback onPress={handleScreenTouch}>
                        <View style={{...styles.header}}>
                            <TouchableOpacity style={{...styles.backArrow}} onPress={handleToLoginPagePress}>
                                <Ionicons name="arrow-back-sharp" size={30} color="black" />
                            </TouchableOpacity>
                            <Text style={{...styles.headerText}}>Request Access</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Scrollable Form */}
                    <View style={{...styles.reqAccScrollWrapper}}>
                        <ScrollView style={{...styles.scrollReqAccForm }} ref={reqScrollviewRef}>
    
                            {/* Description */}
                            <Text style={{...styles.descriptionText}}>
                                Fill out the following form to request access from an administrator. 
                                You will receive an email once your account is approved.
                            </Text>


                            {/* New Username */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Username *</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={newUsername} 
                                    onChangeText={(text) => handleNewUsernameChange(text)}
                                    placeholder='New username'
                                />
                                <Text style={{...styles.formErr}}>{newUsernameErr}</Text>
                            </View>

                            {/* New Password */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Set Password *</Text>
                                <TextInput  
                                    style={{...styles.formInput}} 
                                    value={newPassword} 
                                    onChangeText={(text) => handleNewPasswordChange(text)}
                                    secureTextEntry={true}
                                    placeholder='Password (At least 8 characters)'
                                />
                                <Text style={{...styles.formErr}}>{newPasswordErr}</Text>
                            </View>

                            {/* Confirm Password */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Confirm Password *</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={confirmPassword} 
                                    onChangeText={(text) => handleConfirmPasswordChange(text)}secureTextEntry={true}
                                    placeholder='Confirm Password'
                                />
                                <Text style={{...styles.formErr}}>{confirmPasswordErr}</Text>
                            </View>

                            {/* First Name */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>First Name *</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={firstName} 
                                    onChangeText={(text) => handleFirstNameChange(text)}
                                    placeholder='First name'
                                />
                                <Text style={{...styles.formErr}}>{firstNameErr}</Text>
                            </View>

                            {/* Last Name */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Last Name *</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={lastName} 
                                    onChangeText={(text) => handleLastNameChange(text)}
                                    placeholder='Last name'
                                />
                                <Text style={{...styles.formErr}}>{lastNameErr}</Text>
                            </View>

                            {/* Email */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Email *</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={email} 
                                    onChangeText={(text) => handleEmailChange(text)}
                                    placeholder='example@email.com'
                                />
                                <Text style={{...styles.formErr}}>{emailErr}</Text>
                            </View>                            

                            {/* Phone Number */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Phone Number</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    value={phoneNum} 
                                    keyboardType='numeric'
                                    onChangeText={(text) => handlePhoneNumChange(text)}
                                    placeholder='(###) ###-####'
                                />
                                <Text style={{...styles.formErr}}>{phoneNumErr}</Text>
                            </View>

                            {/* Notes */}
                            <View style={{...styles.inputWrapper}}>
                                <Text style={{...styles.formLabel}}>Note</Text>
                                <TextInput 
                                    style={{...styles.formInput}} 
                                    multiline={true} 
                                    value={notes} 
                                    onChangeText={(text) => handleNotesChange(text)}
                                    placeholder='Leave a note for the administrator'
                                />
                                <Text style={{...styles.formErr}}>{notesErr}</Text>
                            </View>                                                      

                            {/* Submit Button */}
                            <View>
                                <View style={{...styles.defaultBtnWrapper, ...styles.loginBtnWrapper}}>
                                    <TouchableOpacity 
                                        style={                                            
                                            requestSubmitEnabled 
                                                ? {...styles.defaultBtn}
                                                : {...styles.defaultBtn, ...styles.disabledBtn}
                                        }
                                        disabled={!requestSubmitEnabled}
                                        onPress={handleRequestSubmitPress}
                                    >
                                        <Text style={{...styles.defaultBtnText}}>Submit Request</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>,
        }

    return (
        <Animated.View style={{...styles.mainWrapper, opacity: opacInterpolated}}>
            <TouchableWithoutFeedback onPress={handleScreenTouch}><View style={{...styles.screenWrapper}}></View></TouchableWithoutFeedback>
           {pages[currentPage]}
        </Animated.View>
    );
}


// ====== STYLES ======

const styles = StyleSheet.create({
    testBorder: {
        borderColor: 'yellow',
        borderWidth: 2
    },
    mainWrapper: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    main: {
        marginTop: 50,
        marginBottom: 20,
        flex: 1,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: 'darkGray',
        borderWidth: 1
    },
    header: {
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        opacity: .8
    },
    backArrow: {
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        paddingHorizontal: 10,
        top: 0,
        bottom: 0
    },
    loginScrollWrapper: {
        flex: 1,
    },
    scrollLoginForm: {
        borderRadius: 8,
        marginVertical: 30
    },
    inputWrapper: {
        alignItems: 'stretch',
        gap: 5,
        marginVertical: 5
    },
    formLabel: {
        textAlign: 'center',
        fontSize: 18
    },
    formErr: {
        textAlign: 'center',
        fontSize: 14,
        color: 'red',
        marginBottom: 30,
        marginHorizontal: 20
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'darkgray',
        borderRadius: 4,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        paddingVertical: 1
    },
    orSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 100
    },
    borderLine: {
        borderTopColor: 'darkgray',
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 15,
        opacity: .3
    },
    defaultBtnWrapper: {
        alignItems: 'center'
    },
    defaultBtn: {
        backgroundColor: '#ff002f',
        borderRadius: 6,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    defaultBtnText: {
        color: 'white',
        fontSize: 18
    },
    loginBtnWrapper: {
        marginTop: 25
    },
    screenWrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    reqAccScrollWrapper: {
        flex: 1
    },
    scrollReqAccForm: {
        borderRadius: 8,
        marginVertical: 30
    },
    descriptionText: {
        paddingHorizontal: 50,
        fontSize: 16,
        marginBottom: 30
    },
    disabledBtn: {
        backgroundColor: 'gray'
    }
    
})