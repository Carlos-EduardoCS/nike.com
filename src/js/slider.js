const carossel = document.querySelector(".wrapper");
firstImg = carossel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".slider i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

let firstImgWidth = firstImg.clientWidth + 15; 
let scrollWidth = carossel.scrollWidth - carossel.clientWidth;

const showHideIcons = () =>{
    arrowIcons[0].style.display = carossel.scrollLeft == 0 ? "none" : "block";
let scrollWidth = carossel.scrollWidth - carossel.clientWidth;
    arrowIcons[1].style.display = carossel.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () =>{

        carossel.scrollLeft += icon.id == "icon1-left" ? -firstImgWidth : firstImgWidth;
        setTimeout (() => showHideIcons(), 60 );
    });
});

const autoSlide = () => {
    if(carossel.scrollLeft == (carossel.scrollWidth - carossel.clientWidth)) return; 

    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 15;
    let valDiference = firstImgWidth - positionDiff;

    if(carossel.scrollLeft > prevScrollLeft){ // scrollin for right
        return carossel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiference : -positionDiff;

    }

    // scrollin for left
    carossel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiference : -positionDiff
}

const dragStart = (e) =>{
    // atualizando as variaveis com o evento do mouse
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carossel.scrollLeft;

}

const dragging = (e) =>{
    // scollando as imagens de acordo com o pointer 
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carossel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carossel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () =>{
    isDragStart = false;
    carossel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide()
}

carossel.addEventListener("mousedown", dragStart)
carossel.addEventListener("touchstart", dragStart)

carossel.addEventListener("mousemove", dragging)
carossel.addEventListener("touchmove", dragging)


carossel.addEventListener("mouseup", dragStop)

carossel.addEventListener("mouseleave", dragStop)
carossel.addEventListener("touchend", dragStop)