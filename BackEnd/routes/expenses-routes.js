const express = require('express');
const router = express.Router();

const ExpenseModel = require('../models/ExpenseModel.js');


const passport = require('passport');
const { update } = require('../models/ExpenseModel.js');
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
        const formData = {
            user: req.body.user,
            itemname: req.body.itemname
          
        }
        ExpenseModel.find(formData)
        
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
       
    },

)

// http://localhost:3001/products/find
router.post('/find',
    function(req, res) {

            const formData = {
            user: req.body.user,
            datestring: req.body.datestring
          
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
                console.log('/findproduct error', error);

                res.send('An error occured');
            }
        );

    }
);

// http://localhost:3001/users/update
router.put(
    '/update',
    // passport.authenticate('jwt', {session: false}),
    async function(req, res) {

        const formData = {
            user: req.body.user,
            datestring: req.body.datestring
          
        }
        
        let updates = {}
        let total2;
        let qty2;
        let price2;
        if (req.body.itemname) {
            updates['itemname'] = req.body.itemname;
        };
        if (req.body.quantity) {
            updates['quantity'] = req.body.quantity;
           
        };
        if (req.body.unitprice) {
            updates['unitprice'] = req.body.unitprice;
            
        };
      

       

        
        ExpenseModel
        .findOneAndUpdate(
            {
                user: req.body.user,
                datestring: req.body.datestring
            },
            {
                $set: updates,
                total: req.body.quantity*req.body.unitprice
            },
            {
                new: true
            }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/expenses/update error', error);
                res.send('An error occured');
            }
        )

    }
);

router.delete('/delete',
    function(req,res){
        const formData2 = {
            user: req.body.user,
            datestring: req.body.datestring
          
        }
            
          
        
        ExpenseModel
        .deleteOne(formData2)
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('expense deltion error', error);
                res.send('An error occured with expense deletion');
            }
        )

    }
)

module.exports = router;