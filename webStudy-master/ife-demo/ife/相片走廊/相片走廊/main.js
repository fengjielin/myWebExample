var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');
var pic = ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg",]
var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');
var key = true;
/* Looping through images */
for(var i = 0;i < 5;i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', pic[i]);
  thumbBar.appendChild(newImage);
}
thumbBar.onclick = function(e){
    var e = e.target;
    var src = e.getAttribute('src');
    displayedImage.setAttribute('src',src);
} 
/* Wiring up the Darken/Lighten button */

btn.onclick = function(){
  var btnClass = btn.getAttribute('class');
  if(btnClass == "dark"){
    btn.setAttribute('class','light');
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,.5)";
  }else{
    btn.setAttribute('class','dark');
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,.0)";   
  }       
}