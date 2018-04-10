const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const jwt = require('express-jwt');


//app.use(jwt({ secret: 'Car-Deals-2017shhhhHHHHH'}).unless({path: ['/hello','/dealer/signup','/dealer/login','/car/upload-image','/uploads']}));
// path = require('path')
// serveStatic = require('serve-static')
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'))
// })
// app.use('/', serveStatic(path.join(__dirname, 'dist'), {
//   setHeaders: function (res, path, stat) {
//       res.set('Access-Control-Allow-Origin', '*')
//       res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
//       // res.set('Cache-Control', 'public, max-age=259200')
//   },
//   // maxAge: (5 * 60) * 1000,
//   dotfiles: 'ignore'
// }))

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Authorization token');
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});


app.use('/uploads', express.static('app/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./app/routes'));

var dbConnect = require("./app/config/db");

const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
  console.log('this Example app listening on port ', PORT);
});

// app.listen(3030, function () {
//   console.log('Example app listening on port 3030!');
// });

dbConnect.connect(function(err,db){
  if(err) {
    console.log(err, "Error in connecting database");
  } else{

    //console.log(db, "Database connected");
  }  
})