const express = require('express')
const {PORT,mongodbURL} = require('./config')
const cors = require('cors')
const mongoose = require('mongoose')
const bookModel = require('./models/bookModel')
const bookRoutes = require('./routes/mybookroutes')
const app = express();
app.use(express.json());
// using cors 

app.use(cors());
// app.use(
//     cors({
//         origin:'http://localhost:5000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// );

app.get('/',(req,res)=>{
    res.send('HELLO WORLD')
})
app.use('/books',bookRoutes)

app.listen(PORT,()=>{

    
    console.log(`App is listening at ${PORT}`)
})

mongoose.connect(mongodbURL).then(()=>console.log('database connected')).catch((e)=>console.log(e))



