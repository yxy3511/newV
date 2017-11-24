/**
 * Created by jshy on 2016/12/27.
 */
var query=require("./mysql.js");  
/*query("select 1 from 1",function(err,vals,fields){  
    //do something  
    console.log('The solution is: ', vals);  
}); 
*/

/*exports.operaPro = function(sql,callback){
    query(sql,callback)
}*/

/**
 *
 *首页获取商品
 */
exports.getPros= function(key,callback){
    var searchSql = "select * from products order by up_date desc LIMIT "+key;
    query(searchSql,callback)
}

/**
 *
 *获取商品列表
 */
exports.getProList = function(key,callback){
    // var searchSql = sql ? ' select * from products where '+sql : ' select * from products';
    var searchSql = null
    if(key == 0){
        searchSql = 'select * from products order by up_date desc' ;
    }else{
        searchSql = "select * from products where sort = "+key+" order by up_date desc"
    }
    query(searchSql,callback)
}

/**
*
*查找商品
*/
exports.searchPro = function(key,callback){
    var sql = null;
    if(key && parseInt(key)){
        sql = 'select * from products where price = ' + parseInt(key) + " or state = "+ parseInt(key) + " or pname like '%"+key+"%' or desc_txt like '%"+key+"%' order by up_date desc";
        
    }else{
        sql = "select * from products where pname like '%" + key +"%' or desc_txt like '%"+key+"%' order by up_date desc";
    }
    
    query(sql,callback)
}


/**
*key is id
*删除商品
*/

exports.delPro = function(key,callback){
    var searchSql = 'DELETE FROM products WHERE pid =' + key;
    query(searchSql,callback)
}

/**
*
*增加商品
*/

exports.addPro = function(param,callback){
    var searchSql = ''
    if(param.pname && param.price && param.state && param.desc && param.imgs && param.sort){
        searchSql = "insert into products(pname,price,state,desc_txt,up_date,imgs,sort) values('"+param.pname+"',"+param.price+","+param.state+",'"+param.desc+"',now(),'"+param.imgs+"',"+param.sort+");"
    }else if(param.pname && param.price && param.desc && param.imgs && param.state){
        searchSql = "insert into products(pname,price,desc_txt,up_date,imgs,state) values('"+param.pname+"',"+param.price+",'"+param.desc+"',now(),'"+param.imgs+"',"+param.state+");"
    }else if(param.pname && param.price && param.desc && param.imgs && param.sort){
        searchSql = "insert into products(pname,price,desc_txt,up_date,imgs,sort) values('"+param.pname+"',"+param.price+",'"+param.desc+"',now(),'"+param.imgs+"',"+param.sort+");"
    }else if(param.pname && param.desc && param.imgs && param.sort){
        searchSql = "insert into products(pname,price,desc_txt,up_date,imgs,sort) values('"+param.pname+"',"+0.00+",'"+param.desc+"',now(),'"+param.imgs+"',"+param.sort+");"
    }
    if(searchSql != ''){
        query(searchSql,callback)
    }
    
}

/**
*
*修改商品
*/

exports.editPro = function(id,param,callback){
    // var searchSql = "update products set pname='"+param.pname+"',price="+param.price+",state="+param.state+",desc='"+param.desc+"',update=CURDATE(),imgs="+param.imgs+" where pid="+id+";";
    var searchSql = ''
    if(param.pname && param.price && param.state && param.desc && param.imgs && param.sort){
        searchSql = "update products set pname='"+param.pname+"', price = "+param.price+", state="+param.state+", desc_txt='"+param.desc+"', up_date=now(), imgs='"+param.imgs+"', sort="+param.sort+" where pid="+id;
        // searchSql = "update products set pname='"+param.pname+"',price="+param.price+",state="+param.state+",desc='"+param.desc+"',update=CURDATE(),imgs="+param.imgs+" where pid="+id+";";
    }else if(param.pname && param.price && param.desc && param.imgs && param.state){
        searchSql = "update products set pname='"+param.pname+"', price = "+param.price+", state="+param.state+", desc_txt='"+param.desc+"', up_date=now(), imgs='"+param.imgs+"' where pid="+id;
    }else if(param.pname && param.price && param.desc && param.imgs && param.sort){
        searchSql = "update products set pname='"+param.pname+"', price = "+param.price+", desc_txt='"+param.desc+"', up_date=now(), imgs='"+param.imgs+"', sort=1 where pid="+id;
    }else if(param.pname && param.desc && param.imgs && param.sort){
        searchSql = "update products set pname='"+param.pname+"', price = "+0.00+", desc_txt='"+param.desc+"', up_date=now(), imgs='"+param.imgs+"', sort=1 where pid="+id;
    }
    query(searchSql,callback)
}

/**
*
*获得商品
*/

exports.descPro = function(id,callback){
    var searchSql = "select * from products where pid = " + id;
    query(searchSql,callback)
}

/**
*
*获得商品总类
*/

exports.getSorts = function(key,callback){
    var searchSql = null
    if(key && key == 'all'){
        searchSql = "select * from sorts"
    }else{
        searchSql = "select name from sorts"
    }
   
    query(searchSql,callback)
}

//修改类型
exports.upSorts = function(sid,text,callback){
    var searchSql = "update sorts set name='"+text+"' where id="+sid;
    query(searchSql,callback)
}

//增加类型
exports.addSorts = function(text,callback){
    var searchSql = "insert into sorts(name) values('"+text+"');";
    query(searchSql,callback)
}

//删除类型
exports.delSort = function(sid,callback){
    var searchSql = "delete from sorts where id ="+sid;
    query(searchSql,callback)
}

exports.getRoles = function(callback){
    var searchSql = "select * from roles";
    query(searchSql,callback)
}

//获取所有图片
exports.getAllImgs = function(callback){
    var sql = 'select imgs,pname,desc_txt from products'
    query(sql,callback)
}

exports.getProId = function(key,callback){
    var sql = "select pid from products where imgs like '%"+key+"%'"
    query(sql,callback)
}

//获得aboutUs页面内容
exports.getAboutUs = function(callback){
    var sql = 'select * from aboutUs order by up_date desc'
    query(sql,callback)
}


//增加数据
exports.addAboutUs = function(item,callback){
    var sql = "insert into aboutUs(title,desc_txt,content,up_date) values('"+item.title+"','"+item.desc_txt+"','"+JSON.stringify(item.value)+"',now())"
    console.log('ssssssssssql:',sql)
    query(sql,callback)
}
exports.editAboutUs = function(item,callback){
    var sql = "update aboutUs set title='"+item.title+"', desc_txt = '"+item.desc_txt+"', content='"+JSON.stringify(item.value)+"', up_date=now() where id="+1;
    query(sql,callback)
}

//获得类型下的商品
exports.getSortPro = function(sid,callback){
    var sql = 'select pid from products where sort = '+sid;
    query(sql,callback)
}