(function($,root){

    function AudioManager(){
        this.audio = new Audio();
       // this.src = src;
        this.status = 'pause';
    }
    AudioManager.prototype.play = function(){
        this.audio.play();
        this.status = 'play';
       $('.btn_play').addClass('playing');
    }

    AudioManager.prototype.pause = function(){
        this.audio.pause();
        this.status = 'pause';
       $('.btn_play').removeClass('playing');
    }

    AudioManager.prototype.getAudio = function(src){
       // console.log(src);
        this.audio.src = src;
        this.audio.load();
        
    }
    AudioManager.prototype.boolAudio = function(){
        //判断歌曲是否播放完毕
        if(!this.audio.ended){
            //播放中
           this.status = 'play';
        }else{
            //播放结束
            this.status = 'pause';
        }
        return this.status;
    }  
    AudioManager.prototype.getTime = function(time){
        //拖拽歌曲进度条的时候
        //获取歌曲的播放时间。
        this.audio.currentTime = time;
    }  

    root.audioManager = new AudioManager();
})(window.Zepto,window.player || (window.player = {}));