const db = require('../db/db')

class CardsController {
    async createCard(req, res) {
        const userID = req.userID
        const {collectionID, frontSide, backSide} = req.body
        db.query('INSERT INTO cards(collectionID, userID, frontSide, backSide) values(?, ?, ?, ?)', [
            collectionID,
            userID, frontSide,
            backSide
        ])
        .then(data => {
            const newCardID = data[0].insertId
            res.json({cardID: newCardID})
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getCards(req, res) {
        const userID = req.userID
        const collectionID = req.params.collectionID
        db.query("SELECT * FROM cards WHERE collectionID = ? AND userID = ?", [collectionID, userID])
        .then(data => {
            const cards = data[0]
            res.json(cards)
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getCard(req, res) {
        const userID = req.userID
        const cardID = req.params.cardID
        db.query("SELECT * FROM cards WHERE cardID = ? AND userID = ?", [cardID, userID])
        .then(data => {
            const card = data[0]
            res.json(card[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getAllCards(req, res) {
        const userID = req.userID
        db.query("SELECT * FROM cards WHERE userID = ?", [userID])
        .then(data => {
            const cards = data[0]
            res.json(cards)
        })
        .catch(err => {
            console.log(err)
        })
    }

    async editCard(req, res) {
        const {frontSide, backSide, collectionID, cardID} = req.body
        const userID = req.userID
        db.query("UPDATE cards SET frontSide = ?, backSide = ? WHERE collectionID = ? AND cardID = ? AND userID = ?", [
            frontSide,
            backSide, 
            collectionID,
            cardID,
            userID,
        ])
        .then(() => {
            res.json({message: 'card updated'})
        })
        .catch(err => {
            console.log(err)
        })
    }

    async deleteCard(req, res) {
        const cardID = req.params.cardID
        const userID = req.userID
        db.query('DELETE FROM cards WHERE cardID = ? AND userID = ?', [cardID, userID])
        .then(() => {
            res.json({message: 'card was delete'})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = new CardsController()