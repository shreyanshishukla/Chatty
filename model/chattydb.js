const mongoose=require('mongoose')
const roomSchema =mongoose.Schema({
    rooms:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    }
    
   
})

module.exports=mongoose.model('roosm',roomSchema)
