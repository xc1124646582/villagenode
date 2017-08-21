var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//物业发送邮包     
//参数  name 邮包的名字     village  门牌号
router.post('/wymail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var village=req.body["village"]
	var address=req.body["address"]
	pool.query(`insert into mail(name,village,address) values("${name}","${village}","${address}")`,function(err,rows){
		pool.query('SELECT * from mail', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
		})
})


//业主接受邮包
router.post('/yzmail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
    var village=req.body["village"]
//	var address=req.body["address"]
		pool.query(`select * from mail where  name="${name}" `, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
})


module.exports=router;