var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js")
;
var router=express.Router();


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
	pool.query(`select * from property where village="${village}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})	
})




//！！业主评价物业（好评）
router.post('/yzhpwy',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	var village=req.body["village"]
	var uid=req.body["uid"]
	pool.query(`select * from property where id=${id}`,function(err,rows){
		var a=rows[0].hao
		var b=rows[0].cha
		var arr1=""
		var arr2=""
		if(a!=null&&a!=''){
			var a1=a.split("?")
			if(a1.indexOf(uid)==-1){
				arr1=al.concat(uid).join("?")
			}
		}else{
			arr1=uid
		}
		if(b!=null&&b!=''){
			var b1=b.split("?")
			var ss=[]
			if(b1.indexOf(uid)!=-1){
				for(var i in b1){
					if(b1[i]!=uid){
						ss.push(b1[i])
					}
				}
				arr2=ss.join("?")
			}
		}
		pool.query(`update property set hao="${arr1}",cha="${arr2}" where id=${id}`,function(err,rows){
			pool.query(`select * from property where village="${village}"`,function(err,rows){
				if(err) throw err;
				res.send(rows);
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
		var b=rows[0].hao
		var a=rows[0].cha
		var arr1=""
		var arr2=""
		if(a!=null&&a!=''){
			var a1=a.split("?")
			if(a1.indexOf(uid)==-1){
				arr1=al.concat(uid).join("?")
			}
		}else{
			arr1=uid
		}
		if(b!=null&&b!=''){
			var b1=b.split("?")
			var ss=[]
			if(b1.indexOf(uid)!=-1){
				for(var i in b1){
					if(b1[i]!=uid){
						ss.push(b1[i])
					}
				}
				arr2=ss.join("?")
			}
		}
		pool.query(`update property set hao="${arr2}",cha="${arr1}" where id=${id}`,function(err,rows){
			pool.query(`select * from property where village="${village}"`,function(err,rows){
				if(err) throw err;
				res.send(rows);
			})
		})
	})	
})



//！！boss查看物业人数
router.post('/bosskwyrs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
	pool.query(`select * from property where village="${village}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})	
})


module.exports=router;