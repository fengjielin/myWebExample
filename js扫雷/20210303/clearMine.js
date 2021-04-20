var start = document.getElementById('start');
var end = document.getElementById('end');
var content = document.getElementById('content');
var timer = document.getElementById('timer');
var state = document.getElementById('state');
var close = document.getElementById('close');
var mineN = document.getElementById('mine');
var mineMap = [];
var mineOver;
var mineNum = 20;
var time;
var startGameBool = true;
mineOver = mineNum;
bindEvent()
// 事件绑定
function bindEvent() {
    content.oncontextmenu = function () {
        //取消右键菜单
        return false;
    }
    start.onclick = function () {
        if (startGameBool) {
            var t = 0;
            time = setInterval(function () {
                timer.innerHTML = ++t;
            }, 1000);
            content.innerHTML = '';
            init();
            startGameBool = false;
            start.style.display = 'none';
        }
    }

    close.onclick = function () {
        end.style.display = 'none';
        start.style.display = 'block';
        timer.innerHTML = 0;
    }

    content.onmousedown = function (e) {
        if (!startGameBool) {
            //鼠标按下
            // console.log(e.button);//0 left; 2 right
            var event = e.target;
            //事件源对象
            if (e.button == 0) {
                // console.log('left');
                leftClick(event);
            } else if (e.button == 2) {
                // console.log('right');
                rightClick(event);
            }
            victory();
        }

    }
}

// 初始化，生成地图并在地图上生成地雷
function init() {
    // 生成地图 10*10 div 
    mineMap = [];
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('id', i + '-' + j);
            content.appendChild(cell);
            mineMap.push({ mine: 0 });
        }
    }
    // 生成地雷
    var mine = document.getElementsByClassName('cell');
    var mineRanNum = [];
    mineN.innerHTML = mineOver;
    mineNum = mineOver;
    for (var i = 0; true; i++) {
        //随机一个数，作为mineMap里面的下标，把下标的这个数设为地雷
        if (mineRanNum.length == mineNum) {
            break;
        }
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineRanNum.indexOf(mineIndex) == -1) {//去掉重复的
            mineRanNum.push(mineIndex);
        }
    }

    console.log(mineRanNum.sort())
    for (var i = 0; i < mineRanNum.length; i++) {
        if (mineMap[mineRanNum[i]].mine == 0) {
            // console.log(mineRanNum[i])
            mineMap[mineRanNum[i]].mine = 1;
            mine[mineRanNum[i]].classList.add('mine');
        }
    }

}
// 1.左键点击，扩散地图
function leftClick(event) {
    if (event.classList.contains('flag')) {
        return;
    }
    var mine = document.getElementsByClassName('mine');
    if (event.classList.contains('mine')) {
        //1.点击到地雷
        console.log('game over');
        for (var i = 0; i < mine.length; i++) {
            mine[i].classList.add('show');
        }
        clearInterval(time);
        setTimeout(function () {
            startGameBool = true;
            end.style.display = 'block';
            state.innerHTML = "Game Over";
        }, 350);
    } else {
        //2.没有点到地雷
        var n = 0;// 地雷数
        var posArr = event.getAttribute('id').split('-');
        var posX = Number(posArr[0]);
        var posY = Number(posArr[1]);

        // 以点击的点为中心遍历它一圈的八个格子，看下有没有地雷
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                // console.log("i = " +i + " ;j = " +j);
                event.classList.add('checked');
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('mine')) {
                    n++;
                }
            }
        }
        if (n != 0) {
            event.innerHTML = n;
        }
        // 扩散,检查附近的格子，递归调用
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && !nearBox.classList.contains('flag')) {
                        if (!nearBox.classList.contains('checked')) {
                            nearBox.classList.add('checked');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}
// 2.右键点击，插旗排雷
function rightClick(event) {
    if (event.classList.contains('checked')) {
        return;
    }
    //插旗
    if (event.classList.contains('flag')) {
        event.classList.remove('flag');
        event.innerHTML = " ";
    } else {
        event.classList.add('flag');
        event.innerHTML = "▲";
        if (event.classList.contains('mine') && event.classList.contains('flag')) {
            mineNum--;
        }
        if (event.classList.contains('mine') && !event.classList.contains('flag')) {
            mineNum++;
        }
        mineN.innerHTML = mineNum;
    }
}

// 怎么赢？
function victory() {
    // 1.插旗排雷，所有旗子都插在地雷上
    // 2.所有非地雷格子都打开了
    if (mineNum == 0) {
        clearInterval(time);
        setTimeout(function () {
            startGameBool = true;
            end.style.display = 'block';
            state.innerHTML = "You Win";
        }, 350);
    }
}
