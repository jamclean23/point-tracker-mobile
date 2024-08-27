// Text Input handling for email

// ====== IMPORTS ======

import Validate from "../../../functions/Validate";


// ====== FUNCTIONS/EXPORT ======
export default function handleEmailChange (text, setEmail, setEmailErr) {

    // Validation and error reporting
    const errs = Validate.email(text, { required: true });
    
    if (errs.length) {
        setEmailErr(errs[0]);
    } else {
        setEmailErr();
    }
    setEmail(text);
}