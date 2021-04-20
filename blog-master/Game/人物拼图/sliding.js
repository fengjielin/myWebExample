// alert('hello world');

// 获取画布的上下文环境
var context = document.getElementById('puzzle').getContext('2d');
// console.log(context);

// 声明变量及获取数据
var img = new Image();
var a = document.getElementById('source').src;
img.src = a;
// 监听事件，图片加载完成后执行drawTiles
img.addEventListener('load', drawTiles, false);
// 获取画布的宽度
var boardSize = document.getElementById('puzzle').width;
// 获取滑块的值
var tileCount = document.getElementById('scale').value;
// 计算拼块的宽度大小
var tileSize = boardSize / tileCount;

console.log("拼块的宽度大小:" + tileSize);

var emptyLoc = new Object();//保存空白拼图的位置坐标
emptyLoc.x = 0;
emptyLoc.y = 0;
var clickLoc = new Object();//记录用户单击的位置
clickLoc.x = 0;
clickLoc.y = 0;
var solved = false;//判断拼图是否完成，为布尔变量

var boradParts = new Object();
initBoard();

function initBoard() {
    // 初始化拼块
    boradParts = new Array(tileCount * tileCount);//数组大小，也就是图片分割的多少
    for (var i = 0; i < tileCount * tileCount; i++) {
        boradParts[i] = i;//为每一个滑块标号；
        // console.log(boradParts);//测试
    }
    shift();//随机排列拼块；
}

//##### 对于sortNumber();和shift();不明白为什么这样写；
function sortNumber(a, b) {
    //随机排列函数
    return Math.random() > 0.5 ? -1 : 1;
}

function shift() {
    // 随机排列拼块
    boradParts.sort(sortNumber);
    emptyLoc.x = 0;
    emptyLoc.y = 0;
    solved = false;
}


function drawTiles() {
    // 显示拼块
    //clearRect() 方法清空给定矩形内的指定像素。
    context.clearRect(0, 0, boardSize, boardSize);
    for(var i = 0; i < tileCount; i++){
        for(var j = 0; j < tileCount; j++){
            var n = boradParts[i * tileCount + j];
            // 计算编号为n的滑块的拼块在原图的位置坐标；
            var x = parseInt(n / tileCount);//取整数部分；
            var y = n % tileCount;
            // console.log(x + ":" + Math.floor(n / tileCount) + ":" + y);
            if(i != emptyLoc.x || j != emptyLoc.y || solved == true){
                //判断是否是空白位置，不是则游戏未结束；
                //将编号为n的拼块显示在（i * tileSize , j * tileSize）；
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize, i * tileSize , j * tileSize, tileSize, tileSize);
                
            }
        }
    }

}

// 用户操作##事件定义

document.getElementById('scale').onchange = function(){//滑块触发改变游戏难度
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    initBoard();
    drawTiles();
};
document.getElementById('puzzle').onmousemove = function(e){//计算鼠标所在的坐标
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = singleClick;

function singleClick(e){
    if(distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1){
        slideTile(emptyLoc,clickLoc);//交换被单击的拼块与空白位置；
        drawTiles();
    }
    if(solved){
        setTimeout(function(){
            alert("你成功了！");
        },500);
        document.getElementById('puzzle').onclick = false;
    }
}

function distance(x1, y1, x2, y2){//计算鼠标的坐标与空白位置的距离
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
   
}

// ########## ？_？

function slideTile(emptyLoc,clickLoc) {
    // 移动拼块 
    if(!solved){
        var t ;
        t = boradParts[emptyLoc.x * tileCount + emptyLoc.y];
        boradParts[emptyLoc.x * tileCount + emptyLoc.y] = boradParts[clickLoc.x * tileCount + clickLoc.y];
        boradParts[clickLoc.x * tileCount + clickLoc.y] = t;
        emptyLoc.x = clickLoc.x;//重新记录空白块的位置
        emptyLoc.y = clickLoc.y;
        checkSolved();//检查是否成功
    }
}

function checkSolved(){
    var flag = true;
    for (var i = 0; i < tileCount * tileCount; i++){
        if(boradParts[i] != i){//判断排列顺序；
            flag = false;
        }
    }
    solved = flag;
}

// 功能：输入图片地址，改变拼图图片
//预设图片选择
document.getElementById('inputBut').onclick = function(){
    var imgSrc = document.getElementById('imgSrc').value;
    img.src = imgSrc;   
    document.getElementById('source').src = imgSrc;
    if(imgSrc == 0){
        alert("请输入图片地址！！");
    }
    //重复
    initBoard();
    document.getElementById('puzzle').onclick = singleClick;
}

var ul = document.getElementById('ul');


ul.addEventListener('click',change);



function change(e){
    var t = e.target
    console.log(t);
    img.src = t.src;
    document.getElementById('source').src = t.src;
    //重复
    initBoard();
    document.getElementById('puzzle').onclick = singleClick;
}

// 计分系统###步数#时间