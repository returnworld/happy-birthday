import dance2 from "../static/zero-two-dance2.gif";
import stars from "../static/stars.webp";
import whiteCat from "../static/whitecat.gif";

var a = navigator.userAgent || navigator.vendor || window.opera;
function isMobile() {
  if (
    /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  ) {
    return true;
  }

  return false;
}

//dance
const img = new Image();
img.src = dance2;
img.className = "dance2";
img.width = 75;
img.style.left = window.innerWidth / 2 - img.width / 2 + "px";
img.style.top = 150 + "px";
document.body.appendChild(img);
img.style.position = "absolute";

var zeroTWO = document.querySelector(".dance2");
const darkCat = document.getElementById("darkcat");
darkCat.style.zIndex = "12";
darkCat.onclick = () => {
  zeroTWO.classList.toggle("show");
};

if (isMobile() === false) {
  console.log(a);

  const divImages = document.createElement("div");
  divImages.className = "imgContainer";
  divImages.style.position = "absolute";
  divImages.style.left = window.innerWidth / 2 - 50 + "px";
  divImages.style.top = window.innerHeight - 200 + "px";
  document.body.appendChild(divImages);

  const divShadow = document.createElement("div");
  divShadow.className = "shadow";
  divImages.appendChild(divShadow);

  const whiteCatImg = new Image();
  whiteCatImg.src = whiteCat;
  whiteCatImg.className = "Cat";
  whiteCatImg.style.position = "absolute";
  whiteCatImg.style.left = window.innerWidth - 50 + "px";
  whiteCatImg.style.top = 20 + "px";
  whiteCatImg.style.zIndex = "11";
  document.body.appendChild(whiteCatImg, whiteCatImg.width);

  //stars
  const imgStars = new Image();
  imgStars.src = stars;
  imgStars.className = "imgStars";
  divShadow.appendChild(imgStars);

  window.addEventListener("resize", () => {
    whiteCatImg.style.left = window.innerWidth - 50 + "px";
    whiteCatImg.style.top = 20 + "px";
    divImages.style.left = window.innerWidth / 2 - 50 + "px";
    img.style.left = window.innerWidth / 2 - img.width / 2 + "px";
  });

  zeroTWO.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + window.scrollY,
      left: box.left + window.scrollX,
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

  whiteCatImg.addEventListener("click", function () {
    zeroTWO.classList.toggle("filter");
  });

  const cube = document.querySelector(".imgContainer");
  cube.ondragstart = function () {
    return false;
  };

  cube.style.animation = "animate2 2s linear infinite";
  cube.style.animationPlayState = "paused";
  cube.onmousedown = function (e) {
    //console.log("click");
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
      cube.style.left = e.pageX - cube.offsetWidth / 2 + "px";
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
  };
}
