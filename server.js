var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport')
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
var variables = require('./Public/variables.js');
app.set('view engine', 'ejs')
var jsdom = require('jsdom/lib/old-api').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
const MongoStore = require('connect-mongo')(session);
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const jquery = require('jquery');

const bootstrap = require('bootstrap');
var db
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://vacinamaster:123456@ds035703.mlab.com:35703/vacinas', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(2700, () => {

    console.log('listening on 2700')
  })
})

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({
    url: 'mongodb://vacinamaster:123456@ds035703.mlab.com:35703/vacinas'
  })
}));


app.use(passport.initialize());
app.use(passport.session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({
    url: 'mongodb://vacinamaster:123456@ds035703.mlab.com:35703/vacinas'
  })
}));





            
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
    
  } else {
    var err = new Error('Você precisa estar logado para ver esta página.');
    return res.redirect('/');
    console.log(req.session)
    err.status = 401;
    return next(err);
    
  }
}

function authLogin(req, res, next) {
  if (req.session && req.session.userId) {
 
    return res.redirect('/vacinas');
  } else {

    return next();
    
  }
}






app.get('/vacinas', requiresLogin, (req, res) => {

    db.collection('vacinas').find().toArray((err, result) => {

      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {vacinas: result})

    })
  })


  
    
    


app.get('/', authLogin, function(req, res) {    
    res.sendFile('/Users/rhaeg/Desktop/Project/index.html')
})


app.get('/registrar',  function(req, res) {
  res.sendFile('/Users/rhaeg/Desktop/Project/register.html')
})



app.get('/vacinas', (req, res) => {
    var cursor = db.collection('quotes').find()
    db.collection('vacinas').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
      })
    
  })

  var methodOverride = require('method-override')
  app.use(methodOverride('_method'));

  app.use(bodyParser.json())


  app.put('/update-document', (req, res) => {
    console.log('car')
    db.collection('vacinas')
    .findOneAndUpdate({nomevc: sel_id.old}, {
      $set: {
        nomevc: req.body.nomevc,
        Date: req.body.Date,
        lastupdate: req.body.current_date
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      return res.redirect('/Vacinas');
      res.send(result)
      
    })
    // Handle put request
    
  })

  app.delete('/delete-document', (req, res) => {
    console.log('car')
    db.collection('vacinas').findOneAndDelete({nomevc: sel_id.old},
    (err, result) => {
      if (err) return res.send(err)
      return res.redirect('/Vacinas');
      res.send(result)
    })
  })


app.use(express.static('/Users/rhaeg/Desktop/Project/Public'));

app.post('/variable', (req, res) => {
  sel_id = (req.body)
console.log(sel_id.old)
})

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


app.post('/vacinas', (req, res) => {
  var car = (req.body)
    db.collection('vacinas').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/Vacinas')
        console.log(car.nomevc)


    })
})






//create schema
var User = require('./Public/users.js');





app.post('/registrar',
[  check('password', 'passwords must be at least 5 chars long and contain one number')
  .isLength({ min: 5 })
  .matches(/\d/),
], function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }

  if (req.body.nome_completo &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      nome_completo: req.body.nome_completo,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        req.session.userId = user._id;
        return res.redirect('/vacinas');
      }
    });

  } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }

});



//POST when login
             app.post('/login', function(req, res, next) {
              if (req.body.username && req.body.password) {
                User.authenticate(req.body.username, req.body.password, function (error, user) {
                  if (error || !user) {
                    var err = new Error('Usuário ou senha incorreta.');
                    err.status = 401;
                    return next(err);
                  }  else {
                    req.session.userId = user._id;
                    return res.redirect('/vacinas');
                  }
                });
              } else {
                var err = new Error('Usuário e senha são necessários.');
                err.status = 401;
                return next(err);
              }
            });
