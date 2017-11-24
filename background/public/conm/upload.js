$(function(){
    $('.subBtn').on('click',function(e){
        // alert('eeeenter')
        // console.log('name:',$("input[name='pname']").val()=='' )
        // console.log('allimg:',$("input[name='allImg']").val().toString() == '{}')
        // console.log('price:',$("input[name='price']").val())
        // console.log('desc:',$("textarea[name='desc']"))
        var goNext = true
        if('' == $("input[name='pname']").val()){
            goNext = false
            // alert('商品名称不能为空！')
            window.wxc.xcConfirm('商品名称不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }else if('' == $("input[name='price']").val()){
            goNext = false
            // alert('商品价格不能为空！')
            window.wxc.xcConfirm('商品价格不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }else if('' == $("input[name='allImg']").val() || '{}' == $("input[name='allImg']").val().toString()){
            goNext = false
            // alert('商品图片不能为空！')
            window.wxc.xcConfirm('商品图片不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }else if('' == $("textarea[name='desc']").val()){
            goNext = false
            // alert('商品描述不能为空！')
            window.wxc.xcConfirm('商品描述不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }
        // console.log("goNext:",goNext)
        // e.preventDefault();
        return goNext
    })
    //建图片列表
    var imgsObj = $('#allImg').val() ? JSON.parse($('#allImg').val()) : ''
    if(imgsObj != ''){
        creatImgs(imgsObj)
    }
    function creatImgs(imgs){
        var parent = document.getElementById('imgsBox') 
        for(var i in imgs){
            if(i){
                //建新的节点//对别处有影响
                var divBlock = document.createElement("div")
                divBlock.className =  'upload-container upImgs'   
                parent.prepend(divBlock);  

                var aBlock = document.createElement("a")
                aBlock.setAttribute('href', imgs[i])
                aBlock.setAttribute('target', '_blank')
                divBlock.appendChild(aBlock); 

                var imgBlock = document.createElement("img")
                imgBlock.setAttribute('class', 'upImg')
                imgBlock.setAttribute('src',imgs[i])
                aBlock.appendChild(imgBlock); 

                //删除按钮
                var addonSpan = document.createElement("span")
                addonSpan.className = 'input-group-addon searchAddon imgDelBtn'  
                // parent.prepend(addonSpan);
                parent.insertBefore(addonSpan, divBlock.nextSibling); 

                var btnClose = document.createElement("button")
                btnClose.className = 'searchClose closeBtn'   
                addonSpan.prepend(btnClose);

                var iconSpan = document.createElement("span")
                iconSpan.className = 'glyphicon glyphicon-remove iconSpan'   
                btnClose.prepend(iconSpan);

            }
        }
    }
    $('.cancelBtn').on('click',function(e){
        if ( e && e.preventDefault ){
            e.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        window.location.href='/manage/proList'
    })
    //在外层绑定
    $("#imgsBox").on("click","button",function(event) {
        if ( event && event.preventDefault ){
            event.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        //总长-index-1
        var allLen = ($(this).parent().parent().children().length-1)/2;
        var curIndex = ($(this).parent().index()+1)/2;
        // var param = $(this).parent().index()/2;
        // var param = allLen-($(this).parent().index()/2)-1;
        var param = allLen-(($(this).parent().index()+1)/2);
        // $(this).parent().next().remove()
        $(this).parent().prev().remove()
        $(this).parent().remove()
        $.ajax({
            type : 'get',
            url : '/manage/delImg/'+param,
            processData:false,
            async:false,
            cache: false,  
            contentType: false, 
            success:function(re){
                console.log('after:',JSON.parse(re.vals))
                $('#allImg').attr('value',JSON.stringify(JSON.parse(re.vals)[0]))
            },
            error:function(re){
                alert(JSON.stringify(re))
                console.log(re);
            }

        });    
        return false;
    });
    //删除图片最原先
    /*$('.imgDelBtn').on('click',function(e){
        if ( e && e.preventDefault ){
            e.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        //param错
        var param = $(this).index()/2;
        console.log('default:',$(this).index())
        $(this).next().remove()
        $(this).remove()
        $.ajax({
            type : 'get',
            url : '/manage/delImg/'+param,
            processData:false,
            async:false,
            cache: false,  
            contentType: false, 
            success:function(re){
                $('#allImg').attr('value',JSON.stringify(JSON.parse(re.vals)[0]))
            },
            error:function(re){
                alert(JSON.stringify(re))
                console.log(re);
            }

        });    
        return false;
    })*/
    //上传图片
    $('#j_imgfile').on('change',function(){
        //判断上传控件的选定是否为空，空则返回
        if (document.getElementById("j_imgfile").files.length == 0) return;

        // 判断上传文件类型  
        var imgs = $('#j_imgfile')[0].files
        var imgObj = {}
        for(var i=0;i<imgs.length;i++){
            imgObj[i] = imgs[i].name
        }
        for(var j in imgObj){
            var objType = imgObj[j].substring(imgObj[j].lastIndexOf(".")).toLowerCase();
            if(!(objType == '.jpg'||objType == '.png')){
                alert("请上传jpg、png类型图片");
                return false;
            }
        }
        // var objFile = $('#j_imgfile').val();
        // var objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
        var formData = new FormData(document.forms.namedItem("picForm"));
        $.ajax({
            type : 'post',
            url : '/manage/uploading',
            data: formData ,
            processData:false,
            async:false,
            cache: false,  
            contentType: false, 
            success:function(re){
                creatImgs(re.imgs);
                $('#allImg').attr('value',re.allImgs)
            },
            error:function(re){
                alert(JSON.stringify(re))
                console.log(re);
            }

        });    
        
    })
    
    $('.upTex').on('click',function(){
        $('#j_imgfile').click()
    })
})
