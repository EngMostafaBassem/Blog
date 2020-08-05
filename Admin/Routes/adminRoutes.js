const express =require('express')
const router=express.Router()

const mysql=require('mysql2')
const conn=require('../../db/connetion')
router.route('/')
.get((req,res)=>{

    conn.execute('select * from blog',(err,result)=>{

       
        res.render('adminBlog',{blogs:result})
    })
  
})
.post((req,res)=>{

    const search=req.body.search
    conn.execute(`select * from blog where blogTitle like '%${search}%' `,(err,result)=>{

       
        res.render('adminBlog',{blogs:result})
    })
})






router.route('/blogDetail/:blogID').get((req,res)=>{
   
    const blogID=req.params.blogID
    conn.execute(`select * from blog where blogID =${blogID}`,(err,result)=>{

       
        res.render('adminBlogDetail',{blog:result[0]})
    })


})

router.route('/deleteBlog/:blogID').get((req,res)=>{
   
        const blogID=req.params.blogID

        conn.execute(`delete from blog where blogID =${blogID}`,(err,result)=>{
    
           
            res.redirect('/dashboard')
        })
    
    
    
})




router.route('/addBlog')
.get((req,res)=>{
    res.render('addBlog')
}).post((req,res)=>{
    
    const {blogTitle,blogDescription}=req.body
    conn.execute('insert into blog(blogtitle,blogDescription) values(?,?)',[blogTitle,blogDescription],(err,result)=>{
        res.redirect('/dashboard')
    })

    
})




router.route('/editBlog/:blogID').get((req,res)=>{
    const blogID=req.params.blogID
    conn.execute('select  * from blog where blogID=?',[blogID],(err,result)=>{
        console.log(result.blogTitle)
        res.render('addBlog',{blog:result[0]})
    })
})


router.route('/updateBlog').post((req,res)=>{
   
    
    const blogID=parseInt(req.body.blogID)
   
    const {blogTitle,blogDescription}=req.body
    conn.execute('update blog set blogTitle=? ,blogDescription=? where blogID=?',[blogTitle,blogDescription,blogID],(err,result)=>{
      res.redirect('/dashboard')
  })
})

module.exports=router