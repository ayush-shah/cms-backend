const express = require('express');
const router = express.Router()
const productModel = require('../Model/product');
const categoryModel = require('../Model/category');

router.get('/', async (req, res) => {
    try {
        const allProducts = await productModel.find()
        res.json(allProducts)
    }
    catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})

router.get('/id=:id', async (req, res) => {
    try {
        const allProducts = await productModel.findById(req.params.id)
        res.json(allProducts)
    }
    catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})

router.get('/category', async (req, res) => {
    try {
        const allCategories = await productModel.find()
        let categories = [];
        allCategories.map(data => {
            categories.push(data.category)
        })
        res.json([...new Set(categories)])
    }
    catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})

router.get('/limit=:limit?&skip=:skip?', async (req, res) => {
    try {
        const allProducts =
            req.params.limit && req.params.skip ?
                await productModel.find().limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)) :
                await productModel.find()
        res.json(allProducts)
    } catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})


router.post('/insert', async (req, res) => {
    const newProduct = new productModel({
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description,
        imageLink: req.body.imageLink
    })
    try {
        const insertProduct = await newProduct.save();
        insertProduct['status'] = 200
        res.json(insertProduct)
    }
    catch (err) {
        res.json({ message: err })
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const removedProduct = await productModel.remove({ _id: req.params.id })
        console.log(removedProduct.status)
        res.json({ message: 'Deleted Successfully', id: req.params.id })
    }
    catch (err) {
        res.json({ message: err })
    }
});

module.exports = router