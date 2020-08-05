
const mysql=require('mysql2')

module.exports=mysql.connect({
    host:'localhost',
    user:'root',
    database:'blogDB'

})