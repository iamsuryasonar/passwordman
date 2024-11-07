const crypto = require('crypto');

// AES algorithm configuration
const ALGORITHM = 'aes-256-cbc';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const SALT = 'sdjashdf';

function generateDek(key_length) {
    return crypto.randomBytes(key_length);
}

const encryptDekWithMasterPassword = (dek, masterPassword) => {
    if (dek === null) {
        dek = generateDek(KEY_LENGTH);
    }
    const hashedKey = crypto.scryptSync(masterPassword, SALT, 32);
    const cipher = crypto.createCipheriv(ALGORITHM, hashedKey, Buffer.alloc(IV_LENGTH, 0));
    const encryptedDek = Buffer.concat([cipher.update(dek), cipher.final()]).toString('hex');
    return encryptedDek;
};

const decryptDekWithMasterPassword = (encryptedDek, masterPassword) => {
    const hashedKey = crypto.scryptSync(masterPassword, SALT, 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, hashedKey, Buffer.alloc(IV_LENGTH, 0));
    return Buffer.concat([decipher.update(Buffer.from(encryptedDek, 'hex')), decipher.final()]);
};

const encryptPasswordWithDek = (password, dek) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, dek, iv);
    const encryptedData = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
    const result = iv.toString('hex') + ":" + encryptedData.toString('hex');
    return result;
};

const decryptPasswordWithDek = (encryptedPassword, dek) => {
    const [iv, data] = encryptedPassword.split(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, dek, Buffer.from(iv, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(data, 'hex')), decipher.final()]).toString('utf8');
};

module.exports = {
    encryptPasswordWithDek,
    decryptPasswordWithDek,
    encryptDekWithMasterPassword,
    decryptDekWithMasterPassword
};