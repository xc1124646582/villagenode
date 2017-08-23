var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs




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
		 pool.query(`insert into forum(img) values('${str}')`,function(err,rows){
		 	if (err) throw err;
		 	if(rows){
		 		res.send('上传成功')
		 	}
			
		 })
			 //res.send(str)  //返回的多张图片  中间用?号隔开的
			 imgs=str
			 

		
	})
	});



//！！论坛
//发送论坛
//参数   name con  
router.post('/yzluntan',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var con=req.body["con"]
	pool.query(`insert into forum(name,con,img) values("${name}","${con}","${imgs}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
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