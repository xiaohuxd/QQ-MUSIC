//控制歌曲前进播放的index
(function($,root){
    function Control(){
        this.nowIndex = 0;
    }

    Control.prototype.indexOfPrev = function(){
        if (this.nowIndex == 0) {
            this.nowIndex = len - 1;
        } else {
            this.nowIndex--;
        }
        return this.nowIndex;
    }

    Control.prototype.indexOfNext = function(){

        if (this.nowIndex == len - 1) {
            this.nowIndex = 0;
        } else {
            this.nowIndex++;
        }
        return this.nowIndex;
    }

    root.control = new Control();

})(window.Zepto,window.player || (window.player = {})); 