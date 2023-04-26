const express = require('express');
const router = express.Router();
const {postProduct, getProducts, getSpecificProduct, getAllSorted, updateProduct, updateProductDisable, getActive, deleteProduct, getInactive} = require('../controller/ProductController');

// POST - CREATE  NEW PRODUCT ROUTE/ENDPOINT
router.post('/', postProduct);

// GET - list all Products
router.get('/all', getProducts);

// GET -  list all active products  
router.get('/active', getActive);

// GET -  list all active products  
router.get('/inactive', getInactive);

// GET - show information on specific product using Product ID as a parameter. 
router.get('/:id', getSpecificProduct);

// GET - list of Products sorted in descending based on date manufactured. 
router.get('/all/sorted', getAllSorted);

//PUT - update product information using Product ID as parameter. 
router.put('/:id', updateProduct);

// PUT – disable specific product using active field. 
router.put('/disable/:id', updateProductDisable);

// DELETE – delete specific product using Product ID as a parameter. 
router.delete('/:id', deleteProduct)

module.exports = router