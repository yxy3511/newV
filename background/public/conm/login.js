$(function(){
    console.log('ok')
    $(document).ready(function() { 
        if ($.cookie("rmbUser") == 'true') { 
            $("#rmbUser").attr("checked", true); 
            $(".pwd").attr('type','password')
            // $(".us_uer").append("<input name='pwd', class = 'pwd text', style='color: #FFFFFF !important; position:absolute; z-index:100;', value="", type='password', placeholder='请输入密码'/>"); 
            // $("#password").val($.cookie("password")); 
        }
    });

    setRemember = function(){
        if(!$.cookie("rmbUser")){
            $.cookie("rmbUser",true) 
        }else if($.cookie("rmbUser") == 'true'){
            $.cookie("rmbUser",false) 
        }else{
            $.cookie("rmbUser",true) 
        }
        
    }
})