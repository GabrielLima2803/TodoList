const argon2 = require('argon2');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ResetCode = require('../models/ResetCode');

async function hashPassword(password){ 
    return await argon2.hash(password, {hashLength: 32});
}

async function verifyPassword(hash, password){
    return await argon2.verify(hash, password);
}

function generateToken(userId, secret){
    return jwt.sign({ìd: userId}, secret)
}

async function forgotPasswordService(req, res){
    const {email} = req.body

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../email/email.html'), 'utf-8');
    const formattedHtml = htmlTemplate.replace('${code}', code);
    await ResetCode.create({ email, code, expiration });


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gabriellima2803@gmail.com',
            pass: 'lmmh lltw stbu zpfv',
          },
    });

    const mailOptions = {
        from: 'gabriellima2803@gmail.com',
        to: email,
        subject: 'Recuperação de Senha',
        html: formattedHtml,
    }

    const info = await transporter.sendMail(mailOptions);

    console.log('E-mail enviado:', info.response);
    res.json({ msg: 'E-mail de recuperação de senha enviado com sucesso.' });
}

async function resetPasswordService(req, res){
    const {email, code, newPassword} = req.body;

    const resetCode = await ResetCode.findOne({ email, code, expiration: { $gt: new Date() } });

    if (resetCode) {
        await User.updatePassword(email, newPassword);
    
        await ResetCode.deleteOne({ email, code });
    
        res.json({ msg: 'Senha redefinida com sucesso.' });
      } else {
        res.status(400).json({ error: 'Código inválido ou expirado.' });
      }
    }




module.exports = {hashPassword, verifyPassword, generateToken, forgotPasswordService, resetPasswordService}