var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();


//物业查询包     
//参数  name 邮包的名字     village  门牌号
router.post('/wymailtj',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var village=req.body["village"]
		pool.query(`SELECT * from mail where village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
})

//物业发送邮包     
//参数  name 邮包的名字     village  门牌号
router.post('/wymail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var name=req.body["name"]
	var village=req.body["village"]
	var phone=req.body["phone"]
	var delivery=req.body["delivery"]  //快递
	pool.query(`insert into mail(name,village,phone,delivery) values("${name}","${village}","${phone}","${delivery}")`,function(err,rows){
		pool.query(`SELECT * from mail where village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
		})
})


//物业确认接收邮包     
//参数  id   前台传入邮包的id
//无返回值
router.post('/wymailjs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var id=req.body["id"]
	pool.query(`update mail set  indexs=1 where id=${id}`, function(err, rows, fields) {
		if(err) throw err;
		res.send(rows);
	});
})



//业主接受邮包
// 参数  village 门牌号   address  小区   
//indexs   确认是否领取的
router.post('/yzmail',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    var village=req.body["village"]
    var address=req.body["address"]
		pool.query(`select * from mail where  address="${address}"  and  indexs=0 and  village="${village}"`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
})







module.exports=router;