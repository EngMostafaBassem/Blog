
/*intilization*/
const express=require('express')
const dbConfig=require('./db/connetion')
const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const app=express()
const userRouter=require('./Users/Routes/userRoutes')
const adminRouter=require('./Admin/Routes/adminRoutes')
const connect=mongoose.connect(dbConfig.connectionString,{useNewUrlParser:true,useUnifiedTopology:true})
connect.then(db=>{
    console.log('connected Successfully')
}).catch(err=>{
    console.log(err)
})


/*initial Setup */
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'assets')))
app.use('/Uploads', express.static(path.join(__dirname,'Uploads')))
app.set('views',[path.join(__dirname,"Users","Views"),path.join(__dirname,"Admin","Views")])
app.set('view engine','ejs')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })

var upload=multer({dest:'Uploads/',storage}).single('img')

app.use(upload)
/*Mounting*/
app.use('/',userRouter)
app.use('/dashboard',adminRouter)



app.listen(8080)