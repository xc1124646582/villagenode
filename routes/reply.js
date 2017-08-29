var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//！！论坛
//发送评论
//参数   name con    uid  业主id
router.post('/yzpinglun',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var lt=[]
	var title=req.body["title"]
	var uid=req.body["uid"]
	var name=req.body["name"]  //马东升
	if(imgs!=null){
	pool.query(`insert into forum(name,con,img,uid,village) values("${name}","${con}","${imgs}","${uid}","${village}")`,function(err,rows){
			if (err) throw err;
			imgs=null
			
	pool.query(`select * from forum where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].help
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
			lt.unshift(rows[i])
		}
		res.send(lt);
	})
		})	
	}else{
	pool.query(`insert into forum(name,con,uid,village) values("${name}","${con}","${uid}","${village}")`,function(err,rows){
			if (err) throw err;
			imgs=null
			
	pool.query(`select * from forum where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
		var a1=rows[i].help
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
			lt.unshift(rows[i])
		}
		res.send(lt);
	})
		})	
	}
})

module.exports=router;