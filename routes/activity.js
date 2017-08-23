var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件


//！！物业发送活动通知
//
//参数   name物业名字      village 小区      con 活动内容  title活动主题
router.post('/wyhuodong',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var name=req.body["name"]
	var con=req.body["con"]
	var title=req.body["title"]
	pool.query(`insert into activity(name,con,village,title) values("${name}","${con}","${village}","${title}")`,function(err,rows){
	pool.query(`select * from activity`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
		})
})


//！！业主接收活动通知
//
//参数  village 小区
router.post('/yzhuodong',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	pool.query(`select * from activity where village="${village}" and indexs=0`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})




module.exports=router;