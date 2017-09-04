var express = require('express');  
var app = express();  
var qr_image = require('qr-image');  
app.get('/qrcode',function(req,res){  
    var temp_qrcode = qr_image.image('http://www.baidu.com');  
    res.type('png');  
    temp_qrcode.pipe(res);  
})  
app.listen(80);  
