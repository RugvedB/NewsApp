const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkAuth=require('./checkAuth')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secretkey'


users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today
    }

    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
                .then(user => {
                  res.json({ status: user.email + 'Registered!' })
                })
                .catch(err => {
                  res.send('error: ' + err)
                })
            })
          } else {
            res.json({ error: 'User already exists' })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    })



    users.post('/login', (req, res) => {
        User.findOne({
          email: req.body.email
        })
          .then(user => {
            console.log('user exists '+user)
            if (user) {
              if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                console.log("pass match")
                const payload = {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                console.log("token "+token)
                res.send(token)
              } else {
                // Passwords don't match
                res.json({ error: 'Password doesnt match' })
              }
            } else {
              res.json({ error: 'User does not exist' })
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      })

//This route is not actually used in front end.
//In front end we generate and store the token on the basis of mail,password and secretkey.....so when we decode the token we get the mail,password.....and thus we get all info by decoding token
users.get('/profile', (req, res) => {
    //pass it without bearer in this case.....jwt.verify takes token without keyword 'Bearer '
    console.log(req.headers['authorization'])
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//////////////////////////////////////////////////////////////////
const multer = require('multer')
const storage=multer.diskStorage({
  destination:function(req,file,cb){
      
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    
    cb(null,file.originalname + new Date().toISOString())
  }
})

const fileFilter=(req,file,cb)=>{
  //reject file
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
      cb(null,true)
  }
  else{
      cb(null,false)
  }
  
  
}

const upload=multer({
  storage:storage,
  limits:{
      fileSize:1024*1024*5
  },
  fileFilter:fileFilter
})
//////////////////////////////////////////////////////////////////


users.post('/upload',checkAuth, upload.single('filekey'),(req, res, next) => {
    console.log(req.headers)
    console.log(req.body.caption)
    console.log(req.body.creator)
    console.log(req.headers['authorization'])
    
    
    res.send({caption:req.body.caption,name:req.body.creator,header:req.headers['authorization']})
})




module.exports = users



