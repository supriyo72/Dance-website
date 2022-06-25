const express = require("express");
const app = express();
const path = require("path");
const bodyparser =  require("body-parser");
const mongoose= require('mongoose');
const { connect } = require("http2");
const connectDB = async () =>{
    try{
        const conn=await mongoose.connect('mongodb+srv://supriyo20:supu0987@supriyoghosh.r2rod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            // useCreateIndex:true,
            // useFindAndModify:false,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected successfully: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

connectDB()
///
const PORT = process.env.PORT || 8000;




// Define mongoose
var contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    desc:String
});
var Contact = mongoose.model('Contact',contactSchema)
// EXPRESS SPECEFIC STUFF
app.use('/static', express.static('static'))   //for serving static files
app.use(express.urlencoded({extended:true}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')   //set the template engine as pug
app.set('views', path.join(__dirname,'views'))  // set the views directory

// END POINTS
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);
})
app.get('/about',(req,res)=>{
    const params = { }
    res.status(200).render('about.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The items has been saved in data base successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database ")
    })
    // res.status(200).render('contact.pug');
})
//START THE SERVER
app.listen(PORT, ()=>{
    console.log(`The application started successfully on port ${PORT}`);
})
