const crypto = require('crypto');
const cryptoKey = 'y%2HJ$8o';

const createEncryptedPassword = (password, key) => {
    const k = key.repeat(32).substr(0, 32);
    const iv = key.repeat(16).substr(0, 16);
    const cipher = crypto.createCipheriv('aes-256-ctr', k, iv);
    let pass = cipher.update(password, 'utf-8', 'hex');
    pass += cipher.final('hex');
    return pass;
}

const createDecryptedPassword = (password, key) => {
    const k = key.repeat(32).substr(0, 32);
    const iv = key.repeat(16).substr(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-ctr', k, iv);
    let pass = decipher.update(password, 'hex', 'utf-8');
    pass += decipher.final('utf-8');
    return pass;
}

module.exports = { createDecryptedPassword, createEncryptedPassword, cryptoKey }