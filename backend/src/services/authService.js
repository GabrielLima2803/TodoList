const argon2 = require('argon2');
const jwt = require('jsonwebtoken')

async function hashPassword(password){ 
    return await argon2.hash(password, {hashLength: 32});
}

async function verifyPassword(hash, password){
    return await argon2.verify(hash, password);
}

function generateToken(userId, secret){
    return jwt.sign({ìd: userId}, secret)
}

module.exports = {hashPassword, verifyPassword, generateToken}