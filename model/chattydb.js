const mongoose=require('mongoose')
const roomSchema =mongoose.Schema({
    rooms:{
        type:String,
        required: true
    },
    username:{
        type:[mongoose.Schema.Types.ObjectId],
        ref :'user'
    }
    
   
})
const userSchema =mongoose.Schema({
    rooms:{
        type:[mongoose.Schema.Types.ObjectId],
        ref :'roosm'
    },
    username:{
        type:String,
        required:true
    }
    
   
})


module.exports={rooms:mongoose.model('roosm',roomSchema),user:mongoose.model('user',userSchema)}