export const generatePassword = (length: number = 16) => {

    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}|;:,.<>?[]';

    const allCharacters = upperCase + lowerCase + numbers + symbols;

    let password = '';

    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let index = password.length; index < length; index++) {
        let randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

export const getPasswordStrength = (password: string = '') => {

    let strength = 0;

    let hasUpperCase = /[A-Z]/.test(password);
    let haslowerCase = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSymbols = /[!@#$%^&*()_+{}|;:,.<>?\[\]]/.test(password);

    let fulfillsLengthCriteria = password.length >= 8;

    if (hasUpperCase) strength++;
    if (haslowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSymbols) strength++;

    if (strength === 4 && fulfillsLengthCriteria) {
        return {
            value: strength,
            type: 'Strong',
            color: 'green'
        }
    } else if (strength >= 3 && fulfillsLengthCriteria) {
        return {
            value: strength,
            type: 'Medium',
            color: 'yellow'
        }
    } else {
        return {
            value: strength,
            type: 'Weak',
            color: 'red'
        }
    }
}


