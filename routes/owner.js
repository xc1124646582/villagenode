var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//！！业主信息查询
router.post('/yzchaxun',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	pool.query(`select * from owner where id="${id}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})













module.exports=router;