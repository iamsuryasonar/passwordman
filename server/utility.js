const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

const responseHandler = (res, status_code, status, message, data) => {
    res.status(status_code).json({
        status_code,
        status,
        message,
        data,
    })
}


const encryptPassword = (text, key) => {
    const salt = crypto.randomBytes(16);
    const hashedKey = crypto.scryptSync(key, salt, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, hashedKey, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decryptPassword = (encryptedText, key) => {
    const parts = encryptedText.split(':');
    const salt = Buffer.from(parts[0], 'hex');
    const iv = Buffer.from(parts[1], 'hex');
    const encryptedTextBuffer = Buffer.from(parts[2], 'hex');

    const hashedKey = crypto.scryptSync(key, salt, 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, hashedKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedTextBuffer), decipher.final()]);
    return decrypted.toString('utf8');
};

module.exports = {
    responseHandler,
    encryptPassword,
    decryptPassword
};