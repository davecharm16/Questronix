const { Products, Warehouse } = require('../models');

//Controllers
module.exports.postProduct = async (req, res) =>{
    const product = req.body;
    try {
        const prod = await Products.create(product);
        return res.json({'status': 'success', 'message': 'New Product Created', 'data' : prod});
    } catch (error) {
        console.log('error creating product : ' +error)
        return res.json({'status': 'error', 'message' : 'error in creating product'});
    }
}

module.exports.getProducts = async (req, res) =>{
    try {
        const products = await Products.findAll({
            include: [{
                model: Warehouse,
            }]
        });
        if(products)
            return res.json({'status': 'success', 'message': 'Fetch All Data Success', 'data' : products});
        return res.json({'status': 'fail', 'message': 'Fetch All Data Success', 'data' : []});
    } catch (error) {
        console.log('Error getting all products: ' + error);
        return res.json({'status': 'failed', 'message': 'error in getting all products :' + error})
    }
}

module.exports.getSpecificProduct = async (req, res) =>{
    const {id} = req.params;
    
    try {
        const product =  await Products.findOne({
            where : {product_id : id},
            include: [{
                model: Warehouse,
            }]
        })
        if (product)
            return res.json({'status': 'success', 'message': 'Fetch a Product Success', 'data' : product})
        return res.json({'status': 'fail', 'message': 'No Product Found', 'data' : []})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in a product : ' + error})
    }
}

module.exports.getAllSorted = async (req, res) =>{
    try {
        const products = await Products.findAll({
            order : [
                [
                'date_manufactured', 'DESC'
                ]
            ],
            include: [{
                model: Warehouse,
            }]
        })
        if(products)
            return res.json({'status': 'success', 'message': 'Fetch a Product Success', 'data' : products})
        return res.json({'status': 'fail', 'message': 'No Products Found', 'data' : []})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in getting all products :' + error})
    }
}

module.exports.updateProduct = async (req, res) =>{
    const {id} = req.params;
    const product_info = req.body;

    try {
        const product = await Products.update(product_info, {
            where : {
            product_id : id
            },
            include: [{
                model: Warehouse,
            }]
        })
        if(product[0]!= 0){
            const prod = await Products.findOne({
            where:{
                product_id : id
            },
            include: [{
                model: Warehouse,
            }]
        });
            return res.json({'status': 'success', 'message': 'Update Product Success', 'data' : prod})
        }
        return res.json({'status': 'fail', 'message': 'Update Product fail', 'data' : product_info})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in updating product :' + error})
    }
}

module.exports.updateProductDisable = async (req, res) =>{
    const {id} = req.params;
    try {
        const product = await Products.update({'active': false}, {
            where : {
            product_id : id
            },
            include: [{
                model: Warehouse,
            }]
        })
        if(product[0] != 0){
            const prod = await Products.findOne({
            where:{
                product_id : id
            },
            include: [{
                model: Warehouse,
            }]});
            return res.json({'status': 'success', 'message': 'Update Product Success', 'data' : prod})
        }
        return res.json({'status': 'fail', 'message': 'Update Product fail, No product found', 'data' : []})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in updating product :' + error})
    }
}


module.exports.getActive = async (req, res) =>{
    try {
        const product =  await Products.findAll({
            where : {active : true},
            include: [{
                model: Warehouse,
            }]
        })
        if (product)
            return res.json({'status': 'success', 'message': 'Fetch Products Success', 'data' : product})
        return res.json({'status': 'fail', 'message': 'No Products Found', 'data' : []})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in a product : ' + error})
    }
}

module.exports.getInactive = async (req, res) =>{
    try {
        const product =  await Products.findAll({
            where : {active : false},
            include: [{
                model: Warehouse,
            }]
        })
        if (product)
            return res.json({'status': 'success', 'message': 'Fetch Products Success', 'data' : product})
        return res.json({'status': 'fail', 'message': 'No Products Found', 'data' : []})
    } catch (error) {
        return res.json({'status': 'failed', 'message': 'error in a product : ' + error})
    }
}


module.exports.deleteProduct = async (req, res) =>{
    const { id } = req.params;
    
    try {
        const destroy = await Products.destroy({
            where : {
                product_id : id
            },
            include: [{
                model: Warehouse,
            }]
        })
        console.log(destroy)
        if(destroy != 0)
            return res.json({'status': 'success', 'message': 'Successfully Deleted'})
        return res.json({'status': 'fail', 'message': 'Delete Failed '})
    } catch (error) {
        return res.json({'status': 'fail', 'message': 'Delete Error ' + error})
    }
}