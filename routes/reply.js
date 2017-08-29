var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//！！论坛
//查询评论
//参数   name con    uid  业主id
router.post('/yzpingluncx',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var uid=req.body["uid"]   //论坛的id
	pool.query(`select * from reply where uid="${uid}"`,function(err,rows){
	if (err) throw err;	
	res.send(rows);
	})
})



//！！论坛
//发送评论
//参数   name con    uid  业主id
router.post('/yzpinglun',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var title=req.body["title"]
	var uid=req.body["uid"]   //论坛的id
	var name=req.body["name"]  //马东升
	var names=req.body["names"]  //马东升
		pool.query(`insert into reply(uid,title,name,names) values("${uid}","${title}","${name}","${names}")`,function(err,rows){
	pool.query(`select * from reply where uid="${uid}"`,function(err,rows){
	if (err) throw err;	
	res.send(rows);
	})
	})		
})
//	pool.query(`insert into forum(name,con,img,uid,village) values("${name}","${con}","${imgs}","${uid}","${village}")`,function(err,rows){
//			if (err) throw err;
//			imgs=null
//			
//	pool.query(`select * from forum where village="${village}"`,function(err,rows){
//		if(err) throw err;
//		for(var i in rows){
//		var a1=rows[i].help
//		if(a1!=null&&a1!=""){
//		var a2=a1.split("?")
//		if(a2.indexOf(uid)!=-1){
//		 Object.assign(rows[i],{obes:"true"})   
//		}else{
//		Object.assign(rows[i],{obes:"false"})	
//		}
//		}else{
//			Object.assign(rows[i],{obes:"false"})   
//		}
//		
//		}
//		for(var i in rows){
//			lt.unshift(rows[i])
//		}
//		res.send(lt);
//	})
//		})	
//	
//	else{
//	pool.query(`insert into forum(name,con,uid,village) values("${name}","${con}","${uid}","${village}")`,function(err,rows){
//			if (err) throw err;
//			imgs=null
//			
//	pool.query(`select * from forum where village="${village}"`,function(err,rows){
//		if(err) throw err;
//		for(var i in rows){
//		var a1=rows[i].help
//		if(a1!=null&&a1!=""){
//		var a2=a1.split("?")
//		if(a2.indexOf(uid)!=-1){
//		 Object.assign(rows[i],{obes:"true"})   
//		}else{
//		Object.assign(rows[i],{obes:"false"})	
//		}
//		}else{
//			Object.assign(rows[i],{obes:"false"})   
//		}
//		
//		}
//		for(var i in rows){
//			lt.unshift(rows[i])
//		}
//		res.send(lt);
//	})
//		})	
//	}
//})

module.exports=router;