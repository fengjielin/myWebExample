var start = document.getElementsByClassName('start')[0];
var content = document.getElementsByClassName('content')[0];
var alterBox = document.getElementsByClassName('alter')[0];
var alterImg = document.getElementsByClassName('alterImg')[0];
var alterBtn = document.getElementsByClassName('alterBtn')[0];
var scoreMsg = document.getElementsByClassName('scoreMsg')[0];
var score = document.getElementsByClassName('score')[0];
var mineNum, mineOver;
var block;
var mineMap = [];
var startGameBool = true;

bindEvent();

function bindEvent() {
    start.onclick = function () {
        if (startGameBool) {
            console.log('mixFjl');
            content.innerHTML = '';
            scoreMsg.style.display = 'block';
            content.style.display = 'block';
            init();
            startGameBool = false;
        }
    }
    content.oncontextmenu = function () {
        return false;
    }
    content.onmousedown = function (e) {
        //判断鼠标按键
        console.log(e.button);
        var event = e.target;
        //事件源对象
        console.log(event);

        if (e.button == 0) {
            console.log('左');
            leftClick(event);
        } else if (e.button == 2) {
            console.log('右');
            rightClick(event);
        }
    }
    alterBtn.onclick = function () {
        alterImg.style.display = 'none';
        scoreMsg.style.display = 'none';
        content.style.display = 'none';
        startGameBool = true;
    }
}
// 点击左键后触发
function leftClick(dom) {
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    // 点到雷
    if (dom && dom.classList.contains('isLei')) {
        console.log("game over");
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            console.log("game over");
            alterImg.style.display = 'block';
            // alterImg.innerHTML = 'GAME OVER!!!'
        }, 800);
    } else {
        // 没有点到雷
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        console.log("posX:" + posX + ";posY:" + posY);
        for (var i = posX - 1; i <= posX + 1; i++) {
            // console.log(i)
            for (var j = posY - 1; j < posY + 1; j++) {
                console.log(i + ","+ j)
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        // 扩散
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j < posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}
function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    }
    // 插旗
    dom.classList.toggle('flag');
    if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
        mineOver--;

    }
    if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
        mineOver++;
    }
    // 成功
    score.innerHTML = mineOver;
    if (mineOver == 0) {
        alterImg.style.display = 'block';
        alterImg.innerHTML = 'Hpply!!!'
    }
}




function init() {
    // 地图，生成10*10,100个格子的地图，div
    this.mineNum = 10;
    this.mineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            content.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }
    block = document.getElementsByClassName('block');

    console.log(mineIndex);
    // 生成雷
    while (mineNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        // 判断雷的位置
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            block[mineIndex].innerHTML = '雷';
            mineNum--;
        }
    }
}