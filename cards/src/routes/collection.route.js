const Router = require('express')
const route = new Router()

const collectionController = require('../controllers/collection.controller')
const checkUsetMiddleware = require('../middlewares/checkUser')

route.post('/create-collection',checkUsetMiddleware, collectionController.createCollection)
route.post('/start-learn',checkUsetMiddleware, collectionController.startLearnCollection)
route.get('/get-collections',checkUsetMiddleware, collectionController.getCollections)
route.get('/get-collection/:collectionID',checkUsetMiddleware, collectionController.getCollection)
route.put('/update-collection', checkUsetMiddleware, collectionController.editCollection)
route.delete('/delete-collection/:collectionID', checkUsetMiddleware, collectionController.deleteCollection)

module.exports = route