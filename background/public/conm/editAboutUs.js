 $(function(){
    $('.subBtn').on('click',function(e){
        var goNext = true
        if('' == $("input[name='bname']").val()){
            goNext = false
            // alert('介绍页大标题不能为空！')
            window.wxc.xcConfirm('介绍页大标题不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }else if('' == $("input[name='desc_txt']").val()){
            goNext = false
            // alert('介绍页大描述不能为空！')
            window.wxc.xcConfirm('介绍页大描述不能为空！', window.wxc.xcConfirm.typeEnum.info);
        }/*else{
            for(var i=0; i < $('.info').length; i++){
                console.log(111,$('.info')[i].value == '')
                if($('.info')[i].value == ''){
                    goNext = false
                    console.log(222, window.wxc.xcConfirm)
                    console.log(333,window.wxc.xcConfirm.typeEnum.info)
                    try{

                        window.wxc.xcConfirm('介绍详情不能为空！', window.wxc.xcConfirm.typeEnum.info);
                    }catch(e){
                        console.log(e)
                    }
                    // alert('介绍内容不能为空！')
                }
            }
        }*/
        $('#allImg').attr('value',JSON.stringify(imgsAll))
        return goNext
    })
    //所有图片
    var imgsAll = {}
    //拿到所有的图片给imgsAll赋值
    for(var i = 0 ;i<$('.upImg').length; i++){
        imgsAll[i +2] = $('.upImg')[i].getAttribute('src')
    }
    //删除图片
    $(".imgDelBtn").on("click","button",function(event) {
        if ( event && event.preventDefault ){
            event.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        var curIndex = $(this).parent().parent().parent().parent().index()
        var parent = $(this).parent().parent().parent().parent()[0]
        //隐藏图片框和删除按钮
        var curImgBox = parent.getElementsByClassName('ciBox')[0]
        curImgBox.setAttribute('style','visibility:hidden;');

         //出现上传框
        var curAdd = parent.getElementsByClassName('imgBox')[0]
        curAdd.setAttribute('style','display:inlineBlock;');
        delete imgsAll[curIndex]
    });
    //给所有图片赋值
    function setImg(parent,imgs){
        var siblings = $(parent).parent().children('.infoBlock')
        for(var i in imgs){
            if(!!imgsAll[i]){
                //出现图片框和删除按钮
                var curImgBox = siblings[+i - 2].getElementsByClassName('ciBox')[0]
                curImgBox.setAttribute('style','visibility:visible;');
                //赋值
                var curImg = siblings[+i - 2].getElementsByTagName('img')[0]
                curImg.setAttribute('src',imgsAll[i])

                var curHref= siblings[+i - 2].getElementsByTagName('a')[0]
                curHref.setAttribute('href',imgsAll[i])
                //隐藏上传框
                var curAdd = siblings[+i - 2].getElementsByClassName('imgBox')[0]
                curAdd.setAttribute('style','display:none;');
            }
            
        }
    }
    //创建节点在jade页面写
    
    //获得当前img index
    $("#getImgIndex").on('click','.upTex',function(e){
        var curImgIndex = $(this).parent().parent().parent().parent().index()
        console.log('iiiindex:',curImgIndex)
        window.imgIndex = curImgIndex
        var parent = $('#getImgIndex').children()[curImgIndex]
        //判断当下的imgFile否change
        //1.获得当前file input对象
        var curFileInput = parent.getElementsByClassName('imgFile')
        $(curFileInput).click()
        
        $(curFileInput).on('change',function(){
            // 判断上传文件类型  
            var imgs = curFileInput[0].files
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
            //上传文件/upAboutUs
            var formData = new FormData(document.forms.namedItem("aboutUsForm"));
            var filePath = null
            $.ajax({
                type : 'post',
                url : '/manage/upAboutUs',
                data: formData ,
                processData:false,
                async:false,
                cache: false,  
                contentType: false, 
                success:function(re){
                    //获取文件路经
                    filePath = JSON.parse(re.imgs)[window.imgIndex-2]
                    imgsAll[window.imgIndex] = filePath
                    console.log('imgsAll:',imgsAll)
                    setImg(parent,imgsAll)
                    // creatImgs(re.imgs);
                    // $('#allImg').attr('value',re.allImgs)
                },
                error:function(re){
                    alert(JSON.stringify(re))
                    console.log(re);
                }

            }); 
            
            // setImg(parent,imgsAll)
            /*//以下操作
            // $('#getImgIndex').children(curImgIndex).children('img').attr('src','/images/addBg.png')
            //出现图片框和删除按钮
            var curImgBox = parent.getElementsByClassName('ciBox')[0]
            curImgBox.setAttribute('style','visibility:visible;');
            //赋值
            var curImg = parent.getElementsByTagName('img')[0]
            curImg.setAttribute('src',imgsAll[curImgIndex])
            //隐藏上传框
            var curAdd = parent.getElementsByClassName('imgBox')[0]
            curAdd.setAttribute('style','display:none;');*/
        })
        

        
    })

    $('.againRow ').on('click',function(){
        var topNode = $('#getImgIndex')
        var infoBlock = $($('.infoBlock')[0]).clone(true)
        //清空数据
        infoBlock.find('.imgBox').attr('style','display:inline-block;')
        infoBlock.find('.ciBox').attr('style','visibility:hidden;')
        infoBlock.find('.subTile').val('')
        // infoBlock.find('.subTile').attr('value','')
        infoBlock.find('.info').val('')
        // infoBlock.find('.info')[0].innerHTML = ''
        console.log('infoBlock:',infoBlock)
        infoBlock.appendTo(topNode);

    })

    $('.cancelBtn').on('click',function(e){
        if ( e && e.preventDefault ){
            e.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        window.location.href='/manage/proList'
    })
    
})
