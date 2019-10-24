var express = require('express');
var router = express.Router();
var logininfo = require('../models/loginmodel')
var incomeinfo = require('../models/incomemodel')
var iexpenseinfo = require('../models/Immediateexpensemodel')
var texpenseinfo = require('../models/trueexpensemodel')
var pexpenseinfo = require('../models/pleasureexpensemodel')
var mygoals = require('../models/goalsmodel')
// var async = require('async');
// var _ = require('lodash');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/saving', function(req, res, next) {
  res.render('saving');
});

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

router.get('/setgoal', function(req, res, next) {
  res.render('setgoal');
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.get('/income', function(req, res, next) {
  incomeinfo.find().exec((err,incomes) => {
    console.log('movies...........',incomes);
    res.render('income',{incomes}); //sends 'movies' data to 'viewMovies' view
  })
});

//income crud part
router.post('/addpocket', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var IncomeInfo = new incomeinfo({ //from top of the page, i. e variable name of model //new object instantiated
    name : req.body.name,
    amount : req.body.amount
  }) 
  var promise = IncomeInfo.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((IncomeInfo) => {//if you use normal promise
    console.log('login info', IncomeInfo)
    res.redirect('/income')
  }).catch(err=> console.log(err+"could not save....."))
});

router.get('/income/:incomeId', function(req, res, next) {
  // var movieId = req.params.id;
  // Movies.findOne({_id: req.params.movieId}, function(err, movie){
  //   console.log('moviesssssss', movie)
  // }
  //console.log(req.paramsmovieId)
  
  incomeinfo.findOne({ _id : req.params.incomeId}, function(err, oneincome){
    // var movie = item => item._id === movieId
    res.render('eachincome',{incomes:oneincome}); //sends 'movies' data to 'viewOne' view
  })
})

router.get('/edit/:incomeId', function(req, res, next) {
    // var movieId = req.params.id;
    // Movies.findOne({_id: req.params.movieId}, function(err, movie){
    //   console.log('moviesssssss', movie)
    // }
    //console.log(req.paramsmovieId)
    
    incomeinfo.findOne({ _id : req.params.incomeId}, function(err, oneincome){
      // var movie = item => item._id === movieId
      res.render('form',{incomes:oneincome}); //sends 'movies' data to 'viewOne' view
    })
  })
  
  router.post('/saveincome/:incomeId', function(req, res, next) {//all data is in req.body
    console.log(req.body) //shows value in terminal
    incomeinfo.findOneAndUpdate({ _id : req.body._id}, {$set: req.body}, function(err, movie){
     // console.log(movieId+"this is iddddd")
      res.redirect("/income")
    })
  });

  router.get('/remove/:incomeId', function(req, res, next){
    incomeinfo.deleteOne({ _id : req.params.incomeId}, function(err, incomes){
     // console.log(movieId + 'heyyyy')
      // var movie = item => item._id === movieId
     res.redirect("/income")
      // res.delete(onemovie); //sends 'movies' data to 'viewOne' view
    })
  })
// router.get('/test', function(req, res, next) {
//   res.render('incomecopy');
// });

//expense CRUD
// router.get('/expense', function(req, res, next) {
//   iexpenseinfo.find().exec((err,iexpenses) => {
//     console.log('expenses...........',iexpenses);
//     res.render('expense',{iexpenses}); //sends 'movies' data to 'viewMovies' view

//     texpenseinfo.find().exec((err,texpenses) => {
//       console.log('expenses...........',texpenses);
//       res.render('expense',{texpenses});

//     pexpenseinfo.find().exec((err,pexpenses) => {
//       console.log('expenses...........',pexpenses);
//       res.render('expense',{pexpenses});
//   })
// });




router.get('/expense', function(req, res, next) {
      var locals = {};
      var tasks = [
          // Load users
          function(callback) {
              db.collection('iexpenses').find({}).toArray(function(err, iexpenses) {
                  if (err) return callback(err);
                  locals.iexpenses = iexpenses;
                  callback();
              });
          },
          function(callback) {
            db.collection('pexpenses').find({}).toArray(function(err, pexpenses) {
                if (err) return callback(err);
                locals.pexpenses = pexpenses;
                callback();
            });
        },
          // Load colors
          function(callback) {
              db.collection('texpenses').find({}).toArray(function(err, texpenses) {
                  if (err) return callback(err);
                  locals.texpenses = texpenses;
                  callback();
              });
            }
            ]

      async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
          if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
          // Here `locals` will be an object with `users` and `colors` keys
          // Example: `locals = {users: [...], colors: [...]}`
          db.close();
          res.render('expense', {locals});
      });
    })
  
// å



// router.get('/expense', function(req, res, next) {
//   res.render('expense',[{iexpenses},{texpenses},{pexpenses}]);
// });

//Immediate obligation expense CRUD
// router.post('/saveiexpense', function(req, res, next) {//all data is in req.body
//   console.log(req.body) //shows value in terminal
//   var IExpenseInfo = new iexpenseinfo({ //from top of the page, i. e variable name of model //new object instantiated
//     name : req.body.name,
//     amount : req.body.amount
//   }) 
//   var promise = IExpenseInfo.save()    //movie.save() returns promise so promise variable used only to represent
//   //await promise //if you use async function
//   promise.then((IExpenseInfo) => {//if you use normal promise
//     console.log('login info', IExpenseInfo)
//     res.redirect('/iexpense')
//   }).catch(err=> console.log(err+"could not save....."))
// });

// //True expenses CRUD
// router.post('/savetexpense', function(req, res, next) {//all data is in req.body
//   console.log(req.body) //shows value in terminal
//   var TExpenseInfo = new texpenseinfo({ //from top of the page, i. e variable name of model //new object instantiated
//     name : req.body.name,
//     amount : req.body.amount
//   }) 
//   var promise = TExpenseInfo.save()    //movie.save() returns promise so promise variable used only to represent
//   //await promise //if you use async function
//   promise.then((TExpenseInfo) => {//if you use normal promise
//     console.log('login info', TExpenseInfo)
//     res.redirect('/texpense')
//   }).catch(err=> console.log(err+"could not save....."))
// });

// //True expenses CRUD
// router.post('/savepexpense', function(req, res, next) {//all data is in req.body
//   console.log(req.body) //shows value in terminal
//   var PExpenseInfo = new pexpenseinfo({ //from top of the page, i. e variable name of model //new object instantiated
//     name : req.body.name,
//     amount : req.body.amount
//   }) 
//   var promise = PExpenseInfo.save()    //movie.save() returns promise so promise variable used only to represent
//   //await promise //if you use async function
//   promise.then((PExpenseInfo) => {//if you use normal promise
//     console.log('login info', PExpenseInfo)
//     res.redirect('/pexpense')
//   }).catch(err=> console.log(err+"could not save....."))
// });

//goals CRUD

router.get('/mygoals', function(req, res, next) {
  res.render('goals');
});

router.post('/savegoal', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var MyGoals = new mygoals({ //from top of the page, i. e variable name of model //new object instantiated
    name : req.body.name,
    amount : req.body.amount
  }) 
  var promise = MyGoals.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((MyGoals) => {//if you use normal promise
    console.log('goals', MyGoals)
    res.redirect('/mygoals')
  }).catch(err=> console.log(err+"could not save....."))
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
     

      // if( (user.email != email) || (user.email != email)){
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
