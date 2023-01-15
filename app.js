// external import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
const cookieParser = require('cookie-parser')


// internal import 
const {notFoundHandlar, errorHandlar} = require('./middlewares/common/errorHandlar');
const loginRoute = require('./routes/loginRoutes')
const userRoute = require('./routes/userRoutes')
const inboxRoute = require('./routes/inboxRoutes')



const app = express()
dotenv.config();


// mongodb server connection 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOOSE_SERVER_CONNECT)
.then(() => console.log('mongodb server connect sucessfully 🥳🥳 '))
.catch((err) => console.log(err))

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser(process.env.COOKIE_SECRICT_STRING));
app.use(express.urlencoded({extended : true}));



// route handling 
app.use('/',  loginRoute);
app.use('/users', userRoute);
app.use('/inbox', inboxRoute);


// not found handlar
app.use(notFoundHandlar)


// error handlar
app.use(errorHandlar)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})







