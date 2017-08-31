var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();



//！！小区展示
router.post('/plotzs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`select * from plot`,function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


module.exports=router;