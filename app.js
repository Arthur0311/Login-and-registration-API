require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

// Open Route
app.get('/', (req, res) =>{
    res.status(200).json({msg: "Bem vindo a nossa API!"})
})

// Register User
app.post('/auth/register', async(req, res) =>{
    const {name, email, password, confirmpassword} = req.body

    // Validations 
    if(!name) {
        return res.status(422).json({msg: "O nome é obrigatório!"})
    }

    if(!email) {
        return res.status(422).json({msg: "O email é obrigatório!"})
    }

    if(!password) {
        return res.status(422).json({msg: "A senha é obrigatória!"})
    }

    if(password !== confirmpassword) {
        return res.status(422).json({msg: "As senhas não conferem!"})
    }



})

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Conect to database
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.gmvoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(()=> {
    app.listen(3000)
    console.log("Conectou ao banco com sucesso!")
}).catch((err) => console.log(err))
 
