var content = document.getElementById('content');
var start = document.getElementById('start');
var scoreBox = document.getElementById('score');
var end = document.getElementById('end');
var close = document.getElementById('close');
var loserScore = document.getElementById('loserScore');
var loser = document.getElementById('loser');
var startAntPauseBtn = document.getElementById('startAntPause');
var snakeMove;
var speed = 200;
var startGameBool = true;//是否游戏开始
var pauseGameBool = true;//是否游戏暂停
init();
// 一、进行初始化
function init() {

    // 1.动态获取地图尺寸
    this.mapDiv = content;
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    // 2.小蛇
    this.snakeW = 20;
    this.snakeH = 20;//[x,y,'head'],小蛇的默认位置
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    // 3.食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    // 4.游戏属性
    //默认方向
    this.direct = 'right';
    //改变方向-锁，当运动方向为right，那么就不能往left运动
    this.left = false;
    this.up = true;
    this.right = false;
    this.down = true;
    // 初始化分数
    this.score = 0;
}

bindEvent();

// 绑定事件
function bindEvent() {
    start.onclick = function () {
        console.log('start')
        startAntPause();
        start.style.display = 'none';
        startAntPauseBtn.style.display = 'block';
    }
    startAntPauseBtn.onclick = function () {
        startAntPause();
    }
    close.onclick = function () {
        start.style.display = 'block';
        end.style.display = 'none';
    }

    document.oncontextmenu = function(e){
        cancelHandler(e);
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
        }
        snakeMove = setInterval(function () {
            move();
        }, speed);
        pauseGameBool = false;
        end.style.display = 'none';
    } else {
        // 暂停
        startAntPauseBtn.innerHTML = 'Start';
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        pauseGameBool = true;
    }
}

// 二、游戏开始
function startGame() {
    food();
    snake();
}
// 三、生成小蛇
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        //根据snakeBody的长度生成小蛇
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.className = this.snakeBody[i][2];
        // snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}
// 四、动态在地图上生成食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';

    var key = true;
    food.style.position = 'absolute';
    //将地图分为棋盘布局，并使食物生成的坐标随机
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    // 设定食物不能在蛇的身体上的位置生成
    for (var i = 0; i < this.snakeBody.length - 1; ++i) {
        if (this.foodX == this.snakeBody[i].offsetLeft && this.foodY == this.snakeBody[i].offsetTop) {
            food();
            key = false;
            break;
        }
    }
    if (key) {
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
    }

    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
// 五、让小蛇在地图上动起来
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        //后一位的位置等于前一位的位置
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    //运动方向改变，更新蛇头的位置
    switch (this.direct) {
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    //当蛇头坐标与食物坐标相等时，说明吃到食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //小蛇最后一位的坐标
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        //吃到食物后，小蛇在尾部 +1，push
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

        //吃到食物，分数+1，重新生成食物
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    //当蛇头的坐标小于0或者大于等于最大位置， 判断是否撞到墙或自身
    // 1.撞到墙
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        console.log('end 撞左右墙了');
        stopGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        console.log('end 撞上下墙了');
        stopGame();
    }
    // 2.撞自身
    //蛇头的坐标
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            console.log('end 撞自身了');
            stopGame();
        }
    }
}

// 根据键盘事件改变小蛇运动方向的锁
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

// 六、游戏结束
function stopGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    loserScore.innerHTML = this.score;
    // 重置属性
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
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
    end.style.display = 'block';
    startAntPauseBtn.style.display = 'none';

    startGameBool = true;
    pauseGameBool = true;
}


// 清除节点
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue  = false;
    }
}