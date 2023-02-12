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
        const formData = {
            user: req.body.user,
            itemname: req.body.itemname
          
        }
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
       
    },

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

// http://localhost:3001/users/update
router.put(
    '/update',
    // passport.authenticate('jwt', {session: false}),
    async function(req, res) {

        let updates = {}

        if (req.body.firstName){ 
            updates['firstName'] = req.body.firstName 
        };
        if (req.body.lastName) {
            updates['lastName'] = req.body.lastName;
        };
        if (req.body.phone) {
            updates['phone'] = req.body.phone;
        };

        if (req.body.password) {
            bcryptjs.genSalt(

                function(bcryptError, theSalt) {
                // Use the (a) and (b) salt user's password 
                // and produce hashed password
                    bcryptjs.hash( 
                        req.body.password,                  // first ingredient
                        theSalt,                            // second ingredient
                        function(hashError, theHash) {      // the hash
                            // Reassign the original password formData
                            updates['password'] = theHash;

                        }
                    )
                }
            )
        };


        // If avatar file is included...
        if( Object.values(req.files).length > 0 ) {

            const files = Object.values(req.files);
            
            
            // upload to Cloudinary
            await cloudinary.uploader.upload(
                files[0].path,
                (cloudinaryErr, cloudinaryResult) => {
                    if(cloudinaryErr) {
                        console.log(cloudinaryErr);
                        res.json(
                            {
                                status: "not ok",
                                message: "Error occured during image upload"
                            }
                        )
                    } else {
                        // Include the image url in updates
                        updates.avatar = cloudinaryResult.url;
                        console.log('updates.avatar', updates.avatar)
                    }
                }
            )
        };


        UserModel
        .findOneAndUpdate(
            {
                "email": req.body.email
            },
            {
                $set: updates
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
                console.log('/users/update error', error);
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