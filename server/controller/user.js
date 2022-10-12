const jwt = require('jsonwebtoken')
const hash = require('password-hash')
const connection = require('../database/db')

const { secret } = require("../config.json")

class User {
    async loginByToken(req, res){
        try {
            const token = req.headers.authorization
            const user = jwt.verify(token, secret)

            if (user === false)
                throw new Error("Неверный токен")

            return res.status(200).json({ message: "Авторизация прошла успешно" })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async login(req, res){
        try {
            const { mail, password } = req.body
            const connect = await connection
            const [rows, fields] = await connect.execute('SELECT * FROM `users` WHERE `mail` = ?', [mail]);
            const expiredUser = rows[0]

            if (!expiredUser)
                throw new Error("Пользователя не существует")

            if (expiredUser.password !== password)
                throw new Error("Неверный пароль")

            const token = jwt.sign({ number: expiredUser.number }, secret, { expiresIn: "24h" })
            return res.status(200).json({ token })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async register(req, res){
        try {
            const { name, mail, password, number } = req.body
            const connect = await connection
            const [rows, fields] = await connect.execute("SELECT * FROM `users` WHERE `mail` = ?", [mail])
            const expiredUser = rows[0]
            if (expiredUser)
                throw new Error("Пользователь уже существует")

            await connect.execute('INSERT INTO `users`(`name`, `mail`, `password`, `number`, `direction`) VALUES (?,?,?,?,?)', [name, mail, password, number, 0])
            const token = jwt.sign({ number }, secret, { expiresIn: "24h" })
            return res.status(200).json({token})
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async infoByToken(req, res) {
        try {
            const token = req.headers.authorization
            const suspect = jwt.verify(token, secret)

            if (suspect === false)
                throw new Error("Неверный токен")

            const connect = await connection
            const [rows, fields] = await connect.execute('SELECT * FROM `users` WHERE `number` = ?', [suspect.number])
            const user = rows[0]
            if (user === false)
                throw new Error("Пользователя не существует")

            return res.status(200).json({ user })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async changeInfoUserByToken(req, res) {
        try {
            const { name, mail, password, number } = req.body  
            const token = req.headers.authorization
            const connect = await connection
            const suspect = jwt.verify(token, secret)

            if (suspect === false)
                throw new Error("Неверный токен")

            const [rows, fields] = await connect.execute('SELECT * FROM `users` WHERE `number` = ?', [suspect.number])
            const user = rows[0]
            if (user === false)
                throw new Error("Пользователя не существует")
    
            await connect.execute('UPDATE `users` SET `name`=?, `mail`=?,`password`=?,`number`=? WHERE `id`=?', [name, mail, password, number, user.id])

            const newToken = jwt.sign({ number }, secret, { expiresIn: "24h" })
            return res.status(200).json({ message: "Данные обновлены успешно", token: newToken })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}

module.exports = new User()
