const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')

const app = express()
require('./config/passport')(passport)


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use('/public', express.static('public'));

mongoose.connect('mongodb://localhost:27017/Flora-x',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',(err)=>console.error(error))
db.once('open',()=>console.log('connected to database!'))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,  
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

const registerRouter = require('./routes/register')
app.use('/',registerRouter)

const plantRouter = require('./routes/plants')
app.use('/',plantRouter) 

const basketRouter = require('./routes/basket')
app.use('/',basketRouter) 

app.listen("https://dheerajmandava.github.io/Flora-X/login",3000)