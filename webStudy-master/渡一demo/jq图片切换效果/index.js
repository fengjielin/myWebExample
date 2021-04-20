//点击缩列图 ------图片出现
//点击方向按钮 -------大图轮播


var boxCon = $('.photoView'),
    len = $('li').length;
function start() {
    $('li').on('click', function () {
        var $this = $(this);
        $this.toggleClass('active').siblings().removeClass('active');
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass('active'),
            img = new Image();
        img.src = src;
        if (flag) {
            img.onload = function () {
                var imageW = img.width;
                var imageH = img.height;
                boxCon.css({
                    'width': imageW + 'px',
                    'height': imageH + 'px',
                    'transition': 'all 100ms ease-out'
                })
                boxCon.css({
                    'transform': 'scale(0.96)'
                })
                boxCon.find('img').on('click', function () {
                    $this.removeClass('active');
                    boxCon.css({
                        'width': 0 + 'px',
                        'height': 0 + 'px',
                        'transition': 'all 100ms ease-out'
                    })
                })
            }
            boxCon.find('img').attr('src', src);
        } else {
            boxCon.css({
                'width': 0 + 'px',
                'height': 0 + 'px',
                'transition': 'all 100ms ease-out'
            })
        }
    })
}
 // 大图上的轮播图
function bindEvent() {
    $('.photoView i').on('click', function () {
        var $this = $(this);
        var className = $($this.parent()).attr('class');
        var index = $('li').index($('li.active'));
        console.log(className);
        className == 'navLeft' ? index-- : index++;
        if (index >= 0 || index < len) {
            var src = $('li').eq(index).find('img').attr('src');
            $('li').eq(index).toggleClass('active').siblings().removeClass('active');
            boxCon.find('img').attr('src', src);
            img = new Image();
            img.src = src;
            var imageW = img.width;
            var imageH = img.height;
            boxCon.css({
                'width': imageW + 'px',
                'height': imageH + 'px',
                'transition': 'all 100ms ease-out'
            })
            boxCon.css({
                'transform': 'scale(0.96)'
            })

        }
    })
}
start();
bindEvent();
