var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs=null




//论坛上传图片
router.post('/img',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/images';
	  //上传图片存放的路径
	
	form.parse(req,function(error,fields,files){
		var aa={ };
		var arr=[]
		var str=""
		for(var i in files){
			var file = files[i];  //保存图片属性
			var fName = (new Date()).getTime()  //用一时间戳作为图片的名字
			switch(file.type){    //检测图片的格式
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
				case "image/gif":
				fName=fName+".gif";

			}
			var newPath='public/images/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			console.log(aa)
			Object.assign({},aa,{path:newPath})
			arr.push('http://localhost:8100/images/'+fName)
			str=arr.join("?")   //生成图片字符串
		}
		 		res.send(arr)
			 //res.send(str)  //返回的多张图片  中间用?号隔开的
			 imgs=str
			 

		
	})
	});



//！！论坛
//发送论坛
//参数   name con   village  uid  业主id
router.post('/yzluntan',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var lt=[]
	var lunt=[]
	var name=req.body["name"]  //马东升
	var con=req.body["con"]
	var village=req.body["village"]
	var uid=req.body["uid"]
	var img=req.body["img"]
	pool.query(`insert into forum(name,con,img,uid,village) values("${name}","${con}","${img}","${uid}","${village}")`,function(err,rows){
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
			lunt.unshift(rows[i])
		}
		res.send(lunt);
	})
	})
})




//！！业主接收论坛

//参数  village 小区   uid 业主的uid
router.post('/yzluntans',function(req,res){
	var lunt=[]
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var uid=req.body["uid"]
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
			lunt.unshift(rows[i])
		}
		res.send(lunt);
	})
})




//！！论坛详情

//参数  id 论坛的id  uid 业主的id
router.post('/yzluntxq',function(req,res){
	var lunt=[]
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var uid=req.body["uid"]
	pool.query(`select * from forum where id="${id}"`,function(err,rows){
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
			lunt.unshift(rows[i])
		}
		res.send(lunt);
	})
})





//！！业主点赞论坛

//参数  village 小区   uid 业主的uid  id论坛的id
router.post('/yzluntanzan',function(req,res){
	var lunt=[]
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var uid=req.body["uid"]
	var id=req.body["id"]
	pool.query(`select * from forum where id="${id}"`,function(err,rows){
		if(err) throw err;
		var luntan=[]
		var aa=rows[0].help
		if(aa!=null&&aa!=""){
		var aa1=aa.split("?")
		if(aa1.indexOf(uid)==-1){
		aa1.push(uid)
		var aa2=aa1.join("?")
		pool.query(`update forum set  help="${aa2}" where id=${id}`, function(err, rows, fields) {
				pool.query(`select * from forum where id="${id}"`,function(err,rows){
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
			luntan.unshift(rows[i])
		}
		res.send(luntan);
		})
	});	
		}else{ //点击取消点赞
		var arr=[]
		for(var i in aa1){
			if(aa1[i]!=uid){
				arr.push(aa1[i])
			}
		}
		var arr2=arr.join("?")
		pool.query(`update forum set  help="${arr2}" where id=${id}`, function(err, rows, fields) {
		pool.query(`select * from forum where id="${id}"`,function(err,rows){
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
			luntan.unshift(rows[i])
		}
		res.send(luntan);
		})
	});	
		}
		}else{
		pool.query(`update forum set  help="${uid}" where id=${id}`, function(err, rows, fields) {
		pool.query(`select * from forum where id="${id}"`,function(err,rows){
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
			luntan.unshift(rows[i])
		}
		res.send(luntan);
		})
	});		
		}
	})
})





//router.post('/zanluntan',function(req,res){
//	var id=req.body["id"]   //论坛的id
//	res.header("Access-Control-Allow-Origin", "*");
//pool.query(`update cases1 set  src="${imgs}" where cid=${cid}`, function(err, rows, fields) {
//		if(err) throw err;
//		res.send(rows);
//	});
//})





module.exports=router;