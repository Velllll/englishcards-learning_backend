const Router = require('express')
const authController = require('../controllers/auth.controller')
const router = new Router

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/islogin', authController.isLogin)

module.exports = router