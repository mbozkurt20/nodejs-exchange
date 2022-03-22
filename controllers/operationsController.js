const Operations = require('../models/operations')
const Portfolios = require('../models/porfoys')

let operationPost = async (req,res)=>{

    let islem = new Operations()
    islem['username'] = req.session.adi
    islem['exchange'] = req.body.exchange
    islem['operationType'] = true
    islem['price'] = req.body.price
    islem['count'] = req.body.count
    islem.save()
    
    Portfolios.findOne({username:req.session.adi,exchange:req.body.exchange,status:true}).then(hisse=>{
        if(hisse){
            hisse['count'] = hisse['count'] + req.body.count
            hisse['cost'] = (hisse['cost'] + req.body.price * req.body.count) / hisse['count']
            hisse.save()
            res.status(200).json(hisse)
        }else{
            try{
                let portfoy = new Portfolios()
                portfoy['username'] = req.session.adi
                portfoy['exchange'] = req.body.exchange
                portfoy['operationType'] = true
                portfoy['price'] = req.body.price
                portfoy['count'] = req.body.count
                portfoy['status'] = true
                portfoy['cost'] = req.body.count * req.body.price
                portfoy.save()
                res.status(200).json(portfoy)
            }catch(err){
                res.status(400).json({error:err})
            }
        }

    })  
}

module.exports = {operationPost}