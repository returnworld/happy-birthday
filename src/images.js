import dance2 from "../static/zero-two-dance2.gif";
import stars from "../static/stars.webp";
import whiteCat from "../static/whitecat.gif";



const divImages = document.createElement("div");
divImages.className = "imgContainer";
divImages.position = "absolute";
divImages.style.left = window.innerWidth/2 - 50  + "px";
divImages.style.top = window.innerHeight - 200 + "px";
document.body.appendChild(divImages);

const divShadow = document.createElement("div");
divShadow.className = "shadow";
divImages.appendChild(divShadow);



const whiteCatImg = new Image();
whiteCatImg.src = whiteCat;
whiteCatImg.className = "Cat";
whiteCatImg.style.position = "absolute";
whiteCatImg.style.left = window.innerWidth-50 + "px";
whiteCatImg.style.top = 20 + "px";
whiteCatImg.style.zIndex = "11";
document.body.appendChild(whiteCatImg, whiteCatImg.width);


//stars
const imgStars = new Image();
imgStars.src = stars;
imgStars.className = "imgStars";
divShadow.appendChild(imgStars);

//dance
const img = new Image();
img.src = dance2;
img.className = "dance2";
img.width = 75;
img.style.left = window.innerWidth/2-img.width/2 + "px";
img.style.top = 150 + "px";
document.body.appendChild(img);
img.style.position = "absolute";

var zeroTWO = document.querySelector(".dance2");

window.addEventListener("resize", () => {
	whiteCatImg.style.left = window.innerWidth-50 + "px";
    whiteCatImg.style.top = 20 + "px";
    divImages.style.left = window.innerWidth/2 - 50  + "px";
    img.style.left = window.innerWidth/2-img.width/2 + "px";
});


zeroTWO.ondragstart = function () {
  return false;
};

function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top+window.scrollY,
      left: box.left+window.scrollX,
    };
}


zeroTWO.onmousedown = function (e) {
  // 1. отследить нажатие
  var coords = getCoords(zeroTWO);
 
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;
  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  zeroTWO.style.position = "absolute";
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.appendChild(zeroTWO);
  moveAt(e);

  //zeroTWO.style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    zeroTWO.style.left = e.pageX - shiftX + "px";
    zeroTWO.style.top = e.pageY - shiftY + "px";
  }

  // 3, перемещать по экрану
  document.onmousemove = function (e) {
    moveAt(e);
  };

  // 4. отследить окончание переноса
  zeroTWO.onmouseup = function () {
    document.onmousemove = null;
    zeroTWO.onmouseup = null;
  };
  
};

whiteCatImg.addEventListener('click',function(){
    zeroTWO.classList.toggle('filter')
});

const darkCat = document.getElementById("darkcat");
darkCat.style.zIndex = "12";
darkCat.onclick = ()=>{
  zeroTWO.classList.toggle('show')
}

const cube = document.querySelector('.imgContainer');
cube.ondragstart = function () {
  return false;
};

cube.style.position = "absolute";
document.body.appendChild(cube);
cube.style.animation = "animate2 2s linear infinite";
cube.style.animationPlayState = "paused";
cube.onmousedown = function (e){

  cube.style.animationPlayState = "running";
  // 1. отследить нажатие
  var coords = getCoords(cube);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;
  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  moveAt(e);

  //zeroTWO.style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    cube.style.left = e.pageX  - cube.offsetWidth / 2 + "px";
    cube.style.top = e.pageY - cube.offsetHeight / 2 + "px";
  }

  // 3, перемещать по экрану
  document.onmousemove = function (e) {
    moveAt(e);
    
  };

  this.onmouseup = function () {
    
    document.onmousemove = null;
    this.onmouseup = null;
    cube.style.animationPlayState = "paused";
  };
  this.onmouseleave = function () {
    document.onmousemove = null;
    cube.style.animationPlayState = "paused";
    //console.log("LEAAVR!!")
  };
}