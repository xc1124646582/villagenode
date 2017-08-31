var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();



//！！boss登录
router.post('/bossdl',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	var pass=req.body["pass"]
	pool.query(`select * from boss where user="${user}" and pass="${pass}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


module.exports=router;