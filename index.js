const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = 3000 | process.env.port
const axios = require('axios')
const session = require('express-session')
const cookie = require('cookie-parser')
const User = require('./models/users')
//------------------------ejs
app.use('/assets', express.static('assets'))
app.use(cookie())
app.use(session({
   'secret':'oturum',
   cookie:{ maxAge: Date.now() + (30 * 86400 * 1000)},
   resave:false
   
   }))
 app.use('/register',(req,res)=>{
    res.render('register')
    })
app.use('/home',(req,res)=>{
   res.render('welcome')
 })
 app.use('/portfoy',(req,res)=>{
    if(req.session.adi){
      res.render('portfoy')
    }else{
      res.redirect('/login')
   }
    
 })
 app.use('/islem',(req,res,next)=>{
   // 
 User.findOne({username:req.session.adi}).then((user)=>{
  
    if(user){
      res.render('islemler')
    }else{
      res.redirect('login')
    }
 })

 })

   
 //-----------------------------------------------------------------api
 app.use('/borsa',(req,res)=>{
    var config = {
        method: 'get',
        url: 'https://api.genelpara.com/embed/borsa.json',
      };
      axios(config)
      .then(function (resp) {
            res.status(200).json(resp.data)
      })
      .catch(function (error) {
       res.status(400).json({message:error})
      });
      
 })

//----------------------Router
const authRoute = require('./routers/auth')
const PortfoyRoute = require('./routers/portfolioRoute');
const { MemoryStore } = require('express-session');
app.use('/api',authRoute)
app.use('/user',PortfoyRoute)


//----------------------İmports

app.set('view engine','ejs')

app.listen(port,()=>{
    console.log(`${port} portu çalıştı`)
    })
//---------------------------------------------
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log(`db çalıştı`)
})
//-------------------------------------------