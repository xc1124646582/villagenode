var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//业主发送 报修请求  
//参数  name 邮包的名字     village  门牌号
router.post('/yzguarantee',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var con=req.body["con"]
	var village=req.body["village"]  //小区
	var address=req.body["address"]   //门牌号
	pool.query(`insert into guarantee(name,con,village,address) values("${name}","${con}","${village}","${address}")`,function(err,rows){
		pool.query('SELECT * from guarantee', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
		})
})








module.exports=router;