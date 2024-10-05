function validateEmail(email) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
}

function registerUserValidation(user) {
    let error = {}

    if (user.email.length < 6 || user.email.length > 255) {
        if (!validateEmail(user.email)) {
            error.message = 'Invalid email';
            return error;
        }
        error.message = 'Email must be 6 - 255 characters long';
    } else if (user.password.length < 6 || user.password.length > 255) {
        error.message = 'Password must be 6 - 255 characters long';
    }

    return error;
}


function loginUserValidation(user) {
    let error = {}

    if (user.email.length < 6 || user.email.length > 255) {
        if (!validateEmail(user.email)) {
            error.message = 'Invalid email';
            return error;
        }
        error.message = 'Email must be 6 - 255 characters long';
    } else if (user.password.length < 6 || user.password.length > 255) {
        error.message = 'Password must be 6 - 255 characters long';
    }

    return error;
}


module.exports.registerUserValidation = registerUserValidation
module.exports.loginUserValidation = loginUserValidation