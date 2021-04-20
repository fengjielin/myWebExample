


var content = document.getElementById('content');
var loser = document.getElementById('loser');
var close = document.getElementById('close');
var scoreBox = document.getElementById('score');
var start = document.getElementById('start');
var loserScore = document.getElementById('loserScore');
var startAntPauseBtn = document.getElementById('startAntPause');
var snakeTimer;
var speed = 500;
var startGameBool = true;
var pauseGameBool = true;
init();
//初始化
function init() {
    //地图
    this.mapW = parseInt(getStyle(content, 'width'));
    this.mapH = parseInt(getStyle(content, 'height'));
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    // 小蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakes = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    //默认方向
    this.direct = 'right';
    //改变方向-锁
    this.left = false;
    this.up = true;
    this.right = false;
    this.down = true;
    // 初始化分数
    this.score = 0;
    // 判断短时间内的多次按键
    this.runkey = true;



}
// 开始游戏
bindEvent();
function startGame() {
    snake();
    food();
    start.style.display = 'none';
}
// 生成食物
function food() {
    var food = document.createElement('div');
    var key = true;
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    // 打印出food随机生成的坐标点
    console.log('foodX:' + this.foodX + '   foodY:' + this.foodY);
    // 设定食物不能在蛇的身体上的位置生成
    for (var i = 0; i < this.snakes.length - 1; ++i) {
        if (this.foodX == this.snakes[i].offsetLeft && this.foodY == this.snakes[i].offsetTop) {
            food();
            key = false;
            break;
        }
    }
    if (key) {
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 19 + 'px';
    }
    // 打印出food计算生成的距离地图边缘的左边距和上边距    
    console.log('foodLeft:' + food.style.left + '   foodTop:' + food.style.top);
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
// 生成小蛇
function snake() {
    for (var i = 0; i < this.snakes.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakes[i][0] * 20 + 'px';
        snake.style.top = this.snakes[i][1] * 19 + 'px';
        snake.className = this.snakes[i][2];
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}
// 小蛇动起来
function snakeMove() {
    for (var i = this.snakes.length - 1; i > 0; i--) {
        this.snakes[i][0] = this.snakes[i - 1][0];
        this.snakes[i][1] = this.snakes[i - 1][1];
        // 打印小蛇运动时的坐标
        // console.log('snakeX:' + this.snakes[i][0] + '   snakeY:' + this.snakes[i][1]);
    }
    // 运动动作改变
    switch (this.direct) {
        case 'left':
            this.snakes[i][0] -= 1;
            break;
        case 'up':
            this.snakes[i][1] -= 1;
            break;
        case 'right':
            this.snakes[i][0] += 1;
            break;
        case 'down':
            this.snakes[i][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    //判断是否吃的食物,当蛇头坐标与食物坐标相等时;
    if (this.snakes[0][0] == this.foodX && this.snakes[0][1] == this.foodY) {
        var snakeEndX = this.snakes[this.snakes.length - 1][0];
        var snakeEndY = this.snakes[this.snakes.length - 1][1];
        //吃到食物后，小蛇在尾部加一，push
        switch (this.direct) {
            case 'left':
                this.snakes.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakes.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'right':
                this.snakes.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakes.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        // 打印出蛇吃了食物后的长度
        console.log("蛇的长度:" + this.snakes.length);
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    // 判断是否撞到墙或自身
    // 1.撞到墙
    if (this.snakes[0][0] < 0 || this.snakes[0][0] >= this.mapW / 20) {
        console.log('撞左右');
        stopGame();
    }
    if (this.snakes[0][1] < 0 || this.snakes[0][1] >= this.mapH / 20) {
        console.log('撞上下');
        stopGame();
    }
    // 撞自身
    var snakeHX = this.snakes[0][0];
    var snakeHY = this.snakes[0][1];
    for (var i = 1; i < this.snakes.length; i++) {
        if (snakeHX == snakes[i][0] && snakeHY == snakes[i][1]) {
            console.log('撞身体');
            stopGame();
        }
    }
    // 游戏结束
    function stopGame() {
        removeClass('snake');
        removeClass('food');
        clearInterval(snakeTimer);
        loserScore.innerHTML = this.score;
        // 重置属性
        this.snakes = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
        //默认方向
        this.direct = 'right';
        //改变方向-锁
        this.left = false;
        this.up = true;
        this.right = false;
        this.down = true;
        // 初始化分数
        this.score = 0;
        scoreBox.innerHTML = this.score;
        loser.style.display = 'block';

        startGameBool = true;
        pauseGameBool = true;       
    }
}
// 根据键盘事件改变小蛇运动的锁
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.up = true;
                this.right = false;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.up = false;
                this.right = true;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.up = true;
                this.right = false;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.up = false;
                this.right = true;
                this.down = false;
            }
            break;
    }
}
// 绑定事件
function bindEvent() {
    close.onclick = function () {
        loser.style.display = 'none';
    }
    start.onclick = function () {
        startAntPause();
        startAntPauseBtn.style.display = 'block';
    }
    startAntPauseBtn.onclick = function () {
        startAntPause();
    }
}
// 逻辑控制
function startAntPause() {
    // 开始
    if (pauseGameBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startAntPauseBtn.innerHTML = 'Pause';
        // 键盘事件
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
            console.log(e.keyCode);
        }
        snakeTimer = setInterval(function () {
            snakeMove();
        }, speed);
        pauseGameBool = false;
        loser.style.display = 'none';
    } else {
        // 暂停
        startAntPauseBtn.innerHTML = 'Start';
        clearInterval(snakeTimer);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        pauseGameBool = true;
    }
}

// 清除节点
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}


// tools兼容性方法
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}