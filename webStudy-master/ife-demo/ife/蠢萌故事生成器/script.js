var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var storyText = '外面是94 华氏度，所以:insertx:去散步了。当他们得到:inserty:，他们惊恐地凝视片刻，然后:insertz:. 鲍勃看到了整个事情，但并不感到惊讶 -  :insertx:重300磅，这是一个炎热的一天。';
var insertX = ['地精威利', '大爸爸', '圣诞老人'];
var insertY = ['汤厨房', '迪斯尼乐园', '白宫'];
var insertZ = ['自发燃烧', '融化成人行道上的水坑', '变成了一个slu and，爬了起来'];
randomize.addEventListener('click', result);
function result() {
    var newStory = storyText;
    var xItem = randomValueFromArray(insertX);
    var yItem = randomValueFromArray(insertY);
    var zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:',xItem);
    newStory = newStory.replace(':insertx:',xItem);
    newStory = newStory.replace(':inserty:',yItem);
    newStory = newStory.replace(':insertz:',zItem);

    if (customName.value != '') {
        var name = customName.value;
        newStory = newStory.replace('鲍勃', name);
    }
    if (document.getElementById("uk").checked) {
        var weight = Math.round(300*0.0714286) + '石';
        var temperature = Math.round(94 -32 * 5 / 9) + '摄氏度';
        newStory = newStory.replace('94 华氏度',temperature);
        newStory = newStory.replace('300 磅',weight);
    }

    story.textContent = newStory ;
    story.style.visibility = 'visible';
}