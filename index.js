const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { userNewUrlParser: true })
    .then(() => {
        console.log('Mongo CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('Mongo OHH no error!')
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    // console.log(products) 1step
    // res.send('ALL PRODUCTS WILL BE HERE!') 1step
    res.render('products/index', { products })

})


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    // console.log(product);
    // res.send('details page')
    res.render('products/show', { product })
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000')
})

