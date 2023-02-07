const express = require('express');
const router = express.Router();

const ProductModel = require('../models/ProductModel.js');

// http://localhost:3001/products/add
router.post('/add',
    function(req, res) {

        // Receive data for MongoDB
        let newDocument = {
            "brand": req.body.brand,
            "model": req.body.model,
            "price": req.body.price,
            "color": req.body.color
        }

        // Create the document in MongoDB
        ProductModel
        .create(newDocument)
        .then(
            function(dbDocument) {
                // Send the document to client
                res.json(dbDocument)
            }
        )
        // Otherwise, if error occurs catch it...
        .catch(
            function(error) {
                console.log('/addproduct error', error);

                res.send('An error occured');
            }
        );
    }
);

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