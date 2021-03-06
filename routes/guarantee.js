var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

//业主接受 报修信息  
//参数     village  小区   con 报修问题    address门牌号
//  village   address   从前台业主信息获取
router.post('/yzjieshou',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var xiu=[]
	var village=req.body["village"]  //小区
	var address=req.body["address"]   //门牌号
	pool.query(`SELECT * from guarantee  where  address="${address}" and indexs=0 and village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			xiu.unshift(rows[i])
		}
	  	res.send(xiu)
	});
})





//业主发送 报修请求  
//参数     village  小区   con 报修问题    address门牌号
//  village   address   从前台业主信息获取
router.post('/yzguarantee',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var xiu=[]
	var con=req.body["con"]
	var village=req.body["village"]  //小区
	var address=req.body["address"]   //门牌号
	console.log(village,address)	
	pool.query(`insert into guarantee(con,village,address) values("${con}","${village}","${address}")`,function(err,rows){
	pool.query(`SELECT * from guarantee  where  address="${address}" and indexs=0 and village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			xiu.unshift(rows[i])
		}
	  	res.send(xiu)
	});
			
		})
})



//物业接收 报修请求  
//参数     village  小区     
router.post('/wyguarantee',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var xiu=[]
	var village=req.body["village"]  //小区
		pool.query(`SELECT * from guarantee  where  village="${village}" and indexs=0`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			xiu.unshift(rows[i])
		}
	  	res.send(xiu)
	});
})




//物业接收 报修请求  
//参数     village  小区     
router.post('/wyguarantees',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var xiu=[]
	var village=req.body["village"]  //小区
		pool.query(`SELECT * from guarantee  where  village="${village}" and indexs=1`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			xiu.unshift(rows[i])
		}
	  	res.send(xiu)
	});
})



//物业确认完成 报修请求  
//参数     id  请求的id     
router.post('/wyguaranteess',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var xiu=[]
	var id=req.body["id"]  
	var address=req.body["address"]  
	var village=req.body["village"]  
	pool.query(`update guarantee set  indexs=1 where id=${id}`, function(err, rows, fields) {
		console.log(rows)
		pool.query(`SELECT * from guarantee  where  address="${address}" and indexs=0 and village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			xiu.unshift(rows[i])
		}
	  	res.send(xiu)
	});
	});
})






module.exports=router;