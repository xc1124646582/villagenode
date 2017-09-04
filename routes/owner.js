var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();


var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
//插入图片
router.post('/touxiangs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/images';
	  //上传图片存放的路径
	
	form.parse(req,function(error,fields,files){
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
			//res.send(newPath)
		}
		imgs=`http://localhost:8100/images/${fName}`
		res.send(imgs)
	})
	});


router.post('/touxiangcharu',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var img=req.body["img"]
	console.log(id,img)
	pool.query(`update owner set imgs="${img}" where id=${id}`,function(err,rows){
		pool.query(`select * from owner where id="${id}"`,function(err,rows){
			if(err) throw err;
			res.send(rows);
		})
	})
})




//！！业主信息查询
router.post('/yzchaxun',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	pool.query(`select * from owner where id="${id}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


//！！业主房屋信息查询
router.post('/yzchaxunfw',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var address=req.body["address"]
	var family=req.body["family"]
	pool.query(`select * from owner where address="${address}" and family="${family}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})





//！！物业管理   //返回i所有业主
router.post('/wyguanli',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var qs=[]
	var address=req.body["address"]
	pool.query(`select * from owner where address="${address}" and owner=1`,function(err,rows){
		if(err) throw err;	
		for(var i in rows){
			qs.unshift(rows[i])
		}
		res.send(qs);
	})
})



//！！物业添加住户
//
//参数   name业主名字      address 小区    family   门牌号  
router.post('/wyzhuhu',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var qs=[]
	var address=req.body["address"]
	var name=req.body["name"]
	var family=req.body["family"]
	var phone=req.body["phone"]
	var sex=req.body["sex"]
	var homeyard=req.body["homeyard"]
	pool.query(`insert into owner(name,family,address,owner,phone,sex,homeyard) values("${name}","${family}","${address}",1,"${phone}","${sex}","${homeyard}")`,function(err,rows){
	pool.query(`select * from owner where address="${address}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			qs.unshift(rows[i])
		}
		res.send(qs);
	})
})
})



//！！业主添加住户
router.post('/yztjzh',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var family=req.body["family"]
	var address=req.body["address"]
	var homeyard=req.body["homeyard"]
	pool.query(`insert into owner(name,family,address,owner,homeyard) values("${name}","${family}","${address}",0,"${homeyard}")`,function(err,rows){
		pool.query(`select * from owner where address="${address}" and family="${family}"`,function(err,rows){
			if(err) throw err;
			res.send(rows);
		})
	})
})



//！！用户修改信息
router.post('/yhxzxx',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var name=req.body["name"]
	var phone=req.body["phone"]
	var sex=req.body["sex"]
	var email=req.body["email"]
	pool.query(`update owner set name="${name}",phone="${phone}",sex="${sex}",email="${email}" where id=${id}`,function(err,rows){
		pool.query(`select * from owner where id="${id}"`,function(err,rows){
			if(err) throw err;
			res.send(rows);
		})
	})
})


//！！根据小区查住户
router.post('/xqydshz',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var address=req.body["address"]
	pool.query(`select * from owner where address="${address}" and owner="1"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


module.exports=router;