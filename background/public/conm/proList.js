$(function(){
   
    var path = window.location.pathname
    var curOperat = null 
    if(path == '/manage/getUser'){
        curOperat = '用户管理'
    }else if(path == '/manage/editSorts'){
        curOperat = '分类管理'
    }else if(path == '/manage/uploadImg'){
        curOperat = '添加商品'
    }else if(path == '/manage/editAboutUs'){
        curOperat = '编辑公司介绍'
    }
    if(null != curOperat){
        var parent = document.getElementById('manageMenu')
        // console.log(document.getElementsByClassName('newChild'))
        if(document.getElementsByClassName('newChild').length != 0){
            parent.removeChild(document.getElementsByClassName('newChild')[0])
        }
        var tLevel = document.createElement('span')
        tLevel.setAttribute('class', 'newChild')
        tLevel.innerHTML = '&nbsp;&gt;' + curOperat
        parent.appendChild(tLevel); 
    }
   
    
    
    /*$('.addDiv > *').on('click',function(e){
        alert(e.target.innerHTML)
        var event = new Event('operation');
        document.dispatchEvent(event);
    })*/
    //退出出现
    $('.muser').on('click',function(){
        $('.logoutDiv').css('visibility','visible'); 
        $('.logoutDiv').show('slow','linear');
    })
    //退出消失
    $('.muser').blur(function(){
        $('.logoutDiv').css('visibility','hidden'); 
        // $('.logoutDiv').hide('3000','linear');//无效
    })
    /*---------------manageAdd---------------------*/
    //列表出现
    $('.manageAdd').on('click',function(){
        $('.addDiv').css('visibility','visible'); 
        // $('.addDiv').css('display','block'); 
        $('.addDiv').show('slow','linear');
    })
    //列表消失
    $('.manageAdd').blur(function(){
        $('.addDiv').css('visibility','hidden'); 
        // $('.addDiv').css('display','none'); 
    })

    //点击退出
    $('.logoutDiv').on('click',function(){
        window.location = '/login'
    })
    //点击进行管理
    $('.addPro').on('click',function(){
        window.location = '/manage/uploadImg'
    })
    $('.mUse').on('click',function(){
        window.location = '/manage/getUser'
    })
    $('.mSort').on('click',function(){
        window.location = '/manage/editSorts'
    })
    $('.editAU').on('click',function(){
        window.location = '/manage/editAboutUs'
    })
    //搜索框出现
    $('.searchIcon').on('click',function(){
        $('.searchGroup').show('slow','linear');
        $('.searchIcon').css('display','none')
    });
    //搜索框隐藏
    $('.searchClose').on('click',function(){
        $('.searchGroup').hide('3000','linear',function(){
            $('.searchIcon').show(); 
        });
    })

    //回车搜索
    $('#inputKey').on('keypress',function(event){
        if(event.keyCode == 13){
            var keyVal = $('#inputKey').val();
            window.location = '/manage/searchPro?key='+keyVal
        }   
    })
    /*---------------类型表---------------------*/
    $('.sortEdit').click(function(e){
        var index = $(this).parent().parent().index();
        $("td > input")[index].removeAttribute('disabled');
        $temp = $("td > input")[index].value;
        $("td > input")[index].value = ''
        $("td > input")[index].focus()
        $("td > input")[index].value = $temp;
    })
    $('.sortName').blur(function(e){
        $('.sortName').attr('disabled','disabled')
    })
    //回车保存
    $('.sortName').on('keypress',function(e){
        if(e.keyCode == 13){
            // console.log($(this).val())
            // console.log(parseInt($(this).parent().prev()[0].innerText))
            var text = $(this).val()
            var sid = parseInt($(this).parent().prev()[0].innerText)
            window.location = '/manage/saveSort/'+sid+'/'+text
        }   
    })

    /*$('.addSortName').blur(function(e){
        $('.addSortName').attr('disabled','disabled')
    })*/
    $('.addSort').click(function(e){
        var text = $('.addSortName').val()
        if(text == ''){           
            window.wxc.xcConfirm('类型名称不能为空！', window.wxc.xcConfirm.typeEnum.info)
            return 
        }
        var sid = $('.newId').innerText
        window.location = '/manage/addSort/'+text
    })
    //回车保存
    $('.addSortName').on('keypress',function(e){
        if(e.keyCode == 13){
            // console.log($(this).val())
            // console.log(parseInt($(this).parent().prev()[0].innerText))
            var text = $(this).val()
            var sid = parseInt($(this).parent().prev()[0].innerText)
            window.location = '/manage/addSort/'+text
        }   
    })
})  