
/*intilization*/
const express=require('express')

const path=require('path')
const app=express()
const userRouter=require('./Users/Routes/userRoutes')
const adminRouter=require('./Admin/Routes/adminRoutes')


/*initial Setup */
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'assets')))
app.set('views',[path.join(__dirname,"Users","Views"),path.join(__dirname,"Admin","Views")])
app.set('view engine','ejs')


/*Mounting*/
app.use('/',userRouter)
app.use('/dashboard',adminRouter)

app.listen(3001)