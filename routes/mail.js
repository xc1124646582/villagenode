var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();

router.post('/wymailmph',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var address=req.body["village"];
		pool.query(`SELECT * from owner where address="${address}" and owner=1`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
})



//物业查询包     
//参数  name 邮包的名字     village  门牌号
router.post('/wymailtj',function(req,res){
	var ybs=[]
	res.header("Access-Control-Allow-Origin", "*");
	var address=req.body["address"];
		pool.query(`SELECT * from mail where address="${address}"`, function(err, rows, fields) {
		if (err) throw err;
		for(var i in rows){
			ybs.unshift(rows[i])
		}
	  	res.send(ybs)
	});
})

//物业发送邮包     
//参数  name 邮包的名字     village  门牌号
router.post('/wymail',function(req,res){
	var ybs=[]
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var address=req.body["address"]
	var phone=req.body["phone"]
	var delivery=req.body["delivery"]  //快递
	var village=req.body["village"]
	pool.query(`insert into mail(name,address,phone,delivery,village) values("${name}","${address}","${phone}","${delivery}","${village}")`,function(err,rows){
		pool.query(`SELECT * from mail where address="${address}"`, function(err, rows, fields) {
		if (err) throw err;
	  			for(var i in rows){
			ybs.unshift(rows[i])
		}
	  	res.send(ybs)
	});
			
		})
})


//物业确认接收邮包     
//参数  id   前台传入邮包的id
//无返回值
router.post('/wymailjs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var ybs=[]
	var id=req.body["id"]
	var address=req.body["address"]
	pool.query(`update mail set  indexs=1 where id=${id}`, function(err, rows, fields) {
	pool.query(`select * from mail where  address="${address}"`, function(err, rows, fields) {
		if (err) throw err;
	for(var i in rows){
			ybs.unshift(rows[i])
		}
	  	res.send(ybs)
	});
	});
})



//业主接受邮包
// 参数  village 门牌号   address  小区   
//indexs   确认是否领取的
router.post('/yzmail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    var village=req.body["village"];
    var address=req.body["address"];
		pool.query(`select * from mail where  address="${address}"  and  indexs=0 and  village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows);
	});
			
})







module.exports=router;