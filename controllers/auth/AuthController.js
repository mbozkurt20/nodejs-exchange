const User = require('../models/users')
const { body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const register =  async (req,res)=>{
    let err = validationResult(req)
    if(! err.isEmpty()){
        res.status(400).json({message:err})
    }

    const usersSchema = new User({
    
    email:req.body.email,
    username:req.body.username,
    password: bcrypt.hashSync(req.body.password),
    token: crypto.randomBytes(30).toString('hex')

})
try{

let userSave = await usersSchema.save()

res.status(200).json(users)
}catch(err){

    res.status(400).json({message:err})
}
}
const loginGet = (req,res)=>{
    let username = req.session.adi;
    
    if(username){
       res.redirect('home')
    }else{
        res.render('login')
    }
}
const logout = (req,res)=>{
   
    delete req.session.adi;
   res.redirect('/login')
}
 const loginPost = (req,res,next)=>{
    
    let username = req.body.username
    let password = req.body.password
   
    User.findOne({username}).then(user=>{
        bcrypt.compare(password, user.password,(err,result)=>{
           
            if(result){
                req.session.adi = username
                res.redirect('home')
            }else{
               
                res.status(400).json({message:'Şifreniz Eşleşmiyor'})
            }
            if(err){
                res.status(401).json({error: err})
                next()
            }
           
           

        })
    })

}

// const login = (req,res,next)=>{
//     let username = req.body.username
//     let password = req.body.password

//     User.findOne({username}).then(user=>{
//         if(user){
//             bcrypt.compare(password, user.password,(err,result)=>{
//                 if(err){
//                     res.status(401).json({
//                         error:err
//                     })
//                 }
//                 if(result){
//                     let token = jwt.sign({id: user._id,username: user.username},'verySecretValue',{expiresIn:'1h'})
//                     res.status(200).json({
//                         message: 'success',
//                         token: token
//                     } )
//                 }else{
//                     res.status(400).json({message:'Şifreniz Eşleşmiyor'})
//                 }

//             })
//         }else{
//             res.status(401).json('User not found!')
//         }
//     })

// }
const userUpdate = (req,res)=>{
    const user = User({_id:req.params.id})
 
    User.updateOne({_id:req.params.id},update).then(()=>{
        res.status(200).json('success')
    }).catch((err)=>{
        res.status(400).json({message: err})
    })

}

const users = (req,res)=>{
  
    User.find({}).then((result)=>{
        res.json(result)
    })

}

module.exports = {loginGet,loginPost,users,register,logout}