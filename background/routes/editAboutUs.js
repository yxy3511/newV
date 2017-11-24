var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var proListContent = require('./../dao/proListContent.js');

global.aboutUsImgsArr = []
/* 上传*/
router.post('/upAboutUs', function(req, res, next){
    // global.imagesArr = []
    //写这没有2,1-2问题
    var images = []
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/images/aboutUs'});
    //上传完成后处理 
    form.parse(req, function(err, fields, files) {
        images.push(files)
        var dstPath = {} 
        var imgArr = []
        if(err){
            console.log('parse error: ' + err);
        }else if(images){
            for(var i in images){
                var filesTmp = JSON.stringify(images[i],null,2); 
                for(var j in images[i]['inputFile']){
                    // var index =  parseInt(j)+imgArr.length
                    var index =  j
                    var inputFile = images[i]['inputFile'][j];
                    var uploadedPath = inputFile['path'];
                    if(inputFile['size'] == 0){
                        continue;
                    }
                    //存数据库存这个 
                    imgArr[index] = '/images/aboutUs/' + inputFile['originalFilename'];
                    var renamePath = './public/images/aboutUs/' + inputFile['originalFilename'];
                    //重命名为真实文件名
                    fs.rename(uploadedPath, renamePath, function(err) {
                        if(err){
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                                               
                }
                
            }
            
        }
        global.aboutUsImgsArr.push(imgArr)
        dstPath.imgs = JSON.stringify(imgArr)
        console.log('dstpath:',dstPath)
        res.send(dstPath)
        // res.end();
    });
});


module.exports = router;