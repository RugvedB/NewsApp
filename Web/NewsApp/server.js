//You need to replace with your username and password(MONGODB ATLAS)
//Also you need to put your api key for fetching news in client folder
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)




var Users = require('./routes/User')
app.use('/uploads',express.static('uploads'))
app.use('/users', Users)




mongoose.connect('mongodb+srv://'+'URSERNAME:'+'PASSWORD'+'@node-rest-shop-qoquv.mongodb.net/'+'login_register_mern_backend'+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


app.listen(port, function() {
    console.log('Server is running on port: ' + port)
})