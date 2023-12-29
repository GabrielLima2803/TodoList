const User = require('../models/User');
const authService = require('../services/authService');
const nodemailer = require('nodemailer');
const ResetCode = require('../models/ResetCode');
const fs = require('fs');
const path = require('path');

async function registerUser(req, res){
    const {name, email, password, confirmPassword} = req.body;

    if (!name) {
        return res.status(422).json({error: "O nome é obrigatório!"})
    }
    if(!email){
        return res.status(422).json({error: "O email é obrigatório!"})
    }
    
    if(!password){
        return res.status(422).json({error: "O senha é obrigatório!"})
    }
    
    if (password !== confirmPassword) {
        return res.status(422).json({error: "As senhas não conferem!"})
    }

    try {
        const userExist = await User.find({email});
        if (userExist) {
            return res.status(422).json({ msg: 'Por favor, utilize outro email' });
        }

        const passwordHash = await authService.hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: passwordHash
        });
        await newUser.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
}

async function loginUser(req, res){
    const {email, password} = req.body;
    if (!email) {
        return res.status(422).json({ error: "O email é obrigatório!" });
    }
    
    if (!password) {
        return res.status(422).json({ error: "O senha é obrigatório!" });
    }

    try {
        const user = await User.find({email});
        if (!user) {
            return res.status(404).json({msg: 'Usuário não encontrado!'})
        }
        const checkPassword = await authService.verifyPassword(user.password, password)
        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida' });
        }
        const secret = process.env.SECRET;
        const token = authService.generateToken(user._id, secret);

        res.status(201).json({ msg: `Usuário logado sucesso, seja bem-vindo ${user.name}`, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Erro interno do servidor'})
    }
}

async function forgotPassword(req, res) {
    try {
      await authService.forgotPasswordService(req, res);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ error: 'Erro ao enviar e-mail de recuperação de senha.' });
    }
  }
  
  async function resetPassword(req, res) {
    try {
      await authService.resetPasswordService(req, res);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      res.status(500).json({ error: 'Erro ao redefinir a senha.' });
    }
  }

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword,
}