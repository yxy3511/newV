$(function(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(119.3782479896,25.9977155183);//39.9252565439,116.4897199676
    map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("福州");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用  
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件  
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

    //创建信息窗口   
    var sContent ="Shengyi Shoes <br>Addr: Room 1403, building 6, Shangchengguoji Garden, Fuxia Road, Fuzhou, China<br>Mobile: +86 18060608001 <br>";
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象   
    marker.addEventListener('click', function(){   
       this.openInfoWindow(infoWindow);  
       //图片加载完毕重绘infowindow   
       document.getElementById('Coolwpimg').onload = function (){   
           infoWindow.redraw();   
       }   
    });   


    // var map = new BMap.Map('allmap');   
    // //116.812711,33.955489   
    // var point = new BMap.Point(116.812711,33.955489);   
    // //map.enableScrollWheelZoom(true);   
    // map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用   
    // map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用   
    // /*map.centerAndZoom(point, 15);*/  
    // map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件   
    // var marker = new BMap.Marker(point);  // 创建标注   
    // /*map.addOverlay(marker); */             // 将标注添加到地图中   
    // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画   
    // //创建信息窗口   
    // var sContent ="瀚拓建筑视图设计有限公司 <br>地址：安徽省淮北市相山南路313号1#1101室<br>电话：0561-3187813 <br><img class='mapimg' id='Coolwpimg' src='http://127.0.0.1/wp-content/themes/Cgwill/ui/img/logo.jpg' alt='瀚拓建筑视图设计有限公司'>";   
    // var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象   
    // map.centerAndZoom(point, 18);   
    // map.addOverlay(marker);   
    // marker.addEventListener('click', function(){   
    //    this.openInfoWindow(infoWindow);  
    //    //图片加载完毕重绘infowindow   
    //    document.getElementById('Coolwpimg').onload = function (){   
    //        infoWindow.redraw();   
    //    }   
    // });   
      
      
    //点击生成经纬度   
    /*map.addEventListener(“click”,function(e){
        alert(e.point.lng + “,” + e.point.lat);  
    });*/  
})
