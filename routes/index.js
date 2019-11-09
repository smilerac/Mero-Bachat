var express = require('express');
var router = express.Router();
var logininfo = require('../models/loginmodel')
var incomeinfo = require('../models/incomemodel')
var iexpenseinfo = require('../models/Immediateexpensemodel')
var texpenseinfo = require('../models/trueexpensemodel')
var pexpenseinfo = require('../models/pleasureexpensemodel')
var mygoals = require('../models/goalsmodel')
const sgMail = require('@sendgrid/mail');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/notify', function(req, res, next) {
  var notification
sgMail.setApiKey('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');
const msg = {
  to: 'smilerac15@gmail.com',
  from: 'merobachat2019@gmail.com',
   subject: 'Mero Bachat daily mail: About Your Goal',
  text: 'You have reached your goal',
  html: '<strong>You have reached your goal!</strong>',
};
sgMail.send(msg,(err,json) => {
  if(err){
     notification = "Sorry, Could not send the mail"
    return res.send('erooooooorrrrrr!!!')}
console.log(json)
res.send('Yayyyyy')
 notification = "Email sent!!"
  
//temporarily
incomeinfo.find().exec((err, incomes) => {
  var iaddall = 0
  console.log('name...........',incomes);
  for(var i in incomes){    
    iaddall = iaddall + incomes[i].amount
  }
  iexpenseinfo.find().exec((err, expenses) => {
    var eaddall = 0
    for(var i in expenses){    
      eaddall = eaddall + expenses[i].amount
      console.log('amount...........',expenses.amount);
    }
  mygoals.find().exec((err, goals) => {
    var gaddall = 0
    for(var i in goals){    
      gaddall = gaddall + goals[i].amount
      console.log('amount...........',goals.amount);
      var sav = iaddall - eaddall

      res.render('saving',{sav,gaddall,notification});
    }
  })
})
})
//
})


});


// sgMail.setApiKey('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');
// const msg = {
//   to: 'lee94saajan@gmail.com',
//   from: 'merobachat2019@gmail.com',
//   subject: 'Mero Bachat daily mail: About Your Goal',
//   text: 'You have reached your goal',
//   html: '<strong>You have reached your goal!</strong>',
// };
// router.get('/notify', function(req, res, next) {
// sgMail.send(msg,function(err,json){
//   if(err){return res.send('erooooooorrrrrr!!!')}
// console.log(json)
// res.send('Yayyyyy')});

// });

router.get("/saving", function (req, res, next) {

  incomeinfo.find().exec((err, incomes) => {
    var iaddall = 0
    console.log('name...........',incomes);
    for(var i in incomes){    
      iaddall = iaddall + incomes[i].amount
    }
    iexpenseinfo.find().exec((err, expenses) => {
      var eaddall = 0
      for(var i in expenses){    
        eaddall = eaddall + expenses[i].amount
        console.log('amount...........',expenses.amount);
  
      }
    mygoals.find().exec((err, goals) => {
      var gaddall = 0
      for(var i in goals){    
        gaddall = gaddall + goals[i].amount
        console.log('amount...........',goals.amount);
        var notification = null
        var sav = iaddall - eaddall
        res.render('saving',{sav,gaddall,notification});
    }
    })
  })
})
});



    





router.get('/login', function(req, res, next) {
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// res.render('dashboard/barchart', { 
//   title: 'My First Bar Chart',
//   datai: JSON.stringify(number_of_posts_data),
//   labeli: JSON.stringify(month_data)
//  });


router.get('/home', function(req, res, next) {
  logininfo.find().exec((err,LoginInfo) => {
    console.log('login info...........',LoginInfo);
    // res.render('index',{LoginInfo}); //sends 'movies' data to 'viewMovies' view

    incomeinfo.find().exec((err, incomes) => {
      // var iaddall = 0
      // console.log('name...........',incomes);
      // for(var i in incomes){    
      //   iaddall = iaddall + incomes[i].amount
      // }
      iexpenseinfo.find().exec((err, expenses) => {
        // var eaddall = 0
        // for(var i in expenses){    
        //   eaddall = eaddall + expenses[i].amount
        //   console.log('amount...........',expenses.amount);
    
        // }
      mygoals.find().exec((err, goals) => {
        // var gaddall = 0
        // for(var i in goals){    
        //   gaddall = gaddall + goals[i].amount
        //   console.log('amount...........',goals.amount);
        //   var notification = null
        //   var sav = iaddall - eaddall
          // res.render('saving',{sav,gaddall,notification});
          res.render('index',{LoginInfo,incomes,expenses,goals}); 
      // }
      })
    })
  })
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
  var iaddall = 0
  incomeinfo.find().exec((err,incomes) => {
    // console.log('name...........',incomes);
    for(var i in incomes){    
      iaddall = iaddall + incomes[i].amount
      console.log('amount...........',incomes.amount);

    }
    res.render('income',{incomes,iaddall}); //sends 'movies' data to 'viewMovies' view
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


//expense CRUD
router.get('/expense', function(req, res, next) {
  var eaddall = 0
  iexpenseinfo.find().exec((err,expenses) => {
    // console.log('name...........',incomes);
    for(var i in expenses){    
      eaddall = eaddall + expenses[i].amount
      console.log('amount...........',expenses.amount);

    }
    res.render('expense',{expenses,eaddall}); //sends 'movies' data to 'viewMovies' view
  })
});

router.post('/saveiexpense', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var IExpenseInfo = new iexpenseinfo({ //from top of the page, i. e variable name of model //new object instantiated
    name : req.body.name,
    amount : req.body.amount
  }) 
  var promise = IExpenseInfo.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((IExpenseInfo) => {//if you use normal promise
    console.log('login info', IExpenseInfo)
    res.redirect('/expense')
  }).catch(err=> console.log(err+"could not save....."))
});

router.get('/expense/:expenseId', function(req, res, next) {
  var expenseId = req.params._id;
  
  iexpenseinfo.findOne({ _id : req.params.expenseId}, function(err, expenses){
    // var movie = item => item._id === movieId
    res.render('eachexpense',{expenses}); //sends 'movies' data to 'viewOne' view
  })
})

router.get('/editexpense/:expenseId', function(req, res, next) {
    // var movieId = req.params.id;
    // Movies.findOne({_id: req.params.movieId}, function(err, movie){
    //   console.log('moviesssssss', movie)
    // }
    //console.log(req.paramsmovieId)
    
    iexpenseinfo.findOne({ _id : req.params.expenseId}, function(err, oneexpense){
      // var movie = item => item._id === movieId
      res.render('expenseform',{oneexpense}); //sends 'movies' data to 'viewOne' view
    })
  })
  
  router.post('/saveexpense/:expenseId', function(req, res, next) {//all data is in req.body
    console.log(req.body) //shows value in terminal
    iexpenseinfo.findOneAndUpdate({ _id : req.body._id}, {$set: req.body}, function(err, expenses){
     // console.log(movieId+"this is iddddd")
      res.redirect("/expense")
    })
  });

  router.get('/removeexpense/:expenseId', function(req, res, next){
    iexpenseinfo.deleteOne({ _id : req.params.expenseId}, function(err, expenses){
     // console.log(movieId + 'heyyyy')
      // var movie = item => item._id === movieId
     res.redirect("/expense")
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




// router.get('/expense', function(req, res, next) {
//   var locals = {};
//     var tasks = [
//           // Load users
//           function(callback) {
//               db.collection('iexpenses').find({}).toArray(function(err, iexpenses) {
//                   if (err) return callback(err);
//                   locals.iexpenses = iexpenses;
//                   callback();
//               });
//           },
//           // Load colors
//           function(callback) {
//               db.collection('texpenses').find({}).toArray(function(err, texpenses) {
//                   if (err) return callback(err);
//                   locals.texpenses = texpenses;
//                   callback();
//               });
//             }
          
//       ]

//       async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
//           if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
//           // Here `locals` will be an object with `users` and `colors` keys
//           // Example: `locals = {users: [...], colors: [...]}`
//           db.close();
//           res.render('profile/index', locals);
//       });
// })




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



//savings
router.get('/mygoals', function(req, res, next) {
  var gaddall = 0
  mygoals.find().exec(
    
    
    
    (err,goals) => {
    // console.log('name...........',incomes);
    for(var i in goals){    
      gaddall = gaddall + goals[i].amount
      console.log('amount...........',goals.amount);

    }
    res.render('goals',{goals,gaddall}); //sends 'movies' data to 'viewMovies' view
  })
});



router.post('/savegoal', function(req, res, next) {//all data is in req.body
  console.log(req.body) //shows value in terminal
  var MyGoals = new mygoals({ //from top of the page, i. e variable name of model //new object instantiated
    for : req.body.for,
    amount : req.body.amount
  }) 
  var promise = MyGoals.save()    //movie.save() returns promise so promise variable used only to represent
  //await promise //if you use async function
  promise.then((MyGoals) => {//if you use normal promise
    console.log('goals', MyGoals)
    res.redirect('/mygoals')
  }).catch(err=> console.log(err+"could not save....."))
});

router.get('/editgoal/:goalId', function(req, res, next) {
  incomeinfo.findOne({ _id : req.params.goalId}, function(err, goal){
    res.render('form',{goal}); //sends 'movies' data to 'viewOne' view
  })
})



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
