
// var nowIndex = 0;
var len = null;
var dataList;
var timer = null;
var direction = null;
var songTime = 0;
// var deg = 0;
var root = window.player;
var audio = root.audioManager;
var nowIndex = root.control;
var pro = root.pro;

console.log(window.player);


function getData(url_data) {
    $.ajax({
        type: 'GET',
        url: url_data,
        success: function (data) {
            dataList = data;
            len = data.length;
            songTime = data[0].duration;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            renderSongList(data);
            pro.renderAllTime(data[0].duration);
            bindTouchEvent();
            bindEvent();
        },
        error: function () {
            console.log("error");
        }
    });
}

function bindEvent() {

        //切换歌曲时触发的事件 
    $('body').on('playChange',function(e,index){
        root.render(dataList[index]);   //重新渲染背景图片
        audio.getAudio(dataList[index].audio);//重新渲染歌曲
        songTime = dataList[index].duration;  //获取每首歌的时长
       // audio.status == 'pause';
        audio.play();
        direction == 'drag' ? pro.start(0) : pro.start();
        // pro.start();
        $('.img-box').css({
            'transform':'rotateZ('+0+'deg)',
            'transition':'none'
        });
        changeActive(index);
        pro.renderAllTime(dataList[index].duration);  //渲染歌词总时间
        bgRated(0);
    });
    
    $('.btn_like').on('click',function(){
        if(dataList[nowIndex.nowIndex].isLike){
            $('.btn_like').removeClass('liking');
            dataList[nowIndex.nowIndex].isLike = false;
        }else{
            $('.btn_like').addClass('liking');
            dataList[nowIndex.nowIndex].isLike = true;

        }
    });

    $('.btn_prev').on('click', function () {
        direction = 'prev';
        nowIndex.indexOfPrev();
        $('body').trigger('playChange',nowIndex.nowIndex);
        console.log(audio.status);
        direction = null;
    });

    $('.btn_next').on('click', function () {
        direction = 'next';
        nowIndex.indexOfNext();
        $('body').trigger('playChange',nowIndex.nowIndex);
        bgRated(0);
        direction = null;
    });

    $('.btn_play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            pro.start();
            var dataDeg = $('.img-box').attr('data-deg'); 
            bgRated(dataDeg);
        }else if(audio.status == 'play'){
            audio.pause();
            pro.stop();
            clearInterval(timer);
        }
    });


    $('.btn_list').on('click',function(e){

        $('.btn_list_child').css({
            'display':'block'
        });
        $('.btn_list_child').animate({
            top:'-240px',
        },200,'swing');
    });
    $('.list_close').on('click',function(e){
        e.stopPropagation();
        $('.btn_list_child').animate({
            top:'60px',
        },200,'swing',function(){
            $('.btn_list_child').css({
                'display':'none'
            });
        });
    });


    $('.list_song_list li').on('click',function(e){
        direction = 'list';
        var index = $(this).children().eq(1).children().attr('data-index');
        $('body').trigger('playChange',index);
        direction = null;
    });


}


//移动端touch事件
function bindTouchEvent(){

    var left = $('.pro-bottom').offset().left;
    var sliderWidth = $('.pro-bottom').width();
    $('.slider').on('touchstart',function(e){
        //手指触摸屏幕的时候触发
        direction = 'drag';
        audio.pause();
        pro.stop();
    }).on('touchmove',function(e){
        //手指在屏幕上滑动的时候触发
        var x = e.changedTouches[0].clientX - left;
        var per = x / sliderWidth;
        if(per > 0 && per < 1){
            pro.update(per);
        }
        // e.changedTouches[0].clientX
    }).on('touchend',function(e){
        //手指从屏幕上拿起的时候触发
        var x = e.changedTouches[0].clientX - left;
        var per = x / sliderWidth;
        if(per > 0 && per < 1){
           var currTime = per * songTime;
            audio.play();
            audio.getTime(currTime);
            pro.start(per);
        }
    });
}


function bgRated(deg){
    clearInterval(timer);
    var newDeg = +deg;
    timer = setInterval(function(){
        newDeg +=2;
        $('.img-box').attr('data-deg',newDeg);
        $('.img-box').css({
            'transform':'rotateZ('+newDeg+'deg)',
            'transition':'transform 1.5s ease-out'
        });
    },200);
  
}


function renderSongList(data){
   //渲染歌曲列表
    var str ='';
    data.forEach(function(ele,index){
         str += ' <li>\
         <span class="song_list_song">'+ele.song+'</span>\
         <span class="song_list_singer">- '+ele.singer+'\
             <span data-index='+index+'></span>\
         </span>\
         <span></span>\
     </li>';
    });
    $('.list_song_list').append(str);

    //初始化列表第一个歌曲的样式
    $('.song_list_singer').eq(0).css('color','#1AFA29')
                                .children()
                                .eq(0)
                                .addClass('active');
    $('.song_list_song').eq(0)
                        .css('color','#1AFA29');
}


function changeActive(activeIndex){
 
    //列表歌曲切换
    var listLen = $('.song_list_singer').length
    for(var i=0;i<listLen;i++){
     var dataIndex = $('.song_list_singer').eq(i)
                                           .children()
                                           .eq(0)
                                           .attr('data-index');
     if(activeIndex == dataIndex){
         $('.song_list_song').css('color','#fff');
         $('.song_list_song').eq(activeIndex)
                             .css('color','#1AFA29');

        $('.song_list_singer').css('color','#fff')
                              .children()
                              .removeClass('active');
        $('.song_list_singer').eq(activeIndex)
                              .css('color','#1AFA29')
                              .children()
                              .eq(0)
                              .addClass('active');            
     }
    }
    nowIndex.nowIndex = activeIndex;
}


getData('/dist/mock/data.json');