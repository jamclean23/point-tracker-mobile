// Ticks the resned timer down after 1 

/**
 * 
 * @param {Number} resendTimer 
 * @param {Function} setResendTimer 
 */
export default function tickResendTimer (resendTimer, setResendTimer) {
    if (resendTimer > 0) {
        setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
}