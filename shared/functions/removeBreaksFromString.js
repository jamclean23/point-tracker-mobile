// Removes character code 10 from strings
// Necessary to convert multiline inputs to single line functionality.
// Native single line inputs prevent scrolling in a ScrollView.

/**
 * 
 * @param {String} string - String to be scrubbed 
 */
export default function removeBreaksFromString (toBeScrubbedString = '') {

    // Fail condition
    if (typeof toBeScrubbedString != 'string') {
        return '';
    }

    return toBeScrubbedString.replaceAll(String.fromCharCode(10), '');
}