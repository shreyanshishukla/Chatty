//onst { Server } = require("socket.io");

const socket=io();
const textarea=document.getElementById('textarea');
const typingarea=document.getElementsByClassName('typingarea');
const chatform=document.getElementById('chatform');
console.log(username)

chatform.addEventListener('submit',(e)=>
{ e.preventDefault();
   const message=e.target.elements.message.value;
   // to send a message
   socket.emit('message',message,username,room);
   const from=document.createElement('div');
   let msg=document.createElement('div');
   from.classList.add('from');
   from.innerHTML=`<p> you &#58 </p>`;
msg.classList.add('sent');
msg.innerHTML=`<p> ${message} </p>`;
textarea.append(from);

textarea.append(msg);
e.target.elements.message.value='';
   
})
// on joining
socket.on('new-user',(message)=>{
    
    
  
    let msg=document.createElement('div');
    msg.innerHTML=`<p>${message}</p><br>`;
    textarea.append(msg);
//for telling others that you joined this room
 socket.emit('joining',username,room);

});
//message that someoneelse joined the room
socket.on('joining',(message)=>{
    
   
    let msg=document.createElement('div');
    msg.innerHTML=`<p>${message}</p><br>`;
    console.log(message)
   
  
    textarea.append(msg);

});
//getting a message
socket.on('message',(message,name)=>{
const msg=document.createElement('div');
const from=document.createElement('div');

from.classList.add('fromelse');
from.innerHTML=`<p> ${name} &#58  </p>`;

textarea.append(from);
msg.classList.add('recieved');
msg.innerHTML=`<p>${message}</p>`;


textarea.append(msg);
});
socket.on('disconnected',(uname)=>{
    const msg= document.createElement('div')  
    msg.innerHTML=`<p>${uname} left</p><br>`;
  
    
   textarea.append(msg)

});


