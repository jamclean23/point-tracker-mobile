// Calcuclates disabled status of resend code btn

/**
 * 
 * @param {Number} resendTimer 
 * @returns 
 */
export default function determineResendBtnDisabled (resendTimer) {
    if (resendTimer) {
        return true;
    } else {
        return false;
    }
}
