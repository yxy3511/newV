$(function() {
	//获取分类
	$.ajax({
        type : 'get',
        url : '/getSortsList',
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            // var cnt = 0;
            for(var i in JSON.parse(re.vals)){
                //建新的节点
                var parent = document.getElementById('menus')
                var liContent = document.createElement("li")
                liContent.className = 'txt'
                parent.appendChild(liContent);  

                var aBlock = document.createElement("a")
                aBlock.setAttribute('href', '/products/'+i)
                aBlock.setAttribute('sid', i)
                aBlock.innerHTML = JSON.parse(re.vals)[i]
                liContent.appendChild(aBlock); 

                var liBlock = document.createElement("li")
                liBlock.className =  'divider marginT'   
                // parent.prepend(liBlock);  
                parent.insertBefore(liBlock, liContent.nextSibling)
                /*if(cnt != 0){
                	parent.insertBefore(liBlock, liContent.nextSibling)
                }
                cnt++;*/

            }
        },
        error:function(re){
            alert(JSON.stringify(re))
            console.log(re);
        }

    });   
	// var url = window.location.href;
	// var arr = url.split("//");
	// var path = arr[1].substring(arr[1].indexOf("/"));
	var path = window.location.pathname;
	if (path == '/page' || path == '/atlas') {
		$('#home').addClass('active');
		$('#aboutUs').removeClass('active');
		$('#products').removeClass('active');
		$('#contact').removeClass('active');

	} else if (path == '/aboutUs') {
		$('#aboutUs').addClass('active');
		$('#home').removeClass('active');
		$('#products').removeClass('active');
		$('#contact').removeClass('active');

	} else if (path.indexOf('/products') != -1 || path.indexOf('/proDesc') != -1 || path.indexOf('/proSearch') != -1 || path.indexOf('/descPro') != -1 ) {
		$('#products').addClass('active');
		$('#home').removeClass('active');
		$('#aboutUs').removeClass('active');
		$('#contact').removeClass('active');
		var pArr = window.location.pathname.split('/');
		var sid = parseInt(pArr[pArr.length-1])
		$("[sid="+sid+"]").addClass('active');
		
	} else if (path == '/contact') {
		$('#contact').addClass('active');
		$('#home').removeClass('active');
		$('#aboutUs').removeClass('active');
		$('#products').removeClass('active');
	} 
	// window.location = '/getSorts'

});
 

