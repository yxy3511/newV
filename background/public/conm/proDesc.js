$(function(){
    // console.log('length:',$('.carousel-indicators').children().length)
    for(var i = 0; i<$('.carousel-indicators').children().length || i==$('.carousel-indicators').children().length;i++ ){
        var classTxt = 'slide_'+i;
        $(classTxt).click(function(){
            $("#carousel-example-generic").carousel(i);
        });
    }
    // 循环轮播到上一个项目
    $(".glyphicon-chevron-left").click(function(){
        $("#carousel-example-generic").carousel('prev');
    });
    // 循环轮播到下一个项目
    $(".glyphicon-chevron-right").click(function(){
        $("#carousel-example-generic").carousel('next');
    });

    $('#carousel-example-generic').carousel({
        interval: 5000
    });
    // 循环轮播到某个特定的帧 
    $(".slide-one").click(function(){
        $("#carousel-example-generic").carousel(0);
    });
    $(".slide-two").click(function(){
        $("#carousel-example-generic").carousel(1);
    });
    // $(".slide-three").click(function(){
    //     $("#carousel-example-generic").carousel(2);
    // });
    //暂停轮播
    /*$('#carousel').hover(function(){
        $("#carousel-example-generic").carousel('pause');
    })*/

    $('.allImgsList').on('click',function(e){
        // e.stopPropagation();
        // console.log( $.data($('.aImg')[0]))
        if(window.location.pathname.indexOf('/atlas') != -1){
            // console.log('enter')
            var imgSrc = e.target.src
            // console.log(imgSrc)
            var originStr = window.location.origin
            var res = imgSrc?imgSrc.substring(originStr.length,imgSrc.length+1):null
            if(!!res){
                window.location = '/getProDesc?key='+res
            }
        }else{
            //做到这
        }
        
    })


})