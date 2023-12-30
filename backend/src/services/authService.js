const argon2 = require('argon2');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs').promises; 
const path = require('path');
const ResetCode = require('../models/ResetCode');

async function hashPassword(password) {
    try {
        return await argon2.hash(password, { hashLength: 32 });
    } catch (error) {
        console.error('Erro ao gerar o hash da senha:', error);
        throw new Error('Erro interno ao processar a senha.');
    }
}

async function verifyPassword(hash, password) {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        console.error('Erro ao verificar a senha:', error);
        throw new Error('Erro interno ao verificar a senha.');
    }
}

function generateToken(userId, secret) {
    try {
        return jwt.sign({ id: userId }, secret);
    } catch (error) {
        console.error('Erro ao gerar o token:', error);
        throw new Error('Erro interno ao gerar o token.');
    }
}

async function forgotPasswordService(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = new Date();  
    expiration.setMinutes(expiration.getMinutes() + 15);  // Expira em 15 minutos
    const htmlTemplate = await fs.readFile(path.join(__dirname, '../email/email.html'), 'utf-8');
    const formattedHtml = htmlTemplate.replace('${code}', code);
    await ResetCode.create({ email, code, expiration });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperação de Senha',
        html: formattedHtml,
    }

    const info = await transporter.sendMail(mailOptions);

    console.log('E-mail enviado:', info.response);
    res.json({ msg: 'E-mail de recuperação de senha enviado com sucesso.' });
}

async function resetPasswordService(req, res) {
    const { email, code, newPassword } = req.body;

    try {
        const resetCode = await ResetCode.findOne({ email, code, expiration: { $gt: new Date() } });

        if (resetCode) {
            await User.updatePassword(email, newPassword);
            await ResetCode.deleteOne({ email, code });
            res.json({ msg: 'Senha redefinida com sucesso.' });
        } else {
            res.status(400).json({ error: 'Código inválido ou expirado.' });
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(500).json({ error: 'Erro interno ao redefinir a senha.' });
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    forgotPasswordService,
    resetPasswordService
};
