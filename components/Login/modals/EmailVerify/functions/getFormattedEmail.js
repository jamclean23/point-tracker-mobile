// Obscures email for user viewing

/**
 * 
 * @param {String} email 
 */
export default function getFormattedEmail (email) {
    const beginningReadableChars = 3

    let hasPassedAtSym = false;
    const newEmailChars = [];
    email.split('').forEach((character, index) => {
        if (character === '@') {
            hasPassedAtSym = true;
        } 
        if (index < beginningReadableChars || hasPassedAtSym) {
            newEmailChars.push(character);
        } else {
            newEmailChars.push('*');
        }
    }); 
    return newEmailChars.join('');
}