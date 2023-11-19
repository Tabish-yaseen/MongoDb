const mongoose=require('mongoose')

const Schema=mongoose.Schema

const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('products',productSchema)




// const mongodb=require('mongodb')
// const getDb  = require("../util/database").getDb

// class Product{
//     constructor(title,price,description,imageurl,id,userId){
//         this.title=title
//         this.price=price
//         this.description=description
//         this.imageurl=imageurl
//         this._id=id ? new mongodb.ObjectId(id):null;
//         this.userId=userId

//     }
//     save(){
//         const db=getDb()
//         let dbOp
//         if(this._id){
//             // update the product
//             dbOp=db.collection('product').updateOne({_id:this._id},{$set:this})

//         }else{
//             // create the product
//             dbOp=db.collection('product').insertOne(this)

//         }
        
//        return  dbOp
//         .then((result)=>{
//             console.log(result)
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }
//     static fetchAll(){
//         const db=getDb()
//         return db.collection('product').find().toArray()
        
//     }
//     static findById(prodId){
//       const db=getDb()
//       return db.collection('product').find({_id:new mongodb.ObjectId (prodId)}).next()
      
//     }
//     static deleteById(prodId){
//         const db=getDb()
//        return  db.collection('product').deleteOne({_id:new mongodb.ObjectId(prodId)})
//     }
// }
// module.exports=Product