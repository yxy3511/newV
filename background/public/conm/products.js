$(function(){
   
    $('#searchInput').hide();
    //搜索框出现
    $('#searchIcon').on('click',function(){
        $('#searchIcon').hide();
        $('#searchInput').css('visibility','visible'); 
        $('#searchInput').show('slow','linear');
    });
    //搜索框隐藏
    $('#closeIcon').on('click',function(){
        
        $('#searchInput').hide('3000','linear',function(){
            $('#searchIcon').show(); 
            $('#searchInput').css('visibility','hidden');
        });
    })
    //回车搜索
    $('#searchIn').on('keypress',function(event){
        if(event.keyCode == 13){
            var keyVal = $('#searchIn').val();
            window.location = '/proSearch?key='+keyVal
        }   
    })

})

