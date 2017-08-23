var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件


//！！物业发送通知
//
//参数   name物业名字      village 小区      con 通知内容
router.post('/wytongzhi',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var name=req.body["name"]
	var con=req.body["con"]
	pool.query(`insert into notice(name,con,village) values("${name}","${con}","${village}")`,function(err,rows){
	pool.query(`select * from notice`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
		})
})


//！！业主接收通知
//
//参数     village 小区  
router.post('/yztongzhi',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	pool.query(`select * from notice where village="${village}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})







module.exports=router;