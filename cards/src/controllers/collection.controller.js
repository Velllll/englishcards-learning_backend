const db = require('../db/db')

class CollectionController {
    async createCollection(req, res) {
        const userID = req.userID
        const {name} = req.body
        const createDate = Date.now()
        db.query('INSERT INTO collections(userID, name, createDate, repeatDates) values(?, ?, ?, ?)', [userID, name, createDate, 'not started'])
        .then(response => {
            res.json(response[0])
        })
        .catch(err => {
            console.log(err)
            res.json(err.message)
        })
    }

    async getCollections(req, res) {
        const userID = req.userID
        db.query("SELECT * FROM collections WHERE userID = ?", [userID])
        .then(data => {
            const collectionsArray = data[0]
            const collections = sortCollections(collectionsArray)
            res.json(collections)
        })
    }

    async getCollection(req, res) {
        const userID = req.userID
        const collectionID = req.params.collectionID
        db.query("SELECT * FROM collections WHERE userID = ? AND collectionID = ?", [userID, collectionID])
        .then(data => {
            if(data[0][0].repeatDates !== 'not started') {
                const arrRepeat = JSON.parse(data[0][0].repeatDates)
                const collection = {...data[0][0], repeatDates: arrRepeat}
                res.json(collection)
            } else {
                res.json(data[0][0])
            }
        })
        .catch(err => {
            console.log(err)
            res.json({error: 'collection does not exist'})
        })
    }

    async editCollection(req, res) {
        const {name, collectionID} = req.body
        const userID = req.userID
        db.query("UPDATE collections SET name = ? WHERE userID = ? AND collectionID = ?", [name, userID, collectionID])
        .then(() => {
            res.json({status: 'successfully'})
        })
        .catch(err => {
            res.json({status: 'error'})
        })
    }

    async startLearnCollection(req, res) {
        const userID = req.userID
        const {collectionID} = req.body
        const startToday = Date.now()
        db.query("UPDATE collections SET repeatDates = ? WHERE userID = ? AND collectionID = ?", [
            getRepeatDates(startToday), 
            userID,
            collectionID
        ])
        .then(() => {
            res.json({status: 'successfully'})
        })
        .catch(err => {
            console.log(err)
            res.json(err.message)
        })
    }

    async deleteCollection(req, res) {
        const userID = req.userID
        const collectionID = req.params.collectionID
        db.query("DELETE FROM collections WHERE userID = ? AND collectionID = ?", [userID, collectionID])
        .then(() => {
            res.json({message: `collection was deleted`})
        })
        .catch(err => {
            console.log(err.message)
            res.json(err.message)
        })
    }
}

function sortCollections(collectionsArray) {
    const today = (new Date()).toLocaleDateString()
    const collection = {
        today: [],
        late: [],
        notStarted: [],
    }
    collectionsArray.forEach(i => {
        let item = i
        if(i.repeatDates !== "not started") {
            item = {...i, repeatDates: JSON.parse(i.repeatDates)}
        }
        if(item.repeatDates === "not started") {
            collection.notStarted.push(item)
        } else {
            const repeatArrDates = item.repeatDates.map(date => {
                return (new Date(date)).toLocaleDateString()
            })
            if(repeatArrDates.includes(today)) {
                collection.today.push(item)
            } else {
                collection.late.push(item)
            }
        }
    })
    return collection
}


function getRepeatDates(createDate) {
    const repeatArrDates = [];
    for(let i = 3; i <= 243; i = i * 3) {
        const date = new Date(createDate);
        date.setDate(date.getDate() + i);
        repeatArrDates.push(date.getTime());
    };
    return JSON.stringify(repeatArrDates);
}

module.exports = new CollectionController()
