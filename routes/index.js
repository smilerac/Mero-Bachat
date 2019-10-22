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
  logininfo.find().exec((err,LoginInfo) => {
    console.log('login info...........',LoginInfo);
    res.render('index',{LoginInfo}); //sends 'movies' data to 'viewMovies' view
  })
});

router.get('/signup', function(req, res, next) {
  res.render('signUp');
});

router.get('/income', function(req, res, next) {
  res.render('income');
});

router.post('/loginverify', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
    var email = req.body.email;
    var password = req.body.password;

    logininfo.findOne({email : email, password : password}, function(err,user){
      if(err){
        console.log(err)
        return res.status(500).send()
        // res.render('404wrong');
      }
     

      // if( (req.body.email != this.email) || (req.body.email != this.email)){
      //   res.render('404wrong');
      // }

      // if( (logininfo.email === email) && (logininfo.email === email)){
      //   res.redirect('/home')
      // }

      if(!email){
        // return res.status(404).send();
        res.render('404user');
      }
      // return res.status(200).send()
      res.redirect('/home')
  }) 
})
  


//for sign up
router.post('/addaccount', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var LoginInfo = new logininfo({ //from top of the page, i. e variable name of model //new object instantiated
    email : req.body.email,
    password : req.body.password
  }) 
  var promise = LoginInfo.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((LoginInfo) => {//if you use normal promise
    console.log('login info', LoginInfo)
    res.redirect('/')
  }).catch(err=> console.log(err+"could not save....."))
});

// router.post('/addaccount', function(req, res, next) {
//   name : req.body.name,
//     description : req.body.description,
//     cast : req.body.cast,
//     genre: req.body.genre
//     res.render('login');
// });

module.exports = router;
