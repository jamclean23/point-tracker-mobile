// Handles when the EmailVerify modal is shown

// ====== IMPORTS ======

import tickResendTimer from './tickResendTimer';


// ====== FUNCTION ======

/**
 * 
 * @param {Number} resendTimer 
 * @param {Function} setResendTimer 
 */
export default function handleOnShow (
    resendTimer,
    setResendTimer
) {
    setResendTimer(0);
}