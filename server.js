const { urlencoded } = require('express')
const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)
const mongoose=require('mongoose')
mongoose.connect(envvar,{ useNewUrlParser: true,useUnifiedTopology: true })


const socketio=require('socket.io')(server)



const path=require('path')

const indexroute= require('./routes/index')
server.listen(process.env.PORT||3000,()=>console.log("server running"))
app.set('views',path.join(__dirname,"views"))
app.set('view-engine','ejs')
app.use(express.static('public'))
app.use(urlencoded({extended:false}))
app.use('/',indexroute)
const db= mongoose.connection
db.on('error',error=>
{
    console.log('error connecting to database')
})
db.once('open',()=>
{console.log('successfully connected to database')})

socketio.on('connection',socket=>{
    let uname,rname
    socket.emit('new-user',"you joined the room")
    socket.on('joining',(name,room)=>
    {  uname=name
        rname =room
        socket.join(room)
        socket.to(room).broadcast.emit('joining',`${name} joined the chat`)})
       
   
    socket.on('message',(msg,username,roomName)=>
    {
        socket.to(roomName).broadcast.emit('message',msg,username);
    })
   
    socket.on('disconnect',()=>
    {   
        socket.to(rname).broadcast.emit('disconnected',uname);
        
        
    })
   
})
 