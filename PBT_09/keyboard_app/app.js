const images = [
"https://placehold.co/600x400?text=Image+1",
"https://placehold.co/600x400?text=Image+2",
"https://placehold.co/600x400?text=Image+3",
"https://placehold.co/600x400?text=Image+4",
"https://placehold.co/600x400?text=Image+5"
];

let currentIndex = 0;

const galleryImage =
document.getElementById("galleryImage");

const modalOverlay =
document.getElementById("modalOverlay");

const modalImage =
document.getElementById("modalImage");

let slideInterval = null;

galleryImage.src = images[currentIndex];

function showImage(index){

currentIndex = index;

galleryImage.src =
images[currentIndex];
}

function nextImage(){

currentIndex++;

if(currentIndex >= images.length){

currentIndex = 0;

}

showImage(currentIndex);
}

function prevImage(){

currentIndex--;

if(currentIndex < 0){

currentIndex =
images.length - 1;

}

showImage(currentIndex);
}

document
.getElementById("nextBtn")
.addEventListener(
"click",
nextImage
);

document
.getElementById("prevBtn")
.addEventListener(
"click",
prevImage
);

galleryImage.addEventListener(
"click",
()=>{

modalImage.src =
images[currentIndex];

modalOverlay.classList.remove(
"hidden"
);

}
);

document
.getElementById("closeModal")
.addEventListener(
"click",
()=>{

modalOverlay.classList.add(
"hidden"
);

}
);

function toggleSlideshow(){

if(slideInterval){

clearInterval(slideInterval);

slideInterval = null;

return;
}

slideInterval =
setInterval(nextImage,2000);
}

document.addEventListener(
"keydown",
(e)=>{

if(e.key==="ArrowRight"){

nextImage();

}

if(e.key==="ArrowLeft"){

prevImage();

}

if(e.key===" "){

e.preventDefault();

toggleSlideshow();

}

if(
e.key >= "1" &&
e.key <= "9"
){

const idx =
Number(e.key)-1;

if(idx < images.length){

showImage(idx);

}

}

if(e.key==="Escape"){

modalOverlay.classList.add(
"hidden"
);

closePalette();

}

if(
e.ctrlKey &&
e.key.toLowerCase()==="k"
){

e.preventDefault();

openPalette();

}

}
);

const commands = [
"Open Home",
"Toggle Dark Mode",
"Show Help",
"About App"
];

const palette =
document.getElementById(
"commandPalette"
);

const commandInput =
document.getElementById(
"commandInput"
);

const commandList =
document.getElementById(
"commandList"
);

function openPalette(){

palette.classList.remove(
"hidden"
);

commandInput.focus();

renderCommands(commands);
}

function closePalette(){

palette.classList.add(
"hidden"
);

commandInput.value="";
}

function renderCommands(list){

commandList.innerHTML="";

list.forEach(cmd=>{

const li =
document.createElement("li");

li.textContent = cmd;

commandList.appendChild(li);

});

}

commandInput.addEventListener(
"input",
()=>{

const keyword =
commandInput.value
.toLowerCase();

const filtered =
commands.filter(cmd =>
cmd.toLowerCase()
.includes(keyword)
);

renderCommands(filtered);

}
);

commandInput.addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter"){

const first =
commandList.firstChild;

if(first){

alert(
"Selected: "
+
first.textContent
);

}

closePalette();

}

}
);