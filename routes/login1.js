var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();




//router.get("/fexs",function (req,res){
//	res.header("Access-Control-Allow-Origin", "*");
//	pool.query('SELECT * from plot', function(err, rows, fields) {
//		if (err) throw err;
//	  	res.send(rows)
//	});
//});

//查询账号         参数    user   
//返回空   未注册
//如果有   查询密码是否与返回值的pass  相等  否则密码错误
router.post('/zhinquiry',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	var pass=req.body["pass"]
	pool.query(`select * from owner where user="${user}"  and  pass="${pass}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


//查询入户码        参数 homeyard
//返回空   入户码错误
//如果有  查询返回值 user  为null 成功  否则已注册
//保留 id  到注册页面  
router.post('/rhminquiry',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var homeyard=req.body["homeyard"]
	console.log(homeyard)
	pool.query(`select * from owner where homeyard="${homeyard}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})




//注册   查询账号
router.post('/zczhminquiry',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	pool.query(`select * from owner where user="${user}"`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})




//注册   传入上个页面保存的id    参数   id  user  pass
router.post('/zcminquiry',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	var user=req.body["user"]
	var pass=req.body["pass"]
	var id=req.body["id"]
		pool.query(`update owner set  user="${user}" , pass="${pass}" where id=${id}`, function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	})
})



module.exports=router;