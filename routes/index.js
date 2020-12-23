const express=require('express')
const router= express.Router()
const db=require('../model/chattydb')
const user=db.user
const rooms=db.rooms


router.get('/',async (req ,res)=>{
    try{
    const allrooms = await rooms.find({})
    res.render('index.ejs',{ allrooms:allrooms, new: new rooms()})}
    catch{
        res.render('index.ejs',{room:{}})
    }
    
})
router.get('/createroom', (req,res)=>
{  
    res.render('createroom.ejs')
   
})
router.post('/joinrooms',async (req,res)=>{
    const newroom= new rooms({rooms:req.body.room})
    try{
   const temp= await rooms.find({rooms:req.body.room})
   if(!temp.length)
   {
      try{ await newroom.save()
       res.render('join.ejs',{room:newroom})}
       catch{
           res.send('error saving')
       }

   }
   else{
    res.render('join.ejs',{room:req.body.room,msg:"room already exists"})
   }
     
}
   catch{
       res.send('error')
   }


    

})
router.post('/:room',async (req,res)=>{
  

         res.render('chat.ejs',{username:req.body.username,room:req.params.room})
        

 

})
router.get('/:roomname',async (req,res)=>{
  
    const newroom= {rooms:req.params.roomname}
    res.render('join.ejs',{room:newroom})
   



})
module.exports=router