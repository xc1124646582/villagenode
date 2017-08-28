var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

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
	var address=req.body["address"]
	pool.query(`select * from owner where address="${address}" and owner=1`,function(err,rows){
		if(err) throw err;	
	res.send(rows);
	})
})



//！！物业添加住户
//
//参数   name业主名字      address 小区    family   门牌号  
router.post('/wyzhuhu',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var qs=[]
	var village=req.body["village"]
	var name=req.body["name"]
	var family=req.body["family"]
	var phone=req.body["phone"]
	var sex=req.body["sex"]
	var homeyard=req.body["homeyard"]
	pool.query(`insert into owner(name,family,village,owner,phone,sex,homeyard) values("${name}","${family}","${village}",1,"${phone}","${sex}","${homeyard}")`,function(err,rows){
	pool.query(`select * from owner where village="${village}"`,function(err,rows){
		if(err) throw err;
		for(var i in rows){
			qs.unshift(rows[i])
		}
		res.send(qs);
	})
		})
})



module.exports=router;