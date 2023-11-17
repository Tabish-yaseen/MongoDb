const getDb  = require("../utils/database").getDb

class Product{
    constructor(title,price,description,imageurl){
        this.title=title
        this.price=price
        this.description=description
        this.imageurl=imageurl
    }
    save(){
        const db=getDb()
       return  db.collection('product')
        .insertOne(this)
        .then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err)
        })
    }
}
module.exports=Product
