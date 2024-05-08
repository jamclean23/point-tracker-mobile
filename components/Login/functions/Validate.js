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

    
    if (!config) {
        config = {
            min: 8,
            max: 20,
            required: true
        }
    }

    // Default options
    if (!(typeof config === 'object')) {
        throw new Error('Bad configuration object');
    }

    const errors = [];

    if (!text.length && config.required) {
        errors.push('May not be blank');
    }

    if (text.length > config.max) {
        errors.push(`Must shorter than ${config.max} characters`);
    }
    
    if (!/[a-zA-Z\d]/.test(text)) {
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

    if (!config) {
        config = {
            min: 8,
            max: 20
        }
    }

    // Default options
    if (!(typeof config === 'object')) {
        throw new Error('Bad configuration object');
    }


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
 * @param {Boolean} config.required - Exclude empty strings from validation
 * @returns Array of errors, lower index is most important
 */
function name (text, config) {
    if (!text) {
        text = '';
    }

    if (!(typeof text === 'string')) {
        text.toString();
    }

    if (!config) {
        config = {
            min: 1,
            max: 30
        }
    }

    // Default options
    if (!(typeof config === 'object')) {
        throw new Error('Bad configuration object');
    }

    const errors = [];

    if (!text.length && config.required) {
        console.log(text)
        errors.push('May not be blank');
    }

    if (text.length > config.max) {
        errors.push(`Must shorter than ${config.max} characters`);
    }
    
    console.log(text.length);
    if (!/^[a-zA-Z-]*$/.test(text)) {
        errors.push('No special characters or spaces');
    }

    if (text.length < config.min) {
        errors.push(`Must be at least ${config.min} character${config.min > 1 ? 's' : ''}`);
    }

    return errors;
}

// ====== EXPORTS ======

export default Validate = {
    username,
    password,
    confirmPassword,
    name
}