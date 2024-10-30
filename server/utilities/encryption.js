const crypto = require('crypto');

// AES algorithm configuration
const ALGORITHM = 'aes-256-cbc';
const KEY_LENGTH = 32; // 256-bit key
const IV_LENGTH = 16;
const SALT = 'sdjashdf';

// Generate a single DEK and encrypt it with the MK
const encryptDEK = (dek, masterKey) => {
    if (dek === null) {
        dek = crypto.randomBytes(KEY_LENGTH);
    }
    const hashedKey = crypto.scryptSync(masterKey, SALT, 32);

    const cipher = crypto.createCipheriv(ALGORITHM, hashedKey, Buffer.alloc(IV_LENGTH, 0));
    const encryptedDEK = Buffer.concat([cipher.update(dek), cipher.final()]).toString('hex');

    // Store encryptedDEK in database

    return encryptedDEK;
};

// Generate a single DEK and encrypt it with the MK
const updateEncryptedDEK = (dek, newMasterKey) => {
    const hashedKey = crypto.scryptSync(newMasterKey, SALT, 32);
    const cipher = crypto.createCipheriv(ALGORITHM, hashedKey, Buffer.alloc(IV_LENGTH, 0));
    const encryptedDEK = Buffer.concat([cipher.update(dek), cipher.final()]).toString('hex');

    // Store encryptedDEK in database

    return encryptedDEK;
};

// Encrypt data with DEK
const encryptData = (data, dek) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, dek, iv);
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encryptedData.toString('hex') };
};

// Decrypt the stored encryptedDEK with MK to retrieve DEK
const decryptDEK = (encryptedDEK, masterKey) => {
    const hashedKey = crypto.scryptSync(masterKey, SALT, 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, hashedKey, Buffer.alloc(IV_LENGTH, 0));
    return Buffer.concat([decipher.update(Buffer.from(encryptedDEK, 'hex')), decipher.final()]);
};

// Decrypt data with DEK
const decryptData = (encryptedData, dek, iv) => {
    const decipher = crypto.createDecipheriv(ALGORITHM, dek, Buffer.from(iv, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]).toString('utf8');
};

// Encrypt function, using stored encryptedDEK
const encrypt = (data, dek) => {

    const { iv, encryptedData } = encryptData(data, dek);
    const result = iv + ":" + encryptedData;

    return result;
};

// Decrypt function, using stored encryptedDEK
const decrypt = (encryptedData, dek) => {
    const [iv, data] = encryptedData.split(':');
    return decryptData(data, dek, iv);
};

const data = "Old password";
const masterKey = crypto.randomBytes(KEY_LENGTH);


const dek = crypto.randomBytes(KEY_LENGTH);
const encryptedDEK = encryptDEK(dek, masterKey);
// store encryptedDEK in DB;

// to add password, retrieve stored encryptedDEK from DB
// get master key and password(i.e the data to be stored) from user 

const dek_to_encrypt = decryptDEK(encryptedDEK, masterKey); // Decrypt the DEK
// if not decrypted then throw error. (invalid master key)
const encryptedData = encrypt(data, dek_to_encrypt);

console.log("Encrypted Data:", encryptedData);


// get stored encryptedDEK, get encryptedData from password model in db 
// and  master key from body
const decryptedDEK = decryptDEK(encryptedDEK, masterKey); // Decrypt the DEK
console.log(decryptedDEK);
const decryptedData = decrypt(encryptedData, decryptedDEK);

console.log("Decrypted Data:", decryptedData);

const newMasterKey = crypto.randomBytes(KEY_LENGTH);

const newEncryptedDEK = encryptDEK(decryptedDEK, newMasterKey);
console.log('new dek', newEncryptedDEK)

const decryptedDEK2 = decryptDEK(newEncryptedDEK, newMasterKey);
console.log(decryptedDEK2);

const decryptedData2 = decrypt(encryptedData, decryptedDEK2);

console.log("Decrypted Data:", decryptedData2);


module.exports = {
    encryptData,
    decryptData,
    encryptDEK,
    decryptDEK,
    encrypt,
    decrypt
};