(function($,root){
    var duration = 0;
    var timer =null;
    var startTime = null;
    var lastPer = 0;

function renderAllTime(time){
    duration = time;
    $('.all-time').text(formatTime(time));
}


//将传递过来的总时间(秒数)格式化 ----> 00:00    04:31
function formatTime(time){
    var m =Math.floor(time / 60);
    var s = time - m * 60;
    if(m < 10){
        m = '0' + m;
    }
    if(s < 10){
        s = '0' + s;
    }
    return m + ':' + s;
}

//渲染左边的当前播放时间
function start(_p){
    lastPer = _p === undefined ? lastPer : _p; 
     if(direction == 'next' || direction == 'prev' ||  direction == 'list'){
        lastPer = 0;
        startTime = 0;
    }
   
    //点击开始播放，记录一下开始播放的时间。
    startTime = new Date().getTime();
    function frame(){
    //每次间隔获取一次当前时间，用当前时间减去开始播放时的时间，得到过了多长时间。
        var curTime = new Date().getTime();
    // 播放时间除以歌曲总时间等于歌曲进度
        var per = lastPer + (curTime - startTime) / (duration * 1000);  //进度条的百分比
        // console.log(per);
        update(per);
         timer = requestAnimationFrame(frame); //定时器
    }
    frame();
}
//更新当前播放时间   更新当前进度条
function update(per){
    
    if(root.audioManager.boolAudio() == 'play'){
        //播放中
        var curTime = Math.round(per * duration);
        // console.log(curTime);
        curTime = formatTime(curTime);
        $('.cur-time').text(curTime);
        var perMove = (per - 1) * 100 + '%';
        $('.pro-top').css('transform','translate('+perMove+')');
    }else if(root.audioManager.boolAudio() == 'pause'){
        //播放结束，自动切换下一首歌
         root.control.indexOfNext();
        $('body').trigger('playChange',root.control.nowIndex);
        direction = null;
    }
}



//时间的增加
// 0s --> 3s lastPer =3
// 4s --> 9s lastPer =5s
//每一次都是递加的
function stop(){
    cancelAnimationFrame(timer);   //清理定时器
    var curTime = new Date().getTime();
    var per = (curTime - startTime) / (duration * 1000);  
    lastPer += per;
}
//暴露接口
root.pro = {
    renderAllTime:renderAllTime,
    start:start,
    stop:stop,
    update,update,
}

})(window.Zepto,window.player || (window.player = {}));