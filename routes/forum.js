var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js")
;
var router=express.Router();


//！！论坛
//发送论坛

router.post('/yzluntan',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var con=req.body["con"]
	pool.query(`insert into forum(name,con) values("${name}","${con}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})


module.exports=router;