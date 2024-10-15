let StickerData;
async function fetchData() {
  const url = './Sticker.json';
  try {
      const response = await fetch(url);
      if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('StickerData',JSON.stringify(data));
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
}

window.addEventListener('load', async ()=>{
    await fetchData();
    StickerData = await JSON.parse(localStorage.getItem('StickerData'));
    document.getElementById('price').innerHTML="Rs ."+StickerData.price;
})


document.getElementById('selectforeground').addEventListener('input',async (event)=>{
    document.getElementById('sticker').src = URL.createObjectURL(event.target.files[0]);
})

document.getElementById('removebg').addEventListener('click', async ()=>{
    const photo1=document.getElementById('sticker');
    const apiKey = 'NxhwNd9FkG2V4shLHtSaa4Rx';
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

let photo = document.getElementById('sticker'); 

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
    console.log(currentLeft,currentTop);
    switch (direction) {
        case 'up':
            if(currentTop>-50){
              photo.style.top = (currentTop - step) + "px";
            }
            break;
        case 'down':
          if(currentTop<50){
            photo.style.top = (currentTop + step) + "px";
          }
            break;
        case 'left':
          if(currentLeft>-50){
            photo.style.left = (currentLeft - step) + "px";
          }
            break;
        case 'right':
          if(currentLeft<50){
            photo.style.left = (currentLeft + step) + "px";
          }
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

document.getElementById('qtn').addEventListener('input',()=>{
    document.getElementById('price').innerHTML="Rs ."+StickerData.price* document.getElementById('qtn').value;
})

function loadScript(url){
    var MyScript = document.createElement('script');
    MyScript.src=url;
    MyScript.className="ms";
    document.body.appendChild(MyScript);
}

document.getElementById('orderbtn').addEventListener('click', async ()=>{
    await loadScript("Order_Sticker.js");
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
    "name":StickerData.name,
    "price":document.getElementById('price').innerHTML,
    "qtn":document.getElementById('qtn').value,
    "image":imgname,
    "image border":document.getElementById('imgborder').value,
    "image circle":document.getElementById('circle').value,
    "image brightness " : document.getElementById('brightness').value,
    "image contrast":document.getElementById('contrast').value,
    "product code":StickerData.productcode,
    "brwoser details ":navigator.userAgent
  }


  await html2canvas(document.getElementById('image-section')).then( async canvas => {
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
    scale:0.5
  }).then( async canvas => {
    let link = document.createElement('a');
    link.download = 'div-image.png';
    link.href = canvas.toDataURL();
    link.click();
  });
})

// const img = document.getElementById('image-section');
// const nav = document.getElementById('header');
//         let lastScrollTop = 2000;

// window.addEventListener('scroll', () => {
//             const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//             if (currentScroll > lastScrollTop) {
//                 // Scrolling down
//                 img.style.width='65%';
//                 img.style.height='65%';
//                 img.style.marginLeft='60px';
//                 console.log('down');
//             } else {
//                 // Scrolling up
//                 img.classList.remove('minimized');
//                 img.style.width='100%';
//                 img.style.height='100%';
//                 img.style.marginLeft='20px';
//                 console.log('up');
//             }
//             lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
//         }, false);

function sendToWhatsApp() {

  var message = " ";
  var phoneNumber = "919498088659";
  var whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
  window.location.href=whatsappLink;
  // window.open() = Window.prototype.open();
  // window.open(whatsappLink);
  }