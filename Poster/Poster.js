let PosterData;
async function fetchData() {
  const url = './Poster.json';
  try {
      const response = await fetch(url);
      if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      localStorage.setItem('PosterData',JSON.stringify(data));
                // console.log('Data fetched and stored in globalData:', globalData);
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
}

function loadScript(url){
  var MyScript = document.createElement('script');
  MyScript.src=url;
  MyScript.className="ms";
  document.body.appendChild(MyScript);
  console.log('done');
}


let imgsec = document.getElementById('image-section');
let bg = document.getElementById('background');
let fg = document.getElementById('foreground');
let fg1 = document.getElementById('foreground01');
let watermark = document.getElementById('watermark')
let frame = document.getElementById('frame');

let imgsec1 = document.getElementById('image-section1');
let bg1 = document.getElementById('background1');
let fg01 = document.getElementById('foreground1');
let fg11 = document.getElementById('foreground11');
let watermark1 = document.getElementById('watermark1');
let frame1 = document.getElementById('frame1');

let id=0;

window.addEventListener('load', async ()=>{
  await fetchData();
  PosterData = await JSON.parse(localStorage.getItem('PosterData'));
  localStorage.removeItem('PosterData');
  document.getElementById('price').innerHTML="Rs ."+PosterData.price;
  let images = PosterData.images;
  await Object.keys(images).forEach(key => {
      let selectbg = document.getElementById('defaultbg');
      let option = document.createElement('option');
      option.innerHTML=key;
      option.value=images[key];
      selectbg.appendChild(option)
  });
  let size = PosterData.sizes;
  let selectsize = document.getElementById('postersize');
  await Object.keys(size).forEach(key=>{
    let option = document.createElement('option');
    option.innerHTML=key;
    option.value = size[key];
    selectsize.appendChild(option);
  })
})


function setPosterSize(bgw,bgh,fgw,fgh,fw,fh,fdisplay,bgtop,bgleft,fgtop,fgleft,fg1left){
  let bg=document.querySelectorAll('.background')[id];
  let fg = document.querySelectorAll('.foreground')[id];
  let fg1= document.querySelectorAll('.foreground1')[id];
  let watermark = document.querySelectorAll('.watermark')[id];
  let frame = document.querySelectorAll('.frame')[id];
  let imgsec = document.querySelectorAll('.image-section')[id];

  imgsec.style.marginLeft="4vw";
  bg.style.width=bgw;
  bg.style.height=bgh;
  bg.style.top=bgtop;
  bg.style.left=bgleft;
  fg.style.width=fgw;
  fg.style.height=fgh;
  fg.style.top=fgtop;
  fg.style.left=fgleft;
  fg1.style.width=fgw;
  fg1.style.height=fgh;
  fg1.style.top=fgtop;
  fg1.style.left = fg1left;
  watermark.style.width=bgw;
  watermark.style.height=bgh;
  watermark.style.top=bgtop;
  watermark.style.left=bgleft;
  if(fdisplay=='true'){
    frame.style.width=fw;
    frame.style.height=fh;
    frame.style.top='0px';
    frame.style.left='0px';
    frame.style.display="block";
    frame.style.position='absolute';
    imgsec.style.width=fw;
    imgsec.style.height=fh;
  }
  else{
    frame.style.display="none";
    imgsec.style.width=bgw;
    imgsec.style.height=bgh;
  }
}

let selectsize = document.getElementById('postersize')
let price;
selectsize.addEventListener('change',()=>{
  // let PosterData = JSON.parse(localStorage.getItem('PosterData'));
  console.log('done');
  let prices = PosterData["prices"];
  console.log(price);
  let prop = selectsize.value;
  var qtn = document.getElementById('qtn').value;
  price=prices[prop]
  calprice(price,qtn);
  if(window.innerWidth>=500){
    if(prop === "6x4"){
      setPosterSize('300px','450px','100px','200px','365px','600px','false','0px','0px','200px','50px','180px')
    }
    if(prop==="A4"){
      setPosterSize('356px','560px','100px','200px','430px','740px','false','0px','0px','250px','80px','200px');
    }
    if(prop ==="6x4F"){
      setPosterSize('300px','450px','100px','200px','365px','600px','true','72px','32px','250px','50px','200px');
    }
    if(prop ==="A4F"){
      setPosterSize('356px','560px','100px','200px','430px','740px','true','82px','37px','350px','100px','250px');
    }
  }else{
    if(prop === "6x4"){
      setPosterSize('250px','365px','100px','200px','365px','600px','false','0px','0px','150px','20px','80px');
    }
    if(prop==="A4"){
      setPosterSize('280px','415px','100px','200px','430px','740px','false','0px','0px','150px','40px','160px');
    }
    if(prop ==="6x4F"){
      setPosterSize('200px','275px','70px','100px','245px','365px','true','43px','22px','170px','50px','140px');
    }
    if(prop ==="A4F"){
      setPosterSize('230px','365px','80px','160px','280px','475px','true','53px','24px','210px','50px','140px');
    }
  }
  
  
})

function calprice(price,qtn){
  document.getElementById("price").innerHTML="Rs ."+price*qtn;
}

document.getElementById('selectbackground').addEventListener('input',(event)=>{
    var bg = document.querySelectorAll('background')[id];
    bg.src=URL.createObjectURL(event.target.files[0]);
})

async function setForeground(id){
  const apiKey = 'ZTrHCAEajKTgU3AxDC4ZQYfu';
  const file = document.getElementById('selectforeground').files[0];
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
  id.style.display='block';
  id.src = newImgUrl;
  console.log('Background removed successfully');
  } else {
  console.error(`Error: ${response.status} - ${response.statusText}`);
  }
}




document.getElementById('defaultbg').addEventListener('input',()=>{
    var bg = document.querySelectorAll('.background')[id]
    bg.src =document.getElementById('defaultbg').value;
})

let photo=document.getElementById('foreground');
var photoid = document.getElementById('photoid');

photoid.addEventListener('input',()=>{
  console.log(photoid.value);
  photo=document.querySelectorAll(photoid.value)
  console.log(photo);
  photo = photo[id];
  console.log(photo);
})

document.getElementById('selectforeground').addEventListener('input',async ()=>{
  setForeground(photo);
})

document.getElementById('img1').addEventListener('click',()=>{
  imgsec.style.display="block";
  imgsec1.style.display="none";
  id=0;
})

document.getElementById('img2').addEventListener('click',()=>{
  imgsec.style.display="none";
  imgsec1.style.display="block";
  id=1;
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

var transparacy = document.getElementById('Transparacy');
transparacy.addEventListener('change', () => {
    document.getElementById('background').style.opacity=transparacy.value/100;
    document.getElementById('Transparacyvalue').innerHTML=transparacy.value;
  });


document.getElementById('qtn').addEventListener('input',()=>{
  calprice(price,document.getElementById('qtn').value)
})
  
  document.getElementById('orderbtn').addEventListener('click', async ()=>{
    // await loadScript("https://sdk.amazonaws.com/js/aws-sdk-2.813.0.min.js");
    // await loadScript("https://html2canvas.hertzen.com/dist/html2canvas.min.js");
    localStorage.setItem('id',JSON.stringify(id));
    localStorage.setItem("PosterData",JSON.stringify(PosterData));
    await loadScript("poster_order.js");
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
    "name":PosterData.name,
    "price":document.getElementById('price').innerHTML,
    "quantity":document.getElementById('qtn').value,
    "image":imgname,
    "image border":document.getElementById('imgborder').value,
    "image circle":document.getElementById('circle').value,
    "image brightness " : document.getElementById('brightness').value,
    "image contrast":document.getElementById('contrast').value,
    "image size":document.getElementById('postersize').innerHTML,
    "product code":PosterData.productcode,
    "brwoser details ":navigator.userAgent
  }


  await html2canvas(document.querySelectorAll('.image-section')[id]).then( async canvas => {
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
  await html2canvas(document.querySelectorAll(".image-section")[id],{
    scale:0.5
  }).then( async canvas => {
    let link = document.createElement('a');
    link.download = 'div-image.png';
    link.href = canvas.toDataURL();
    link.click();
  });
})

var image1= document.getElementById('image-section');
var image2= document.getElementById('image-section1');
document.getElementById('AddImage').addEventListener('click',()=>{
  document.getElementById('img2').style.display='block';
  image1.style.display="none";
  document.getElementById('img1').style.border='none';
  image2.style.display="block";
  id=1;
  document.getElementById('AddImage').style.display='none';
})

if(window.screen.width<=500){
  var ed_fg = document.createElement('button');
  ed_fg.id='edit_fg';
  var ed_logo = document.createElement('i');
  ed_logo.className='fas fa-edit';
  ed_logo.id='edit_icon';
  ed_fg.appendChild(ed_logo);
  console.log('done');
  document.getElementById('edit_items').appendChild(ed_fg);

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
}


function sendToWhatsApp() {

  var message = " ";
  var phoneNumber = "919498088659";
  var whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
  window.location.href=whatsappLink;
  // window.open() = Window.prototype.open();
  // window.open(whatsappLink);
  }