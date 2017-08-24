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


//！！物业查看活动参加情况
//
//参数     village 小区  
router.post('/wyhuodongs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})







//！！业主接收活动通知
//
//参数  village 小区   id 业主的id
router.post('/yzhuodong',function(req,res){
	var infs
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var id=req.body["id"]
	pool.query(`select * from activity where village="${village}" and indexs=0`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].nums
		var a2=a1.split("?")
		console.log(a2.indexOf(id))
		if(a2.indexOf(id)!=-1){
		 Object.assign(rows[i],{aa:"true"})   
		 //如果活动已经参加 aa   返回true
		}else{
		Object.assign(rows[i],{aa:"false"})	
		//如果没参加 aa  返回 false
		}
		}
		res.send(rows);
	})
})


//！！业主参加活动通知
//
//参数  活动的id   参加活动的业主的id
router.post('/yzhuodongs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"] //活动的id
	var uid=req.body["uid"]  //参加活动的业主的id
	pool.query(`select * from activity where id="${id}"`,function(err,rows){
		if(err) throw err;
		var aa=rows[0].nums
		var aa1=aa.split("?")
		if(aa1.indexOf(uid)==-1){
		aa1.push(uid)
		var aa2=aa1.join("?")
		pool.query(`update activity set  nums="${aa2}" where id=${id}`, function(err, rows, fields) {
		if(err) throw err;
		res.send(rows);
	});	
		}
	})
})




module.exports=router;