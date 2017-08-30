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
	var qs=[]
	var village=req.body["village"]
	var name=req.body["name"]
	var con=req.body["con"]
	pool.query(`insert into activity(name,con,village) values("${name}","${con}","${village}")`,function(err,rows){
	pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			qs.unshift(rows[i])
		}
		res.send(qs);
	})
		})
})


//！！物业查看活动参加情况
//
//参数     village 小区  
router.post('/wyhuodongs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var qs=[]
	var village=req.body["village"]
	pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			qs.unshift(rows[i])
		}
		res.send(qs);
	})
})







//！！业主接收活动通知
//
//参数  village 小区   id 业主的id
router.post('/yzhuodong',function(req,res){
	var infs
	var huods=[]
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var id=req.body["id"]
	pool.query(`select * from activity where village="${village}" and indexs=0`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].nums
		if(a1!=null){
		var a2=a1.split("?")
		if(a2.indexOf(id)!=-1){
		 Object.assign(rows[i],{obes:"true"})   
		}else{
		Object.assign(rows[i],{obes:"false"})	
		}
		}else{
			Object.assign(rows[i],{obes:"false"})   
		}
		
		}
		for(var i in rows){
			huods.unshift(rows[i])
		}
		res.send(huods);
	})
})


//！！业主参加活动通知
//
//参数  活动的id   参加活动的业主的id
router.post('/yzhuodongs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var id=req.body["id"] //活动的id
	var uid=req.body["uid"]  //参加活动的业主的id
	pool.query(`select * from activity where id="${id}"`,function(err,rows){
		if(err) throw err;
		var huods=[]
		var aa=rows[0].nums
		if(aa!=null&&aa!=""){
		var aa1=aa.split("?")
		if(aa1.indexOf(uid)==-1){
		aa1.push(uid)
		var aa2=aa1.join("?")
		pool.query(`update activity set  nums="${aa2}" where id=${id}`, function(err, rows, fields) {
				pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].nums
		if(a1!=null&&a1!=""){
		var a2=a1.split("?")
		if(a2.indexOf(uid)!=-1){
		 Object.assign(rows[i],{obes:"true"})   
		}else{
		Object.assign(rows[i],{obes:"false"})	
		}
		}else{
			Object.assign(rows[i],{obes:"false"})   
		}
		
		}
		for(var i in rows){
			huods.unshift(rows[i])
		}
		res.send(huods);
		})
	});	
		}	
		}else{
				pool.query(`update activity set  nums="${uid}" where id=${id}`, function(err, rows, fields) {
				pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].nums
		if(a1!=null&&a1!=""){
		var a2=a1.split("?")
		if(a2.indexOf(uid)!=-1){
		 Object.assign(rows[i],{obes:"true"})   
		}else{
		Object.assign(rows[i],{obes:"false"})	
		}
		}else{
			Object.assign(rows[i],{obes:"false"})   
		}
		
		}
		for(var i in rows){
			huods.unshift(rows[i])
		}
		res.send(huods);
		})
	});		
		}
	})
})


//！！业主查看活动自己参加情况
//
//参数     village 小区  
router.post('/yzkzjcjdhd',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var qs=[]
	var village=req.body["village"]
	var id=req.body["id"]
	pool.query(`select * from activity where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			if(rows[i].nums.split("?").indexOf(id)!=-1){
				qs.unshift(rows[i])
			}
		}	
		res.send(qs);
	})
})



module.exports=router;