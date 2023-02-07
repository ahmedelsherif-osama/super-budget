const express = require('express');
const router = express.Router();

const ExpenseModel = require('../models/ExpenseModel.js');


const passport = require('passport');
router.post('/viewbydate',
    //passport.authenticate('jwt', {session: false}),
    function(req, res) {
        const formData = {
            user: req.body.user,
          
        }

        ExpenseModel
        .find(formData)
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {

                console.log('/find error', error);

                res.send('An error occured');

            }
        )
    }
);

router.post('/viewbyitem',
    function(req, res){
        req.body.user,
        req.body.itemname,
        ExpenseModel.find(
            {
                "user":req.body.user,
                "itemname":req.body.itemname
        }
        )
        .then(
            function(dbDocument){
                res.json(dbDocument);
            }
        )
        .catch(
             function(error) {
                console.log('/findexpense error', error);

                res.send('An error occured in finding the expense');
            }
        )
       
    }

)

// http://localhost:3001/products/find
router.post('/find',
    function(req, res) {

        // req.body.brand
        
        ProductModel
        .find(
            { "brand": req.body.brand }
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

module.exports = router;