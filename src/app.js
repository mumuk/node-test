const express = require('express');
require('./db/mongoose');
const port=5000

const userRouter = require('./routers/user');
const app = express()



app.use(express.json());
app.use(userRouter);




// app.get('',(req,res)=>{res.send('GET request recieved!')})
// app.get('/api/users',(req,res)=>{res.send('GET request recieved!')})
// app.get('/api/users/:id',(req,res)=>{res.send('GET request recieved!')})
// app.post('/api/users',async(req,res)=>{
// console.log(`user creation log`,req.body)
//   res.send('POST request recieved!')
// })
// app.put('',(req,res)=>{res.send('PUT request recieved!')})
// app.delete('',(req,res)=>{res.send('DELETE request recieved!')})
//
//


 app.listen(port, ()=>console.log(`Server is on port:${port}`))
module.exports=app

