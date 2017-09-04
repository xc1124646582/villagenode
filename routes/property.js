var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js")
;
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
	pool.query(`update property set toux="${img}" where id=${id}`,function(err,rows){
		pool.query(`select * from property where id="${id}"`,function(err,rows){
			if(err) throw err;
			res.send(rows);
		})
	})
})

//！！物业登录
//查询账号         参数    user   
//返回空   未注册
//如果有   查询密码是否与返回值的pass  相等  否则密码错误
router.post('/wydenglu',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	var pass=req.body["pass"]
	pool.query(`select * from property where user="${user}" and pass="${pass}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})




//！！物业信息查询
router.post('/wychaxun',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	pool.query(`select * from property where id="${id}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})



//！！添加物业信息
router.post('/bosstjwy',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var village=req.body["village"]
	var user=req.body["user"]
	var pass=req.body["pass"]
	var phone=req.body["phone"]
	pool.query(`insert into property(name,village,user,pass,phone) values("${name}","${village}","${user}","${pass}","${phone}")`,function(err,rows){
		pool.query(`select * from property`,function(err,rows){
			if(err) throw err;
			res.send(rows);
		})
	})
})




//！！展示物业信息让业主评价
router.post('/yzzhgxqwy',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	var uid=req.body["uid"]  //业主的id
	pool.query(`select * from property where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			if(rows[i].hao!=""&&rows[i].hao!=null){
			var aa=rows[i].hao.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{haos:"false"})
			}else{
			Object.assign(rows[i],{haos:"true"})
			}
			}else{
			Object.assign(rows[i],{haos:"false"})	
			}
			
			if(rows[i].cha!=""&&rows[i].cha!=null){
			var aa=rows[i].cha.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{chas:"false"})
			}else{
			Object.assign(rows[i],{chas:"true"})
			}
			}else{
			Object.assign(rows[i],{chas:"false"})	
			}
			
		}
		res.send(rows);
	})	
})




//！！业主评价物业（好评）
router.post('/yzhpwy',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var village=req.body["village"]
	var uid=req.body["uid"]  //业主id
	pool.query(`select * from property where id=${id}`,function(err,rows){
		var a=rows[0].cha
		var b=rows[0].hao
		var arr1=""
		var arr2=""
		if(b!=null&&b!=''){
			var a1=b.split("?")
			if(a1.indexOf(uid)==-1){
				a1.push(uid)
				arr1=a1.join("?")
			var arrs=[]
				for(var i in a.split("?")){
					if(a.split("?")[i]!=uid){
						arrs.push(a.split("?")[i])
					}
				}
			arr2=arrs.join("?")
			}else{
				var arr=[]
				for(var i in b.split("?")){
					if(b.split("?")[i]!=uid){
						arr.push(b.split("?")[i])
					}
				}
				arr1=arr.join("?")
				arr2=a
			}
		}else{
            arr1=uid
			var arr=[]
				for(var i in a.split("?")){
					if(a.split("?")[i]!=uid){
						arr.push(a.split("?")[i])
					}
				}
				
			arr1=arr.join("?")
		}
		
		pool.query(`update property set hao="${arr1}",cha="${arr2}" where id=${id}`,function(err,rows){
			pool.query(`select * from property where village="${village}"`,function(err,rows){
				if(err) throw err;
					for(var i in rows){
			if(rows[i].hao!=""&&rows[i].hao!=null){
			var aa=rows[i].hao.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{haos:"false"})
			}else{
			Object.assign(rows[i],{haos:"true"})
			}
			}else{
			Object.assign(rows[i],{haos:"false"})	
			}
			
			if(rows[i].cha!=""&&rows[i].cha!=null){
			var aa=rows[i].cha.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{chas:"false"})
			}else{
			Object.assign(rows[i],{chas:"true"})
			}
			}else{
			Object.assign(rows[i],{chas:"false"})	
			}
			
		}
					res.send(rows)
			})
		})	
		
		
	})	
})



//！！业主评价物业（差评）
router.post('/yzcpwy',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var village=req.body["village"]
	var uid=req.body["uid"]
	pool.query(`select * from property where id=${id}`,function(err,rows){
		var a=rows[0].cha
		var b=rows[0].hao
		var arr1=""
		var arr2=""
		if(a!=null&&a!=''){
			var a1=a.split("?")
			if(a1.indexOf(uid)==-1){
				a1.push(uid)
				arr2=a1.join("?")
				console.log(arr2)
			var arrs=[]
				for(var i in b.split("?")){
					if(b.split("?")[i]!=uid){
						arrs.push(b.split("?")[i])
					}
				}
			arr1=arrs.join("?")
			}else{
				var arr=[]
				for(var i in a.split("?")){
					if(a.split("?")[i]!=uid){
						arr.push(a.split("?")[i])
					}
				}
				arr2=arr.join("?")
				arr1=b
			}
		}else{
			arr2=uid
			var arr=[]
			console.log(b.split("?"))
				for(var i in b.split("?")){
					if(b.split("?")[i]!=uid){
						arr.push(b.split("?")[i])
					}
				}
				
			arr1=arr.join("?")
		}
		
		pool.query(`update property set hao="${arr1}",cha="${arr2}" where id=${id}`,function(err,rows){
			pool.query(`select * from property where village="${village}"`,function(err,rows){
				if(err) throw err;
					for(var i in rows){
			if(rows[i].hao!=""&&rows[i].hao!=null){
			var aa=rows[i].hao.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{haos:"false"})
			}else{
			Object.assign(rows[i],{haos:"true"})
			}
			}else{
			Object.assign(rows[i],{haos:"false"})	
			}
			
			if(rows[i].cha!=""&&rows[i].cha!=null){
			var aa=rows[i].cha.split("?")
			if(aa.indexOf(uid)==-1){
			Object.assign(rows[i],{chas:"false"})
			}else{
			Object.assign(rows[i],{chas:"true"})
			}
			}else{
			Object.assign(rows[i],{chas:"false"})	
			}
			
		}
					res.send(rows)
			})
		})	
		
		
	})	
})



module.exports=router;