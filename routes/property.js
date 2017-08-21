var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();


//！！物业登录
//查询账号         参数    user   
//返回空   未注册
//如果有   查询密码是否与返回值的pass  相等  否则密码错误
router.post('/wydenglu',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	pool.query(`select * from property where user="${user}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


module.exports=router;