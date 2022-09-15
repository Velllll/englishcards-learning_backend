# Discription 

Backend for englishcards-learning app with microservices architecture

# API URLS 

## Authorization

function: registration
type: post
link: /auth/registration
params: email, password

function: login
type: post
link: /auth/login
params: email, password

function: islogin
type: get
link: /auth/islogin

## Collection 

function: create collection
type: post
link: /api/create-collection
params: name

function: get collections
type: get
link: /api/get-collections

function: get collection
type: get
link: /get-collection/:collectionID

function: update-collection
type: update
link: /api/update-collection
params: name, collectionID

function: start learn
type: post
link: /api/start-learn
params: collectionID

function: update collection's name
type: put
link: /api/update-collection
params: name, collectionID

function: delete collection
type: delete
link: /delete-collection/:collectionID

## Cards 

function: create card
type: post
link: /api/create-card
params: collectionID, frontSide, backSide

function: get card
type: get
link: /api/get-cards/:collectionID'

function: get all cards
type: get
link: /api/get-all-cards

function: get card
type: get
link: /api/get-card/:cardID

function: update card
type: put
link: /api/update-card
params: frontSide, backSide, collectionID, cardID

function: delete card
type: delete
link: /delete-card/:cardID
