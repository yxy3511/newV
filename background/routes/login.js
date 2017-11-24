/**
 * Created by yxy3511 on 2017/9/14
 *
 *   登录页
 *
 *
 */
var express = require('express');
var router = express.Router();
var loginContent = require('./../dao/loginContent.js');
var proListContent = require('./../dao/proListContent.js');
var cryptico = require('crypto');
// var md5 = cryptico.createHash('md5');

toLogin=function(req,res){
    req.session.destroy();
    res.render('login')
}
toRegister=function(req,res){
    res.render('register')
}
registering = function(req,res){
    try{
        var uname = req.body.rename
        var pwd = req.body.repass
        var againpwd = req.body.againpass
        if(uname == ''){
            return res.render('register',{
                    msg:'用户名不能为空！'
                });
        }else if(pwd == ''){
            return res.render('register',{
                    msg:'密码不能为空！'
                });
        }else if(againpwd == ''){
            return res.render('register',{
                    msg:'请再次输入密码！'
                });
        }
        var params = {}
        params.uname = uname
        params.pwd = pwd

        loginContent.searchUser(uname,function(err,vals){
            if(err){
                console.log(err)
            }else if(vals.length > 0){
                //用户名已被使用
                res.render('register',{
                    msg:'此用户名已被注册！'
                });
            }else if(params.pwd != againpwd){
                res.render('register',{
                    msg:'两次密码输入不相同！'
                });
            }else if(vals.length == 0){
                loginContent.addUser(params,function(err,vals){
                    if(err){
                        console.log(err)
                    }else if(vals.affectedRows > 0){
                        /*loginContent.searchUser('all',function(e,val){
                            if(e){
                                console.log(e)
                            }else{
                                proListContent.getRoles(function(err,vals){
                                    if(err){
                                        console.log(err)
                                    }else{
                                        var roleArr = {}
                                        for(var i in vals){
                                            roleArr[vals[i].id] = vals[i].rname
                                        }

                                        var userArr = {}
                                        for(var j in val){
                                            userArr[j] = {
                                                uname: val[j].uname,
                                                pwd: val[j].pwd,
                                                role: roleArr[val[j].role],
                                                uid: val[j].uid
                                            }
                                        }
                                        res.render('user',{
                                            users: JSON.stringify(userArr),
                                            msg:'注册成功！'
                                        })
                                    }
                                })
                            }
                            
                        })*/
                        var msg = '注册成功！'
                        req.session.manageMsg = msg
                        res.redirect('/manage/getUser')
                       /* res.render('login',{
                            msg:'注册成功！'
                        })*/
                    }
                })    
            }

        })

    }catch(e){
        console.log(e)
    }
       
}
loggingIn = function(req,res){
    try{
        var uname = req.body.uname
        var pwd = req.body.pwd
        console.log(1111,uname)
        console.log(222,pwd)
        if(uname.length == 0){
            return res.render('login',{
                    msg: '用户名不能为空！'
                })
        }else if(pwd.length == 0){
            return res.render('login',{
                    msg: '密码不能为空！'
                })
        }
        var params = {}
        params.uname = uname
        params.pwd = pwd

        loginContent.searchUser(uname,function(err,vals){
            var pass = cryptico.createHash('md5').update(params.pwd).digest('base64')
            if(err){
                console.log(err)
            }else if(vals.length > 0 && vals[0].pwd != pass){
                // delete req.session.isLogged;
                //用户名存在,密码不正确
                return res.render('login',{
                    msg: '密码不正确！'
                })        
                
            }else if(vals.length == 0){
                // delete req.session.isLogged;
                return res.render('login',{
                    msg: '用户名不存在！'
                })

            }else{
                //登录成功
                //操作session
                req.session.isLogged = true;
                res.redirect('/manage/proList')
            }   

        })

    }catch(e){
        console.log(e)
    }
}
router.get('/login',toLogin);
router.get('/manage/register',toRegister);
router.post('/registering',registering);
router.post('/logging',loggingIn);

module.exports = router

