const Portfoys = require('../models/porfoys')
const Operations = require('../models/operations')
let portfoySave = async (req,res)=>{

    let save = new Portfoys({
        username: req.session.adi,
        alis:req.body.alis,
        satis:req.body.satis,
        hisse:req.body.hisse,
        cost: req.body.alis * req.body.piece,  //maliyet
        piece:req.body.piece, //adet
        currentPrice: 21
    })
    try{
        let islem = await save.save()
        res.status(200).json(islem)
    }catch(err){
        res.status(400).json({error: err})
    }
}

let portfoyGet = (req,res)=>{

   Portfoys.find({username:req.session.adi,status:true}).then(userPort=>{

    res.status(200).json(userPort)
   }).catch(err=>{
       res.status(400).json({error : err})
   })
   

}
let islemler = (req,res)=>{

    Operations.find({username:req.session.adi}).then(userPort=>{
 
     res.status(200).json(userPort)
    }).catch(err=>{
        res.status(400).json({error : err})
    })
    
 
 }

module.exports = {portfoySave,portfoyGet,islemler}