const express =require('express')
const router=express.Router()

const conn=require('../../db/connetion')
const mongoose=require('mongoose')
const Blogs=require('../../Models/blog')
router.route('/')
.get((req,res)=>{

    Blogs.find({}).then(blogs=>{
        res.render('adminBlog',{blogs})
    }).catch(err=>{
        console.log(err)
    })

    /*
    conn.execute('select * from blog',(err,result)=>{

       
        res.render('adminBlog',{blogs:result})
    })*/
  
})
.post((req,res)=>{

    const search=req.body.search
    
    Blogs.find({"title": { $regex : search } }).then(blogs=>{
        res.render('adminBlog',{blogs})
    }).catch(err=>{
        console.log(err)
    })

    
    /*
    conn.execute(`select * from blog where blogTitle like '%${search}%' `,(err,result)=>{

       
        res.render('adminBlog',{blogs:result})
    })*/
})



router.route('/blogDetail/:blogID').get((req,res)=>{
   
    const blogID=req.params.blogID

    Blogs.findById(blogID).then(blog=>{
        console.log(blog)
        res.render('adminBlogDetail',{blog})

    })
    /*
    conn.execute(`select * from blog where blogID =${blogID}`,(err,result)=>{

       
        res.render('adminBlogDetail',{blog:result[0]})
    })*/


})

router.route('/deleteBlog/:blogID').get((req,res)=>{
   
        const blogID=req.params.blogID

        Blogs.findByIdAndDelete(blogID).then(resp=>{
            res.redirect('/dashboard')
        }).catch(err=>{
            console.log(err)
        })

        /*
        conn.execute(`delete from blog where blogID =${blogID}`,(err,result)=>{
    
           
            res.redirect('/dashboard')
        })*/
    
    
    
})




router.route('/addBlog')
.get((req,res)=>{
    res.render('addBlog')
}).post((req,res)=>{
    console.log(req.file)
    console.log(req.file.mimetype)


    if((req.file.mimetype!='image/jpeg') )
    {
        res.render('addBlog',{error:'This Format of image is not supported'})
    }
    else{
    Blogs.create({...req.body,blogImg:req.file.path}).then(blog=>{

        console.log('*****')
        res.redirect('/dashboard')
    }).catch(err=>{
        console.log(err)
    })
    }
    /*
    conn.execute('insert into blog(blogtitle,blogDescription) values(?,?)',[blogTitle,blogDescription],(err,result)=>{
        res.redirect('/dashboard')
    })*/

    
})




router.route('/editBlog/:blogID').get((req,res)=>{
    const blogID=req.params.blogID

    Blogs.findById(blogID).then(blog=>{
        res.render('addBlog',{blog})
    })
    /*
    conn.execute('select  * from blog where blogID=?',[blogID],(err,result)=>{
        console.log(result.blogTitle)
        res.render('addBlog',{blog:result[0]})
    })*/
})


router.route('/updateBlog').post((req,res)=>{
   
    const {title,description}=req.body
    const blogID=req.body.id
   Blogs.findByIdAndUpdate(blogID,{title,description},{new:true}).then(result=>{
    res.redirect('/dashboard')
   })

    //const {blogTitle,blogDescription}=req.body
    /*
    conn.execute('update blog set blogTitle=? ,blogDescription=? where blogID=?',[blogTitle,blogDescription,blogID],(err,result)=>{
      res.redirect('/dashboard')
  })*/
})

module.exports=router