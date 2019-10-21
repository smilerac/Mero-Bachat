var express = require('express');
var router = express.Router();
var logininfo = require('../models/loginmodel')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/login', function(req, res, next) {
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('index');
});

router.post('/addaccount', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var LoginInfo = new logininfo({ //from top of the page, i. e variable name of model //new object instantiated
    username : req.body.name,
    password : req.body.password
  }) 
  var promise = LoginInfo.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((LoginInfo) => {//if you use normal promise
    console.log('login info', LoginInfo)
    res.redirect('/home')
  })
});

// router.post('/addaccount', function(req, res, next) {
//   name : req.body.name,
//     description : req.body.description,
//     cast : req.body.cast,
//     genre: req.body.genre
//     res.render('login');
// });

module.exports = router;
