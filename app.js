const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const mongoConnect=require('./util/database').mongoConnect
const errorController = require('./controllers/error');
const User=require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('655884a6b73c6b7493c1ee92')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoConnect(()=>{
    console.log('connected')
    app.listen(3000)
})

app.use(errorController.get404);

