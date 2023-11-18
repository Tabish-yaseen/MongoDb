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
  
  static findById(userId){
    const db=getDb()
    return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})

  }
}

module.exports = User;
