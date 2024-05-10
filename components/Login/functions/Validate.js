// Validation for login/request access pages


// ====== FUNCTIONS ======


// NEW USERNAME VALIDATION
/**
 * 
 * @param {String} text - username to be validated 
 * @param {Object} config - Configuration object.
 * @param {String} config.min - Minimum characters
 * @param {String} config.max - Maximum characters
 * @param {Boolean} config.required - Exclude empty strings from validation
 * @returns Array of errors
 * 
 */
function username (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    
    const defaultConfig = {
        required: true,
        min: 8,
        max: 20
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (text.length > config.max) {
        errors.push(`Must shorter than ${config.max} characters`);
    }
    
    if (!/^[a-zA-Z\d]+$/.test(text)) {
        errors.push('No special characters or spaces');
    }

    if (text.length < config.min) {
        errors.push(`Must be at least ${config.min} characters`);
    }

    return errors;

}


// NEW PASSWORD VALIDATION
/**
 * 
 * @param {String} text - Password to be validated
 * @param {Object} config - Configuration object
 * @param {String} config.min - Minimum length of password
 * @param {String} config.max - Maximum length of password
 * @returns Array of errors
 */
function password (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    const defaultConfig = {
        min: 8,
        max: 20
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}


    const errors = [];

    if (!text.length) {
        errors.push('May not be blank');
    }

    if (/\s/.test(text)) {
        errors.push('No spaces permitted');
    }

    if (text.length > config.max) {
        errors.push(`Must shorter than ${config.max} characters`);
    }
    
    if (text.length < config.min) {
        errors.push(`Must be at least ${config.min} characters`);
    }



    return errors;
}


// CONFIRM PASSWORD VALIDATION
/**
 * 
 * @param {String} confirmPass - Confirmation password to check 
 * @param {String} expectedPass - Password to check against
 */
function confirmPassword (confirmPass, expectedPass) {

    if (!confirmPass) {
        confirmPass = '';
    }

    if (!expectedPass) {
        expectedPass = '';
    }

    if (!(typeof confirmPass === 'string')) {
        confirmPass.toString();
    }

    if (!(typeof expectedPass === 'string')) {
        expectedPass.toString();
    }

    const errors = [];

    if (!confirmPass) {
        errors.push('Must confim password');
    }

    if (!(confirmPass === expectedPass)) {
        errors.push('Passwords do not match');
    }

    return errors;

}

// NAME VALIDATION
/**
 * 
 * @param {String} text 
 * @param {Object} config
 * @param {String} config.min - Minimum amount of characters allowed
 * @param {String} config.max - Maximum amount of characters allowed
 * @param {Boolean} config.required - Disallow empty strings from validation
 * @returns Array of errors, lower index is most important
 */
function name (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    const defaultConfig = {
        required: true,
        min: 1,
        max: 30
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (text.length > config.max) {
        errors.push(`Must shorter than ${config.max} characters`);
    }
    
    if (!/^[a-zA-Z-]*$/.test(text)) {
        errors.push('No special characters or spaces');
    }

    if (text.length < config.min) {
        errors.push(`Must be at least ${config.min} character${config.min > 1 ? 's' : ''}`);
    }

    return errors;
}

// EMAIL VALIDATION
/**
 * 
 * @param {String} text - Email string to be validated
 * @param {Object} config - Configuration options
 * @param {Boolean} config.required - Disallow empty strings from validation
 * @returns Array of errors in order of most to least important
 */
function email (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    const defaultConfig = {
        required: true
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(text)) {
        errors.push('Not valid email format');
    }

    return errors;
}

// PHONE NUMBER VALIDATION
/**
 * 
 * @param {String} text - Phone number string to be validated
 * @param {Object} config - Configuration object
 * @param {Boolean} config.required - Disallow empty strings from validation
 * @returns 
 */
function phone (text, config) {

    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    const defaultConfig = {
        required: true
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (!/^[\d]+$/.test(text) && text.length) {
        errors.push('Only digits allowed');
    }

    return errors;
}

// NOTE VALIDATION
/**
 * 
 * @param {String} text - Note string to be validated
 * @param {Object} config - Configuration object
 * @param {Boolean} config.required - Disallow empty strings from validation
 * @param {Number} config.min - Minimum length of note string
 * @param {Number} config.max - Maximum length of note string
 * @returns Array of errors in order of most to least important
 */
function note (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    const defaultConfig = {
        required: false,
        min: 0,
        max: 2000
    }

    // Override default config with specified config where provided
    config = {...defaultConfig, ...config}
    

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (text.length > config.max) {
        errors.push(`May not exceed ${config.max} characters`);
    }

    if (text.length < config.min) {
        errors.push(`Must be at least ${config.min} characters`);
    }

    return errors;
}

// ====== EXPORTS ======

export default Validate = {
    username,
    password,
    confirmPassword,
    name,
    email,
    phone,
    note
}