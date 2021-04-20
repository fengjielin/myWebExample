init();
function init() {
    start();
    bindEvent();
}
var activeClass = 'tm-current',
    nextBtn = $('.navRight'),
    ulCon = $('.photos'),
    boxCon = $('#photoView'),
    len = $('li').length;
    preBtn = $('.navLeft');
function start() {
    $('li').on('click', function () {
        var $this = $(this);
        $this.toggleClass(activeClass).siblings().removeClass(activeClass);
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass(activeClass),
            img = new Image();
        img.src = src;
        if (flag) {
            img.onload = function () {
                var imageW = img.width;
                var imageH = img.height;
                boxCon.css({
                    'height': imageH + 'px',
                    'width': imageW + 'px',
                    'transition': 'all 100ms ease-out'
                })
                boxCon.find('img').css({
                    'transform': 'scale(0.96)'
                })
              
                boxCon.find('img').on('click', function () {
                    $this.removeClass(activeClass);
                    boxCon.css({
                        'width': 0,
                        'height': 0,
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
function bindEvent() {
    var clickTar = {};
    $('.navicon').on('click', function () {
        var $this = $(this);
        clickTar.class = $($this.parent()).attr('class');
        clickTar.index = ulCon.find('li').index($('li.' + activeClass));
        var index = clickTar.index;
        clickTar.class == 'navLeft' ? index-- : index++;
        if (index >= 0 && index <= len) {
            var src = ulCon.find('li').eq(index).find('img').attr('src');
            ulCon.find('li').eq(index).toggleClass(activeClass).siblings().removeClass(activeClass);
            boxCon.find('img').attr("src", src);
            var img = new Image();
            img.src = src;
            boxCon.css({
                'height': img.height + 'px',
                'width': img.width + 'px',
                'transition': 'all 5ms ease-out'
            })
            boxCon.find('img').css({
                'transform': 'scale(0.96)'
            })
        }
    })
}