/**
 * Created by xuanx on 2016/12/27
 *
 *   策略配置
 *
 *
 */
var express = require('express');
var router = express.Router();
var proListContent = require('./../dao/proListContent.js');
var loginContent = require('./../dao/loginContent.js');
 
toProList = function(req,res){
    // res.render('proList')
     try{
        var mid = req.params.msg || null
        proListContent.getProList(0,function(err,vals){
            // console.log('valllll:',vals)
            if(err){
                console.log(err)
            }else{
                //頁數
                var totalCount = vals.length
                var pageLine = 10
                var pageCount = -1
                if(parseInt(totalCount/pageLine) == 0){
                    pageCount = 1
                }else if(totalCount%pageLine > 0 && totalCount%pageLine < pageLine){
                    pageCount = parseInt(totalCount/pageLine) + 1
                }else{
                    pageCount = parseInt(totalCount/pageLine)
                }
                var resArr = {}
                for(var i in vals){
                    resArr[i] = vals[i]
                }
                //获取sorts
                proListContent.getSorts('all',function(e,val){
                    if(e){
                        console.log(e)
                    }else{
                        var sortArr = {}
                        for(var j in val){
                            sortArr[val[j].id] = val[j].name
                        }
                        /*var msg = null
                        if(mid == 0){
                            msg= '保存失败，商品名不能为空！'
                        }else if(mid == 1){
                            msg= '保存失败，商品价格不能为空！'
                        }else if(mid == 2){
                            msg= '保存失败，商品描述不能为空！'
                        }else if(mid == 3){
                            msg= '保存失败，商品图片不能为空！'
                        }*/
                        res.render('proList',{
                            // res.render('tbodyPro',{
                            vals: JSON.stringify(resArr),
                            sorts: JSON.stringify(sortArr),
                            // msg: msg
                        })
                    }
                    
                })
                    
                
            }
            
        })
        
    }catch(e){
        console.log(e)
    }
}

getProList = function(req,res,next){
    try{
        var msg = req.session.manageMsg
        req.session.manageMsg = null
        proListContent.getProList(0,function(err,vals){
            // console.log('valllll:',vals)
            if(err){
                console.log(err)
            }else{
                //頁數
                var totalCount = vals.length
                var pageLine = 10
                var pageCount = -1
                if(parseInt(totalCount/pageLine) == 0){
                    pageCount = 1
                }else if(totalCount%pageLine > 0 && totalCount%pageLine < pageLine){
                    pageCount = parseInt(totalCount/pageLine) + 1
                }else{
                    pageCount = parseInt(totalCount/pageLine)
                }
                var resArr = {}
                for(var i in vals){
                    resArr[i] = vals[i]
                }
                // console.log('rrrreessArr:',resArr)
                //获取sorts
                proListContent.getSorts('all',function(e,val){
                    if(e){
                        console.log(e)
                    }else{
                        var sortArr = {}
                        for(var j in val){
                            sortArr[val[j].id] = val[j].name
                        }
                        res.render('proList',{
                        // res.render('tbodyPro',{
                            vals: JSON.stringify(resArr),
                            sorts: JSON.stringify(sortArr),
                            pageCount: pageCount,
                            totalCount: totalCount,
                            msg: msg
                        })
                    }
                })                
            }
            
        })
        
    }catch(e){
        console.log(e)
    }
}
savePro = function(req,res,next){
    global.imagesArr = []
    try{
        var id = req.query.id || null
        var pname = req.body.pname || null
        var price = req.body.price || null
        var state = req.body.state || null
        var desc = req.body.desc || null
        var imgs = req.body.allImg || null
        var sort = req.body.sort || null

        var params = {}
        pname ? (params.pname = pname) : null
        price ? (params.price = price) : null
        state ? (params.state = state) : null
        desc ? (params.desc = desc) : null
        imgs ? (params.imgs = imgs) : null
        sort ? (params.sort = sort) : null

        /*params.pname = pname
        params.price = price
        params.state = state
        params.desc = desc
        params.imgs = imgs
        params.sort = sort*/

        /*if(!pname || !price || !desc || !imgs){
            if(!pname){
                msg= '保存失败，商品名不能为空1！'
            }else if(!price){
                msg= '保存失败，商品价格不能为空1！'
            }else if(!desc){
                msg= '保存失败，商品描述不能为空1！'
            }else if(!imgs){
                msg= '保存失败，商品图片不能为空1！'
            }
            // var msg = msg
            // res.render('uploadImg')
            params.msg = msg
            res.render('uploadImg',params)
            
        }*/
        /*var msg = null 
        if(!pname || !price || !desc || !imgs){
            // toProList()
            if(!pname){
                msg= 0
                // msg= '保存失败，商品名不能为空！'
            }else if(!price){
                // msg= '保存失败，商品价格不能为空！'
                msg= 1
            }else if(!desc){
                // msg= msg= '保存失败，商品描述不能为空！'
                msg= 2
            }else if(!imgs){
                // msg= '保存失败，商品图片不能为空！'
                msg= 3
            }
            // params.msg = msg
            // console.log('params:',params)
            // res.render('uploadImg',{msg:msg})
            res.redirect('/manage/toProList/'+msg)
        }*/
            
        if(id == 0){
            proListContent.addPro(params,function(err,vals){
                // global.imagesArr = []
                if(err){
                    res.render('error',{
                        message: 'Error',
                        errMsg: err.sqlMessage
                    })
                }else if(vals.affectedRows > 0){
                    res.redirect('/manage/proList')
                    // res.render('proList',{
                    //     msg: '添加商品成功！'
                    // })
                }
            })
        }else{
            proListContent.editPro(id,params,function(err,vals){
                // global.imagesArr = []
                if(err){
                    console.log(err)
                }else if(vals.affectedRows > 0){
                    res.redirect('/manage/proList')
                }
            })
        }
        
    }catch(e){
        console.log(e)
    }
    
};

delPro = function(req,res,next){
    try{
        var id = req.params.id
        proListContent.delPro(id,function(error,vals){
            if(error){
                console.log(error)
            }else if(vals.affectedRows > 0){
                //删除成功
                res.redirect('/manage/proList')
                // res.render('proList')
            }
        })
    }catch(e){
        console.log(e)
    }
}

descPro = function(req,res,next){
    try{
        var id = req.params.id
        proListContent.descPro(id,function(err,vals){
            if(err){
                console.log(err)
            }else if(vals.length > 0){
                //vals是数组
                res.render("proDesc",vals[0])
            }
        })
    }catch(e){
        console.log(e)
    }
}

editPro = function(req,res,next){
    try{
        var id = req.params.id || null
        global.imagesArr = []
        if(id != null){
            proListContent.descPro(id,function(err,vals){
                if(err){
                    console.log(err)
                }else if(vals.length > 0){
                    //把图片取出来复制给global.imagesArr
                    global.imagesArr.push(JSON.parse(vals[0].imgs));
                    proListContent.getSorts('all',function(e,val){
                        if(e){
                            console.log(e)
                        }else{
                            var sortArr = {}
                            for(var j in val){
                                sortArr[val[j].id] = val[j].name
                            }
                            vals[0].sorts = JSON.stringify(sortArr)
                            //vals是数组
                            res.render("uploadImg",vals[0])
                        }
                    })
                }
            })
            
        }else{
            res.render("uploadImg")
        }
        
        
    }catch(e){
        console.log(e)
    }
}
searchPro = function(req,res,next){
    try{
        var key = req.query.key
        if(key != null){
            proListContent.searchPro(key,function(err,vals){
                if(err){
                    console.log(err)
                }else if(vals.length > 0){
                    var resArr = {}
                    for(var i in vals){
                        resArr[i] = vals[i]
                    }
                    //获取sorts
                    proListContent.getSorts('all',function(e,val){
                        if(e){
                            console.log(e)
                        }else{
                            var sortArr = {}
                            for(var j in val){
                                sortArr[val[j].id] = val[j].name
                            }
                            res.render('proList',{
                                vals: JSON.stringify(resArr),
                                sorts: JSON.stringify(sortArr)
                            })
                        }
                    })
                   
                }else{
                    req.session.manageMsg = '查询无结果！'
                    res.redirect('/manage/proList')
                    /*proListContent.getProList(0,function(err,vals){
                        if(err){
                            console.log(err)
                        }else{
                            // console.log('valllll:',vals)
                            //頁數
                            var totalCount = vals.length
                            var pageLine = 10
                            var pageCount = -1
                            if(parseInt(totalCount/pageLine) == 0){
                                pageCount = 1
                            }else if(totalCount%pageLine > 0 && totalCount%pageLine < pageLine){
                                pageCount = parseInt(totalCount/pageLine) + 1
                            }else{
                                pageCount = parseInt(totalCount/pageLine)
                            }
                            var resArr = {}
                            for(var i in vals){
                                resArr[i] = vals[i]
                            }

                            if(vals.length > 0){
                                //获取sorts
                                proListContent.getSorts('all',function(e,val){
                                    if(e){
                                        console.log(e)
                                    }else{
                                        var sortArr = {}
                                        for(var j in val){
                                            sortArr[val[j].id] = val[j].name
                                        }
                                        res.render('proList',{
                                        // res.render('tbodyPro',{
                                            vals: JSON.stringify(resArr),
                                            sorts: JSON.stringify(sortArr),
                                            pageCount: pageCount,
                                            totalCount: totalCount,
                                            msg:'查询无结果！'
                                        })
                                    }
                                })
                                
                            }
                        }
                        
                    })*/
                }
            })
        }
        
    }catch(e){
        console.log(e)
    }
}

delImg = function(req,res,next){
    try{
        var imgId = parseInt(req.params.mid)
        var cnt = 0;
        /*var all = {}
        for(var l in global.imagesArr){
            for(var z in global.imagesArr[l]){
                all[cnt] = global.imagesArr[l][z]
                cnt += 1
            }
        }
        console.log('before:',all)
        console.log('mid:',imgId)
        delete all[imgId];*/
        var imgs = {}
        for(var l in global.imagesArr){
            for(var z in global.imagesArr[l]){
                imgs[cnt] = global.imagesArr[l][z]
                cnt += 1
            }
        }
        delete imgs[imgId];
        var all = {}
        var index = 0 
        for(var i in imgs){
            all[index] = imgs[i]
            index += 1
        }
        global.imagesArr = [];
        global.imagesArr.push(all)
        res.send({vals:JSON.stringify(global.imagesArr)})
    }catch(e){
        console.log(e)
    }
}

getSortList = function(req,res,next){
    try{
        var msg = req.session.manageMsg
        req.session.manageMsg = null
         proListContent.getSorts('all',function(e,val){
            if(e){
                console.log(e)
            }else{
                var sortArr = {}
                for(var j in val){
                    sortArr[val[j].id] = val[j].name
                }
                res.render('sorts',{
                    sorts: JSON.stringify(sortArr),
                    msg: msg
                })
            }
            
        })
    }catch(e){
        console.log(e)
    }
}

saveSort = function(req,res,next){
    try{
        var sid = req.params.sid
        var text = req.params.text
        proListContent.upSorts(sid,text,function(err,vals){
            if(err){
                console.log(err)
            }else{
                proListContent.getSorts('all',function(e,val){
                    if(e){
                        console.log(e)
                    }else{
                        res.redirect('/manage/editSorts')
                        /*var sortArr = {}
                        for(var j in val){
                            sortArr[val[j].id] = val[j].name
                        }
                        res.render('sorts',{
                            sorts: JSON.stringify(sortArr),
                        })*/
                    }
                    
                })
            }
            
        })
    }catch(err){
        console.log(err)
    }
}

addSort = function(req,res,next){
    try{
        // var sid = req.params.sid
        var text = req.params.text
        proListContent.addSorts(text,function(err,vals){
            if(err){
                console.log(err)
            }else{
                proListContent.getSorts('all',function(e,val){
                    if(e){
                        console.log(e)
                    }else{
                        res.redirect('/manage/editSorts')
                        /*var sortArr = {}
                        for(var j in val){
                            sortArr[val[j].id] = val[j].name
                        }
                        res.render('sorts',{
                            sorts: JSON.stringify(sortArr),
                        })*/
                    }
                    
                })
            }
            
        })
    }catch(err){
        console.log(err)
    }
}

delSort = function(req,res,next){
    try{
        var sid = req.params.sid
        proListContent.getSortPro(sid,function(err,val){
            if(err){
                console.log(err)
            }else{
                if(val.length > 0){
                    req.session.manageMsg = '存在此类型的商品，类型删除失败！'
                    return res.redirect('/manage/editSorts')
                }else{
                    proListContent.delSort(sid,function(err,vals){
                        if(err){
                            console.log(err)
                        }else{
                            res.redirect('/manage/editSorts')
                            /*proListContent.getSorts('all',function(e,val){
                                if(e){
                                    console.log(e)
                                }else{
                                    var sortArr = {}
                                    for(var j in val){
                                        sortArr[val[j].id] = val[j].name
                                    }
                                    res.render('sorts',{
                                        sorts: JSON.stringify(sortArr),
                                    })
                                }
                                
                            })*/
                        }
                        
                    })
                }
            }
        })
        
    }catch(err){
        console.log(err)
    }
}



getUserList = function(req,res,next){
    try{
        var msg = req.session.manageMsg
        req.session.manageMsg = null
        console.log(msg)
        loginContent.searchUser('all',function(e,val){
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
                            msg: msg
                        })
                    }
                })
            }
            
        })
    }catch(e){
        console.log(e)
    }
}
// editUser = function(req,res,next){
//     try{
//         var sid = req.params.uid
//         var text = req.params.text
//         var opera = req.params.opera
//         proListContent.editUser(opera,sid,text,function(err,vals){
//             if(err){
//                 console.log(err)
//             }else{
//                 proListContent.getSorts('all',function(e,val){
//                     if(e){
//                         console.log(e)
//                     }else{
//                         var sortArr = {}
//                         for(var j in val){
//                             sortArr[val[j].id] = val[j].name
//                         }
//                         res.render('sorts',{
//                             sorts: JSON.stringify(sortArr),
//                         })
//                     }
                    
//                 })
//             }
            
//         })
//     }catch(err){
//         console.log(err)
//     }
// }

saveUser = function(req,res,next){
    try{
        var uid = req.body.uid
        var uname = req.body.uname
        var pwd = req.body.pwd
        var role = req.body.role
        var msg = null
        loginContent.searchUser(uname,function(err,vals){
            if(err){
                console.log(err)
            }else if(vals.length > 0){
                //用户名已被使用
                msg = '此用户名已被注册！'
            }
        })
        var text = {}
        text.uid = uid
        text.uname = uname
        text.pwd = pwd
        text.role = JSON.parse(role)
        if(msg != null){
            loginContent.searchUser('all',function(e,val){
                if(e){
                    console.log(e)
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
                        msg: msg
                    })
                }
                
            })
        }else{
            loginContent.saveUser(text,function(err,vals){
                if(err){
                    console.log(err)
                }else{
                    loginContent.searchUser('all',function(e,val){
                        if(e){
                            console.log(e)
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
                            })
                        }
                        
                    })
                }
                
            })
        }
    }catch(err){
        console.log(err)
    }
}

/*addUser = function(req,res,next){
    try{
        // var sid = req.params.sid
        var text = req.params.text
        proListContent.addUser(text,function(err,vals){
            if(err){
                console.log(err)
            }else{
                proListContent.getSorts('all',function(e,val){
                    if(e){
                        console.log(e)
                    }else{
                        var sortArr = {}
                        for(var j in val){
                            sortArr[val[j].id] = val[j].name
                        }
                        res.render('sorts',{
                            sorts: JSON.stringify(sortArr),
                        })
                    }
                    
                })
            }
            
        })
    }catch(err){
        console.log(err)
    }
}*/

delUser = function(req,res,next){
    try{
        var uid = req.params.uid
        loginContent.delUser(uid,function(err,vals){
            if(err){
                console.log(err)
            }else{
                /*loginContent.searchUser('all',function(e,val){
                    if(e){
                        console.log(e)
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
                        })
                        
                    }
                    
                })*/
                var msg = '删除成功！'
                req.session.manageMsg = msg
                res.redirect('/manage/getUser')
            }
            
        })
    }catch(err){
        console.log(err)
    }
}


editAboutUs = function(req,res,next){
    try{
        proListContent.getAboutUs(function(err,vals){
            if(err){
                console.log(err)
            }else{
                vals[0].content = setSC(JSON.parse(vals[0].content))
                res.render('editAboutUs',vals[0])
            }
        })
            
    }catch(err){
        console.log(err)
    }
}
isNull = function(vals){
    var val = vals
    if(val['value'].length == 0 && val['img'] == '' && val['title'] == ''){
        return true
    }
    return false
}

RemoveSC = function(val){
    var reg=new RegExp("\r\n","g"); 
    val= val.replace(reg,"<br>"); 
    /*var str = val.toString()
    str = str.replace("\n\r", "<br/>");
    str = str.replace("\r\n", "<br/>");
    str = str.replace("\n", "<br/>");
    str = str.replace("\r", "<br/>");
    str = str.replace("\t", "    ");
    str = str.replace(" ", " ");
    str = str.replace("\"", "\\" + "\"");
    return str*/
    return val
}

setSC = function(val){
    var reg=new RegExp("<br>","g"); 
    var res = []
    for(var obj of val){
        obj['value'] = obj['value'].replace(reg,"\r\n")
        console.log(99999999,obj)
        res.push(obj)
    }
    console.log(2333,res)
    return JSON.stringify(res)
}
addAboutUs = function(req,res,next){
    try{
        var item = {}
        var params = {}
        params.title = req.body.bname || ''
        params.desc_txt = req.body.desc_txt || ''
        params.subTitle = req.body.subTitle || ''
        params.info = req.body.info || ''
        params.allImg = JSON.parse(req.body.allImg) || ''
        item.title = params.title || ''
        item.desc_txt = params.desc_txt || ''
        item.value = []
        if(typeof params.info == 'string'){
            var obj = {}
            obj.value = RemoveSC(params.info) || ''
            obj.title = params.subTitle || ''
            obj.img = params.allImg[2] || ''
            if(! isNull(obj)){
                item.value.push(obj)
            }

        }else{
            for(var i = 0;i<params.info.length; i++){
                /*if(params.info[i] != ''){
                    var obj = {}
                    obj.value = params.info[i] || ''
                    obj.title = params.subTitle[i] || ''
                    obj.img = params.allImg[i +2] || ''
                    item.value.push(obj)
                }*/
                var obj = {}
                obj.value = RemoveSC(params.info[i]) || ''
                obj.title = params.subTitle[i] || ''
                obj.img = params.allImg[i +2] || ''
                if(isNull(obj)){
                    continue 
                }
                item.value.push(obj)
                
            }
        }
        
        var state = 'edit'
        proListContent.getAboutUs(function(err,val){
            if(err){
                console.log(err)
            }else if(val.length == 0){
                state = 'add'
            }

            if(state == 'add'){
                proListContent.addAboutUs(item,function(err,vals){
                    if(err){
                        console.log(err)
                    }else{
                        req.session.manageMsg = '公司介绍添加成功！'
                        res.redirect('/aboutUs')
                    }
                })
            }else{
                proListContent.editAboutUs(item,function(err,vals){
                    if(err){
                        console.log(err)
                    }else{
                        req.session.manageMsg = '公司介绍修改成功！'
                        res.redirect('/aboutUs')
                    }
                })
            }
        })
        
            
    }catch(err){
        console.log(err)
    }
}

router.get('/proList',getProList);
router.get('/delPro/:id',delPro);
router.post('/savePro',savePro);
// router.post('/upPro/:id',upPro);
router.get('/descPro/:id',descPro);
router.get('/editPro/:id',editPro);
router.get('/searchPro',searchPro);
router.get('/delImg/:mid',delImg);
router.get('/toProList/:msg',toProList)
router.get('/editSorts',getSortList)
router.get('/saveSort/:sid/:text',saveSort)
router.get('/addSort/:text',addSort)
router.get('/delSort/:sid',delSort)
router.get('/editAboutUs',editAboutUs)
router.post('/addAboutUs',addAboutUs)

router.get('/getUser',getUserList)
router.get('/delUser/:uid',delUser)
// router.get('/editUser/:opera/:uid/:text',editUser)
router.post('/saveUser',saveUser)
// router.get('/addUser/:text',addUser)
module.exports = router