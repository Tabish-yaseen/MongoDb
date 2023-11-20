const Product = require('../models/product');
const User=require('../models/user')
const Order=require('../models/order')

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .populate('cart.items.productId')
    .then(user => {
      const products=user.cart.items
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const user=req.user
  Product.findById(prodId).then((product)=>{
   return user.addToCart(product)
  }).then((result)=>{
    console.log(result)
    res.redirect('/cart');
  })
  
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const user=req.user
  user.deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userId=req.user._id
  User.findById(userId)
  .populate('cart.items.productId')
  .then(user=>{
    const order=new Order({
      products:user.cart.items,
      user:{
        name:req.user.name,
        userId:req.user._id
      }
    })
     return order.save()
    }).then((result)=>{
     return req.user.clearCart()
      
    })
    .then(()=>{
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  const user=req.user
    Order.find({'user.userId':user._id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
