const Router = require('express')
const route = new Router()

const checkUsetMiddleware = require('../middlewares/checkUser')
const cardsController = require('../controllers/cards.controller')

route.post('/create-card', checkUsetMiddleware, cardsController.createCard)
route.get('/get-cards/:collectionID', checkUsetMiddleware, cardsController.getCards)
route.get('/get-all-cards', checkUsetMiddleware, cardsController.getAllCards)
route.get('/get-card/:cardID', checkUsetMiddleware, cardsController.getCard)
route.put('/update-card', checkUsetMiddleware, cardsController.editCard)
route.delete('/delete-card/:cardID', checkUsetMiddleware, cardsController.deleteCard)

module.exports = route