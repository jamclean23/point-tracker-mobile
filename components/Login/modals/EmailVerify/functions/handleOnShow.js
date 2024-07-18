// Handles when the EmailVerify modal is shown

// ====== IMPORTS ======


// ====== FUNCTION ======

/**
 * 
 * @param {*} resendTimer 
 * @param {*} setResendTimer 
 * @param {*} emailAuthToken 
 * @param {*} shouldListenForVerify 
 * @param {*} setShouldListenForVerify 
 */
export default function handleOnShow (
    setResendTimer,
    setShouldListenForVerify
) {
    setShouldListenForVerify(true);
    setResendTimer(0);
}