const express =require('express')
const router=express.Router()

const mysql=require('mysql2')
const conn=require('../../db/connetion')
router.route('/').get((req,res)=>{

    conn.execute('select * from blog',(err,result)=>{

       
        res.render('userBlog',{blogs:result})
    })
  
})

router.route('/').post((req,res)=>{

    const search=req.body.search
    conn.execute(`select * from blog where blogTitle like '%${search}%' `,(err,result)=>{

       
        res.render('userBlog',{blogs:result})
    })
})

router.route('/blogDetail/:blogID').get((req,res)=>{
   
    const blogID=req.params.blogID
    conn.execute(`select * from blog where blogID =${blogID} `,(err,result)=>{

       
        res.render('userBlogDetail',{blog:result[0]})
    })



})

module.exports=router