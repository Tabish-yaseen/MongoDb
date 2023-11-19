const  mongodb=require('mongodb')
const {getDb}=require('../util/database')

class User{
  constructor(name,email,cart,id){
    this.name=name,
    this.email=email,
    this.cart=cart,
    this._id=id
  }

  save(){
    const db=getDb()
    return db.collection('users').insertOne(this)
  }

  addToCart(product){
    const existingProduct=this.cart.items.find((prod)=>{
      return prod.productId.toString()===product._id.toString() 
    })
     existingProduct?existingProduct.quantity++ : this.cart.items.push({ productId: product._id, quantity: 1 })
    const db=getDb()
    return db.collection('users').updateOne({_id:this._id},{ $set:{cart:{ items: this.cart.items }}})
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(product => product.productId)
  
    return db.collection('product')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(product => {
          const cartItem = this.cart.items.find(item => item.productId.toString() === product._id.toString());
          return { ...product, quantity: cartItem.quantity}
        })
      })
  }

  deleteItemFromCart(productId){
    const updatedCartItems=this.cart.items.filter((item)=>{
      return item.productId.toString()!==productId.toString()
    })
    const db=getDb()
   return  db.collection('users').updateOne({_id:this._id},{$set:{cart:{items:updatedCartItems}}})

  }

  addOrder() {
    const db = getDb();
    return this.getCart().then((products) => {
      const order = {
        products: products,
        user: {
          userId: this._id,
          userName: this.name
        }
      };
      return db.collection('orders').insertOne(order)
      .then((res) => {
        this.cart = { items: [] };
        return db.collection('users').updateOne(
          { _id: this._id },
          { $set: { cart: { items: [] } } }
        )
      })
    })
  }
  
  
  getOrders(){
    const db=getDb()
    return db.collection('orders').find({'user.userId':this._id}).toArray()
   

   

  }
  
  static findById(userId){
    const db=getDb()
    return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})

  }
}

module.exports = User;
