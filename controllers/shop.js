const Product=require('../modals/product')

exports.addProduct=(req,res)=>{
    const {title,imageURL,price,description}=req.body
    const product=new Product(title,price,description,imageURL)
    product.save().then(result=>{
        console.log('created product')
        res.status(200).json('message:"product created successfully')
    }).catch(err=>{
        console.log(err)
    })
}