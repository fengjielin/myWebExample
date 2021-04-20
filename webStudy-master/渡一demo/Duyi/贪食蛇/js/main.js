
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var lose = document.getElementById('loser');
var close = document.getElementById('close');
var startB = document.getElementById('startB');
var turn = document.getElementById('return');
var snakeTimer;
var speed = 200;
init();
function init() {
    // 地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    console.log(this.mapW);
    this.mapDiv = content;
    // 食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //小蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[4, 2, 'head'], [3, 2, 'body'], [2, 2, 'body']];
    // startGame();

    //游戏属性
    this.direct = 'right';
    // 方向改变key
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //初始化分数
    this.score = 0;

}
bindElement();
function startGame() {
    startPage.style.display = 'none';

    food();
    snake();
    snakeTimer = setInterval(function () {
        move();
    }, speed);

}
// 生成食物。
// 以地图mapDiv左上角为坐标轴(0,0),地图宽高 / 食物自身宽高 = 每单位长度
// 食物距离左边上边的距离 = 自身的随机数 * 食物自身宽高；
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

// 生成小蛇
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        //根据方向判断蛇头方向
        switch (this.direct) {
            case 'left': snake.style.transform = 'rotate(270deg)';
                break;
            case 'up': snake.style.transform = 'rotate(180deg)';
                break;
            case 'right':
                break;
            case 'down': snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
// 运动
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    //方向
    switch (this.direct) {
        case 'left': this.snakeBody[0][0] -= 1;
            break;
        case 'up': this.snakeBody[0][1] -= 1;
            break;
        case 'right': this.snakeBody[0][0] += 1;
            break;
        case 'down': this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    //判断是否吃的食物,当蛇头坐标与食物坐标相等时;
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //吃到食物后，小蛇加一
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    // 判断是否撞到墙或自身
    // 撞墙
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        relodGame();
    }
    // 撞自身
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            relodGame();
        }
    }
}
// 游戏结束
function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeTimer);
    // 重置属性
    this.snakeBody = [[4, 2, 'head'], [3, 2, 'body'], [2, 2, 'body']];
    //游戏属性
    this.direct = 'right';
    // 方向改变key
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //初始化分数
    this.score = 0;
    lose.style.display = 'block';
}


// 删除className元素
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

// 判断方向是否可以改变
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}
//绑定事件
function bindElement() {
    //键盘事件
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDerict(code);
    }
    // 点击退出
    close.onclick = function () {
        lose.style.display = 'none';
    }
    // 点击开始
    startPage.onclick = function () {
        startGame();
    }
    // 重新开始
    turn.onclick = function () {
        startGame();
        lose.style.display = 'none';
    }
}