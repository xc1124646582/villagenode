var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();



//访客邀请
router.post('/codess',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var title=req.body["title"]  //快递
	var name=req.body["name"]
	pool.query(`insert into code(title,name) values("${title}","${name}")`,function(err,rows){
		if (err) throw err;
	  	res.send(rows)
			
		})
})

module.exports=router;