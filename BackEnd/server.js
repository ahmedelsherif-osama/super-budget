const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const cors = require('cors');
const expressFormData = require('express-form-data');
require('dotenv').config();

const UserModel = require('./models/UserModel.js');
const ExpenseModel = require('./models/ExpenseModel');
const usersRoutes = require('./routes/users-routes.js');
const productsRoutes = require('./routes/products-routes.js');
const expensesRoutes = require('./routes/expenses-routes');

// Configure middleware for express
server.use( bodyParser.urlencoded( {extended: false} ) );
server.use( bodyParser.json() );
server.use(cors());
server.use(expressFormData.parse());

const dbURL = process.env.DB_URL;




/**
 * ------------------------------------------------------------------------------
 * START
 * PassportJS Integration
 */

// Use passport, passport-jwt to read the clien't jwt
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = process.env.JWT_SECRET;

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
}

// This function will tell passport how what to do
// with the payload.
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                // Tell passport what to do with payload
                UserModel
                .findOne({ _id: jwtPayload._id })
                .then(
                    (dbDocument) => {
                        // The done() function will pass the 
                        // dbDocument to Express. The user's 
                        // document can then be access via req.user
                        return done(null, dbDocument)
                    }
                )
                .catch(
                    (err) => {
                        // If the _id or anything is invalid,
                        // pass 'null' to Express.
                        if(err) {
                            console.log(err);
                        }
                        return done(null, null)
                    }
                )

            }
        )
    )
};
passportJwt(passport);


// Import and configure Cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

/**
 * ------------------------------------------------------------------------------
 * END
 * PassportJS Integration
 */








const dbConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose
.connect(dbURL, dbConfig) // Promise
.then(
    function() {
        console.log('DB is connected.')
    }
)
.catch(
    function(connectionError) {
        console.log('Connection error', connectionError);
    }
);

server.post(    '/addexpense',
function(req, res){
    let newDocument={
       "unitprice": req.body.unitprice,
       "itemname": req.body.itemname,
       "brand": req.body.brand,
       "quantity": req.body.quantity,
        "user": req.body.user
       
       
     
    }
    ExpenseModel
    .create(newDocument)
    .then(
        function(dbDocument){
            res.json.dbDocument;
        })
    .catch();

    console.log(req.body.price);
    res.send("data received expense")
}
)

server.get('/',
    function(req, res) {
        res.send("Hello!");
    }
);


// http://localhost:3001/users/
server.use(
    '/users', 
    usersRoutes
);

// http://localhost:3001/products/
server.use('/products', productsRoutes);

// http://localhost:3001/products/
server.use('/expenses', expensesRoutes);


server.post('/find',
    function(req, res) {

        // req.body.brand
        
        ExpenseModel
        .find(
            { "user": req.body.user}
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/findproduct error', error);

                res.send('An error occured');
            }
        );

    }
);






server.listen(
    process.env.PORT,
    function() {
        console.log('Running on http://localhost:3001/')
    }
);