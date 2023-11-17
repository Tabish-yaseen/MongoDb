const express=require('express')
const shopRoute=require('./routes/shop')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));

app.use('/shop',shopRoute)
const mongoConnect=require('./utils/database').mongoConnect
mongoConnect(()=>{
    console.log('connected')
    app.listen(3000)
    
})