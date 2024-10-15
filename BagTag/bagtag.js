let BagTagData;
async function fetchData() {
  const url = './bagtag.json';
  try {
      const response = await fetch(url);
      if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('BagTagData',JSON.stringify(data));
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
}

window.addEventListener('load', async ()=>{
    await fetchData();
    BagTagData = await JSON.parse(localStorage.getItem('BagTagData'));
    document.getElementById('price').innerHTML="Rs ."+BagTagData.price;
    let images = BagTagData.images;
    await Object.keys(images).forEach(key => {
        let selectbg = document.getElementById('defaultbg');
        let option = document.createElement('option');
        option.innerHTML=key;
        option.value=images[key];
        selectbg.appendChild(option)
    });
})

document.getElementById('defaultbg').addEventListener('input',()=>{
    console.log(document.getElementById('defaultbg'));
    document.getElementById('background').src =document.getElementById('defaultbg').value;
})

document.getElementById('selectforeground').addEventListener('input',async (event)=>{
    document.getElementById('foreground').src = URL.createObjectURL(event.target.files[0]);
    photo = document.getElementById('foreground');
    document.getElementById('editem').innerHTML="Photo";
})


document.getElementById('removebg').addEventListener('click', async ()=>{
    const photo1=document.getElementById('foreground');
    const apiKey = 'zR8svbq4FGrLyPSUGnWCWC17';
    const file = await fetch(photo1.src)
    .then(res => res.blob());

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
        'X-Api-Key': apiKey
    },
    body: formData
    });

    if (response.ok) {
    const blob = await response.blob();
    const newImgUrl = URL.createObjectURL(blob);
    photo1.src = newImgUrl;
    console.log('Background removed successfully');
    } else {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    }
})

document.getElementById('name').addEventListener('click',()=>{
    document.getElementById('stdname').focus();
    photo = document.getElementById('name');
    document.getElementById('editem').innerHTML="Name";
})

document.getElementById('class').addEventListener('click',()=>{
    document.getElementById('stdclass').focus();
    photo=document.getElementById('class');
    document.getElementById('editem').innerHTML="Class"
})

let Name = document.getElementById("stdname");
Name.addEventListener("input",()=>{
    document.getElementById('name').innerHTML=Name.value;
})

let Class = document.getElementById("stdclass");
Class.addEventListener("input",()=>{
    document.getElementById('class').innerHTML=Class.value;
})

let photo = document.getElementById("foreground");

Name.addEventListener('click',()=>{
    photo = document.getElementById('name');
    document.getElementById('editem').innerHTML="Name";
})

Class.addEventListener("click",()=>{
    photo=document.getElementById('class');
    document.getElementById('editem').innerHTML="Class"
})

document.getElementById('foreground').addEventListener('click',()=>{
    photo = document.getElementById('foreground');
    document.getElementById('editem').innerHTML="Photo";
    if(photo.getAttribute('src')==""){
        document.getElementById("selectforeground").click();
    }
    
})

function tranform(action){
    switch(action){
      case 'del':
        photo.src="";
        break;
      case 'zoomin':
        photo.style.transform += "scale(1.1)";
        break;
      case 'zoomout':
        photo.style.transform += "scale(0.9)";
        break;
      case 'rleft':
        photo.style.transform += "rotate(-10deg)";
        break;
      case 'rright':
        photo.style.transform += "rotate(10deg)";
        break;
      case 'fliph':
        photo.style.transform += "scaleX(-1)";
        break;
      case 'flipv':
        photo.style.transform += "scaleY(-1)";
        break;
    }
  }

  function move(direction) {
    var currentTop = photo.offsetTop;
    var currentLeft = photo.offsetLeft;
    console.log(currentLeft,currentTop);
    var step = 10;

    switch (direction) {
        case 'up':
            photo.style.top = (currentTop - step) + "px";
            break;
        case 'down':
            photo.style.top = (currentTop + step) + "px";
            break;
        case 'left':
            photo.style.left = (currentLeft - step) + "px";
            break;
        case 'right':
            photo.style.left = (currentLeft + step) + "px";
            break;
        default:
            break;
    }
}

const contrastInput = document.getElementById('contrast');
const brightnessInput = document.getElementById('brightness');

contrastInput.addEventListener('change', () => {
  const contrastValue = contrastInput.value;
  photo.style.filter = `contrast(${contrastValue}%)`;
  document.getElementById('contrastvalue').innerHTML=contrastInput.value;
});


brightnessInput.addEventListener('change', () => {
  const brightnessValue = brightnessInput.value;
  photo.style.filter = `brightness(${brightnessValue}%)`;
  document.getElementById('brightnessvalue').innerHTML=brightnessInput.value;
});

var circle=document.getElementById('circle');
circle.addEventListener('click',()=>{
  if(circle.checked)
  {
    photo.style.borderRadius='100%';
  }
  else{
    photo.style.borderRadius='0%';
  }
})
const border = document.getElementById('imgborder');
border.addEventListener('click',()=>{
  if(border.checked){
    photo.style.border='3px solid';
  }
  else{
    photo.style.border='none';
  }
})

const imgcolor = document.getElementById('imgColorPicker');
imgcolor.addEventListener('input',()=>{
  photo.style.backgroundColor=imgcolor.value;
}
);

function loadScript(url){
    var MyScript = document.createElement('script');
    MyScript.src=url;
    MyScript.className="ms";
    document.body.appendChild(MyScript);
  }

document.getElementById('orderbtn').addEventListener('click', async ()=>{
    await loadScript("order_bagtag.js");
})


document.getElementById('qtn').addEventListener('input',()=>{
  document.getElementById('price').innerHTML = "Rs ."+document.getElementById('qtn').value*BagTagData.price;
})

document.getElementById('cart').addEventListener('click',async ()=>{

  let cart = JSON.parse(localStorage.getItem('cart'))

  if(cart===null){
    cart={"count":1};
  }
  else{
    cart=cart;
    console.log(cart);
  }
  var count = cart["count"];
  var imgname = "image"+count

  cart[count]={
    "name":BagTagData.name,
    "price":document.getElementById('price').innerHTML,
    "qtn":document.getElementById('qtn').value,
    "image":imgname,
    "stdname":document.getElementById('stdname').value,
    "stdclass":document.getElementById('stdclass').value,
    "image border":document.getElementById('imgborder').value,
    "image circle":document.getElementById('circle').value,
    "image brightness " : document.getElementById('brightness').value,
    "image contrast":document.getElementById('contrast').value,
    "product code":BagTagData.productcode,
    "brwoser details ":navigator.userAgent
  }


await html2canvas(document.getElementById('image-section'),{scale:1}).then( async canvas => {
  let imgData = await canvas.toDataURL('image/png');
  await localStorage.setItem(imgname, JSON.stringify(imgData));
  await console.log('stored');
})



cart["count"] +=1;

await localStorage.setItem('cart',JSON.stringify(cart));
console.log(JSON.parse(localStorage.getItem('cart')))
  location.replace('/address.html');
})

document.getElementById('download').addEventListener('click',async ()=>{
  await html2canvas(document.getElementById("image-section"),{
    scale:2
  }).then( async canvas => {
    let link = document.createElement('a');
    link.download = 'div-image.png';
    link.href = canvas.toDataURL();
    link.click();
  });
})

const img = document.getElementById('image-section');
const nav = document.getElementById('header');
const n = document.getElementById('name');
const c = document.getElementById('class');
        let lastScrollTop = 2000;

window.addEventListener('scroll', () => {
  if(window.screen.width<=500){
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop) {
                // Scrolling down
                img.style.width='100px';
                img.style.height='200px';
                img.style.marginLeft='100px';
                n.style.fontSize='8px';
                c.style.fontSize='8px';
                console.log('down');
            } else {
                // Scrolling up
                img.classList.remove('minimized');
                img.style.width='310px';
                img.style.height='460px';
                img.style.marginLeft='25px';
                n.style.fontSize='20px';
                c.style.fontSize='20px';
                console.log('up');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
        }
      }, false);

document.getElementById('edit_items').addEventListener('click',()=>{
  console.log('done');
  let ed = document.getElementById('editimg');
  if(ed.checkVisibility()){
    ed.style.display='none';
  }
  else{
    ed.style.display='flex';
  }
})

function sendToWhatsApp() {

  var message = " ";
  var phoneNumber = "919498088659";
  var whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
  window.location.href=whatsappLink;
  // window.open() = Window.prototype.open();
  // window.open(whatsappLink);
  }