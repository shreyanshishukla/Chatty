const express=require('express')
const router= express.Router()
const rooms=require('../model/chattydb')



router.get('/',(req ,res)=>{
    res.render('index.ejs',{ room:rooms})
    
})
router.post('/chatty',async (req,res)=>{
    const newroom= new rooms({rooms:req.body.room,username:req.body.username})
    let temp={}
    try{
         temp=await newroom.save()
        res.render('chat.ejs',{username:req.body.username,room:req.body.room})

    }
    catch
{
    res.send(temp)
}
    
    

})
module.exports=router