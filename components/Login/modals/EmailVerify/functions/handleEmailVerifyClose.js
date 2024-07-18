// Handles the closing of the Email Verify modal


// ====== FUNCTIONS ======

/**
 * 
 * @param {Function} setShowModal - Visibility setter
 */
export default function handleEmailVerifyClose (setShowModal, setShouldListenForVerify) {
    setShouldListenForVerify(false);
    setShowModal(false);
}