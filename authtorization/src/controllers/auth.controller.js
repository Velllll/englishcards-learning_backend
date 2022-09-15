const db = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('../config')

const generateAccessToken = (userID, email) => {
    const payloda = {
        userID,
        email,
    }
    return jwt.sign(payloda, secretKey.key, {expiresIn: '24h'})
}

class authController {

    async registration(req, res) {
        const {email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 7)
        db.query("INSERT INTO users (email, password) values (?, ?)", [email, hashPassword])
        .then(() => {
            res.json({message: `${email} successfully registraed`})
        })
        .catch(err => res.json({message: err.message}))
    }

    async login(req, res) {
        const {email, password} = req.body
        db.query("SELECT * FROM users WHERE email = ?", [email])
        .then(value => {
            const user = value[0][0]
            if(user) {
                if(email !== user.email) return res.json({message: "Wrong email"})
                const validPassword = bcrypt.compareSync(password, user.password)
                if(!validPassword) return res.json({message: "Wrong password"})
                else {
                    const token = generateAccessToken(user.userID, user.email)
                    return res.json({token})
                }
            } else {
                res.json({message: 'Wrong email'})
            }
        })
        .catch(err => {
            res.json({message: 'Error'})
        })
    }

    async isLogin(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            if(!token) return res.json({message: 'USER IS NOT LOGIN'})
            const payload = jwt.verify(token, secretKey.key)
            res.json(payload)
        } catch (error) {
            res.json({message: 'USER IS NOT LOGIN'})
        }
        
    }

}

module.exports = new authController