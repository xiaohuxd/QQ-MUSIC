
//渲染页面

(function($,root){



    function renderImg(src,bgImg){
        
        var img = new Image();
        var bg = new Image();
        img.src = src;
        bg.src=bgImg;
        img.onload = function(){
            $('.img-box img').attr('src',src);
            $('body').css({
                'backgroundImage':'url('+bgImg+')',
            });
        //    root.blurImg(bg,$('body'));
        }
    }

    function renderInfo(data){
        var str = '<div class="song-name">'+data.song +'</div>\
        <div class="singer-name">'+data.singer +'</div>\
         <div class="album-name">'+ data.album+'</div> ';
         $('.song-info').html(str);
    }

    function renderIslike(data){
        if(data){
            $('.btn_like').addClass('liking');
        }else{
            $('.btn_like').removeClass('liking');
        }
    }

    //root.render = render;
    root.render=function(data){
        renderImg(data.image,data.BG);
        renderInfo(data);
        renderIslike(data.isLike);
    };



})(window.Zepto,window.player || (window.player = {}));

// window.player={
//     render:function(){},
//     ...
// }