var express=require("express");
var mysql=require("mysql");
var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"community1",
	port:"3306"
});

module.exports=pool;