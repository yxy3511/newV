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

rePage=function(req,res){
	res.redirect('/page');
}
toPage=function(req,res){
    try{
        //获取商品前九个，按时间排
        proListContent.getPros(9,function(err,vals){
            if(err){
                console.log(err)
            }else{
                if(vals.length > 0){
                    var resArr = {}
                    for(var i in vals){
                        resArr[i] = vals[i]
                    }
                    if(vals.length > 0){
                        res.send({vals: JSON.stringify(resArr)})
                        // res.render('page',{
                        //     vals: JSON.stringify(resArr)
                        // })
                    }
                }
            }
        })
    }catch(e){
        console.log(e)
    }
    
}
setSC = function(val){
    var reg=new RegExp("<br>","g"); 
    var res = []
    for(var obj of val){
        obj['value'] = obj['value'].replace(reg,"\r\n")
        res.push(obj)
    }
    return JSON.stringify(res)
}
toAbout=function(req,res){
	// res.render('aboutUs');
    var msg = req.session.manageMsg
    req.session.manageMsg = null
    //获得页面信息
    proListContent.getAboutUs(function(err,vals){
        if(err){
            console.log(err)
        }else{
            console.log('vals.length:',vals.length)
            if(vals.length > 0){
                vals[0].content = setSC(JSON.parse(vals[0].content))
                res.render('aboutUs',{
                    vals: JSON.stringify(vals[0]),
                    msg:msg
                })
            }else{
                req.session.manageMsg = '暂无介绍'
                res.render('aboutUs',{
                    msg:msg
                })
            }
        }
    })
}
toProducts=function(req,res){
    try{
        var sid = req.params.sid ? parseInt(req.params.sid) : 0
        proListContent.getProList(sid,function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                for(var i in vals){
                    resArr[i] = vals[i]
                }
                if(vals.length > 0){
                    res.render('products',{
                        vals: JSON.stringify(resArr)
                    })
                }else{
                    proListContent.getProList(0,function(e,val){
                        if(e){
                            console.log(e)
                        }else{
                            var resObj = {}
                            for(var j in val){
                                resObj[j] = val[j]
                            }
                            if(val.length > 0){
                                res.render('products',{
                                    vals: JSON.stringify(resObj),
                                    msg: '暂无此类商品！'
                                })
                            }
                        }
                    })
                    // res.redirect('/products/0')
                }
            }
        }) 
    }catch(e){
        console.log(e)
    }                                                                                             
}
toProDesc=function(req,res){
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
getProDesc=function(req,res){
    try{
        var key = req.query.key
        proListContent.getProId(key,function(err,vals){
            if(err){
                console.log(err)
            }else{
                console.log(vals[0]['pid'])
                var id = vals[0]['pid']
                res.redirect('/proDesc/'+id)
            }
        })
    }catch(e){
        console.log(e)
    }
}
toContact=function(req,res){
	res.render('contact');
}
getSorts = function(req,res){
    try{
        proListContent.getSorts('name',function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                for(var i in vals){
                    resArr[i] = vals[i]
                }
                res.render('layout',{vals:JSON.stringify(resArr)})
            }
        })

    }catch(e){
        console.log(e)
    }
}

searchPro = function(req,res,next){
    try{
        var key = req.query.key
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
                         res.render('products',{
                            vals: JSON.stringify(resArr),
                            sorts: JSON.stringify(sortArr)
                        })
                        // res.render('tbodyPro',vals[0])
                    }
                })
               
            }else{
                // res.redirect('/manage/proList')
                proListContent.getProList(0,function(err,vals){
                    if(err){
                        console.log(err)
                    }else{
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
                                    res.render('products',{
                                        vals: JSON.stringify(resArr),
                                        sorts: JSON.stringify(sortArr),
                                        msg:'查询无结果！'
                                    })
                                }
                            })
                            
                        }
                    }
                })
            }
        })
        
    }catch(e){
        console.log(e)
    }
}

getSortsList = function(req,res,next){
    try{
        proListContent.getSorts('all',function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                for(var i in vals){
                    resArr[vals[i].id] = vals[i].name
                }
                var resObj = {}
                res.send({vals:JSON.stringify(resArr)})
                // res.render('layout',{vals:JSON.stringify(resArr)})
            }
        })

    }catch(e){
        console.log(e)
    }
}


toAtlas = function(req,res){
    try{
        proListContent.getAllImgs(function(err,vals){
            if(err){
                console.log(err)
            }else{
                var imgs = {}
                var cnt = 0 ;
                if(vals.length > 0){
                    // console.log('vvaallss:',vals)
                    for(var first in vals){
                        for( var sec in vals[first]){
                            if(sec == 'imgs'){
                                for(var index in JSON.parse(vals[first][sec])){
                                    imgs[cnt] = {img:JSON.parse(vals[first][sec])[index],name:vals[first]['pname'],desc:vals[first]['desc_txt']}
                                    // imgs[cnt] = JSON.parse(vals[first][sec])[index]
                                    cnt ++
                                        
                                }
                            }

                        }
                    }
                    console.log(JSON.stringify(imgs))
                    res.render('atlas',{imgs:JSON.stringify(imgs)})
                }
            }
        })
        
    }catch(e){
        console.log(e)
    }
    
}

router.get('/',rePage);
router.get('/page',toPage);
router.get('/aboutUs',toAbout);
router.get('/products/:sid',toProducts);
router.get('/proDesc/:id',toProDesc);
router.get('/contact',toContact);
router.get('/getSorts',getSorts);
router.get('/proSearch',searchPro);
router.get('/getSortsList',getSortsList);
router.get('/atlas',toAtlas);
router.get('/getProDesc',getProDesc);

module.exports = router

