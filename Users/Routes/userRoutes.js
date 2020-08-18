const express =require('express')
const router=express.Router()


const mongoose=require('mongoose')
const Blogs=require('../../Models/blog')
router.route('/').get((req,res)=>{
    Blogs.find({}).then(blogs=>{
        res.render('userBlog',{blogs})
    }).catch(err=>{
        console.log(err)
    })
    /*
    conn.execute('select * from blog',(err,result)=>{

       
        res.render('userBlog',{blogs:result})
    })*/
  
})

router.route('/').post((req,res)=>{

    const search=req.body.search

    Blogs.find({"title": { $regex : search } }).then(blogs=>{
        res.render('userBlog',{blogs})
    }).catch(err=>{
        console.log(err)
    })

    
    /*
    conn.execute(`select * from blog where blogTitle like '%${search}%' `,(err,result)=>{

       
        res.render('userBlog',{blogs:result})
    })*/
})

router.route('/blogDetail/:blogID').get((req,res)=>{
   
    const blogID=req.params.blogID

    Blogs.findById(blogID).then(blog=>{
        console.log(blog)
        res.render('userBlogDetail',{blog})

    })

    /*
    conn.execute(`select * from blog where blogID =${blogID}`,(err,result)=>{

       
        res.render('userBlogDetail',{blog:result[0]})
    })*/



})

module.exports=router