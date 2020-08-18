const mongoose=require('mongoose')
const Schema=mongoose.Schema
const blogSchema=new Schema({
  
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    blogImg:{
        type:String,
        required:true
    }
},{timestamps:true})

const Blogs=mongoose.model('blog',blogSchema)
module.exports=Blogs