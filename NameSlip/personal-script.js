let Data;
async function fetchData() {
  const url = './data.json';
  try {
      const response = await fetch(url);
      if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      localStorage.setItem('data',JSON.stringify(data));
                // console.log('Data fetched and stored in globalData:', globalData);
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
}
fetchData();
Data= JSON.parse(localStorage.getItem('data'))
localStorage.removeItem('data');

function loadScript(url){
  // var ms = document.querySelectorAll('.ms');
  // if(ms.length>0){
  //   return
  // }
  var MyScript = document.createElement('script');
  MyScript.src=url;
  MyScript.className="ms";
  document.body.appendChild(MyScript);
  console.log('done');
}

window.addEventListener('load', async ()=>{
  let key=localStorage.getItem('keyid');
  document.title=Data[key].name;
  document.getElementById('labelimg').src=Data[key].source;
  document.getElementById('price').innerHTML="Rs. "+Data[key].small; 
  document.getElementById('labeldetails').innerHTML='Small 16 labels in A4 sheet - Size of Lable 100 mm x 34 mm) 16 labels in A4 Sheet (32nos)';
})

const inputimg=document.getElementById("uploadimg");
inputimg.addEventListener('input',(event)=>{
    const photo=document.getElementById('photo');
    photo.src=URL.createObjectURL(event.target.files[0]);
    photo.style.border="none";
    var edit=document.getElementById('editimg');
    edit.style.display='flex';
    document.getElementById('img-container').style.border='none';
    document.getElementById('edititem1').style.display='none';
    document.getElementById('edititem2').style.display='none';
    document.getElementById('extradiv').style.display='none';
})

const photo1=document.getElementById('photo');
const apiKey = 'zR8svbq4FGrLyPSUGnWCWC17';
document.getElementById('bg').addEventListener('click', async ()=>{
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

function move(direction) {
    var photo = document.getElementById("img-container");
    var currentTop = photo.offsetTop;
    var currentLeft = photo.offsetLeft;
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

function tranform(action){
  var photo=document.getElementById('img-container');
  console.log(photo)
  switch(action){
    case 'del':
      photo.src="#";
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

function fontsize(value,ele){

  if(value.length>=30){
    ele.style.fontSize=String(ele.offsetHeight/3)+"px";
  }
  else if(value.length>=25){
    ele.style.fontSize=String(ele.offsetHeight/2)+"px";
  }
  else if(value.length>=20){
    ele.style.fontSize=String(ele.offsetHeight/1.5)+"px";
  }
  else{
    ele.style.fontSize=String(ele.offsetHeight-5)+"px";
  }
}
  document.getElementById('stdname').addEventListener('input',(event)=>{
    var ele=document.getElementById('name');
    ele.innerHTML=event.target.value;
    // fontsize(event.target.value,ele);
    // ele.style.fontSize=String(ele.offsetTop)+"px";
    ele.style.fontSize='5vw';
    ele.style.color='red';
  })
  document.getElementById('stdclass').addEventListener('input',(event)=>{
    var ele=document.getElementById('class');
    ele.innerHTML=event.target.value;
    fontsize(event.target.value,ele);
  })
  document.getElementById('stdsec').addEventListener('input',(event)=>{
    var ele=document.getElementById('section');
    ele.innerHTML=event.target.value;
    fontsize(event.target.value,ele);
  })
  document.getElementById('stdrollno').addEventListener('input',(event)=>{
    var ele=document.getElementById('rollno');
    ele.innerHTML=event.target.value;
    fontsize(event.target.value,ele);
  })
  document.getElementById('stdsub').addEventListener('input',(event)=>{
    var ele=document.getElementById('subject');
    ele.innerHTML=event.target.value;
    fontsize(event.target.value,ele);
  })
  document.getElementById('stdschool').addEventListener('input',(event)=>{
    var ele=document.getElementById('school');
    ele.innerHTML=event.target.value;
    fontsize(event.target.value,ele);
  })
  
  document.getElementById('selectimg').addEventListener('click',()=>{
    var edit=document.getElementById('editimg');
    edit.style.display='flex';
  })

  var cf0=0,cf1=0,cf2=0,cf3=0,cf4=0,cf5=0,cf6=0,cfe=0;
  document.getElementById('editbtn0').addEventListener('click',()=>{
    if(cf0==0){
      var edit=document.getElementById('editimg');
      edit.style.display='flex';cf0=1;
      document.getElementById('extradiv').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem1').style.display='none';
      cfe=0,cf1=0,cf2=0
    }else{
      var edit=document.getElementById('editimg');
      edit.style.display='none';cf0=0;
    }
      
  })

  document.getElementById('extratext').addEventListener('click',()=>{  
    if(cfe==0){
      document.getElementById('extradiv').style.display='flex';cfe=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem3').style.display='none';
      document.getElementById('edititem4').style.display='none';
      document.getElementById('edititem5').style.display='none';
      document.getElementById('edititem6').style.display='none';
      document.getElementById('edititem1').style.display='none';
      cf0=0,cf1=0,cf2=0,cf3=0,cf4=0,cf5=0,cf6=0;
    }else{
      document.getElementById('extradiv').style.display='none';cfe=0;
    }

  })

  document.getElementById('editbtn1').addEventListener('click',()=>{
    if(cf1==0){
      document.getElementById('edititem1').style.display='flex';cf1=1
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('extradiv').style.display='none';
      cf0=0,cf2=0,cfe=0;
    }
    else{
      document.getElementById('edititem1').style.display='none';cf1=0
    }

  })

  document.getElementById('editbtn2').addEventListener('click',()=>{
    if(cf2==0){
      document.getElementById('edititem2').style.display='flex';cf2=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem1').style.display='none';
      document.getElementById('extradiv').style.display='none';
      cf0=0,cf1=0,cfe=0
    }
    else{
      document.getElementById('edititem2').style.display='none';cf2=0;
    }

  })

  document.getElementById('editbtn3').addEventListener('click',()=>{  
    if(cf3==0){
      document.getElementById('edititem3').style.display='flex';cf3=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem1').style.display='none';
      document.getElementById('edititem4').style.display='none';
      document.getElementById('edititem5').style.display='none';
      document.getElementById('edititem6').style.display='none';
      cf0=0,cf1=0,cf2=0,cf4=0,cf5=0,cf6=0
    }else{
      document.getElementById('edititem3').style.display='none';cf3=0;
    }

  })

  document.getElementById('editbtn4').addEventListener('click',()=>{  
    if(cf4==0){
      document.getElementById('edititem4').style.display='flex';cf4=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem3').style.display='none';
      document.getElementById('edititem1').style.display='none';
      document.getElementById('edititem5').style.display='none';
      document.getElementById('edititem6').style.display='none';
      cf0=0,cf1=0,cf2=0,cf3=0,cf5=0,cf6=0
    }else{
      document.getElementById('edititem4').style.display='none';cf4=0;
    }
  })

  document.getElementById('editbtn5').addEventListener('click',()=>{  
    if(cf5==0){
      document.getElementById('edititem5').style.display='flex';cf5=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem3').style.display='none';
      document.getElementById('edititem4').style.display='none';
      document.getElementById('edititem1').style.display='none';
      document.getElementById('edititem6').style.display='none';
      cf0=0,cf1=0,cf2=0,cf3=0,cf4=0,cf6=0
    }else{
      document.getElementById('edititem5').style.display='none';cf5=0;
    }

  })

  document.getElementById('editbtn6').addEventListener('click',()=>{  
    if(cf6==0){
      document.getElementById('edititem6').style.display='flex';cf6=1;
      document.getElementById('editimg').style.display='none';
      document.getElementById('edititem2').style.display='none';
      document.getElementById('edititem3').style.display='none';
      document.getElementById('edititem4').style.display='none';
      document.getElementById('edititem5').style.display='none';
      document.getElementById('edititem1').style.display='none';
      cf0=0,cf1=0,cf2=0,cf3=0,cf4=0,cf5=0;
    }else{
      document.getElementById('edititem6').style.display='none';cf6=0;
    }

  })

  function fontcolorchange(id,targetid){
    var ele=document.getElementById(id);
    var target=document.getElementById(targetid);
    target.style.color=ele.value;
  }

  function textsize(id,targetid){
    var ele=document.getElementById(id);
    var target=document.getElementById(targetid);
    target.style.fontSize=ele.value + 'px';
  }

  function textminus(id, targetid){
    var ele=document.getElementById(id);
    var target=document.getElementById(targetid);
    if(ele.value>1){
      ele.value=Number(ele.value)-1;
      target.style.fontSize=ele.value + 'px';
    }
  }

  function textplus(id , targetid){
    var ele=document.getElementById(id);
    var target=document.getElementById(targetid);
    ele.value=Number(ele.value)+1;
    target.style.fontSize=ele.value + 'px';
  }
  let fstyle = "bold";
  function fontstyle(target,style,id){
    var bold=document.getElementById('bold'+id);
    var italic=document.getElementById('italic'+id);
    if(style=='italic'){
      fstyle = "italic";
      document.getElementById(target).style.fontStyle='italic';
      bold.style.transform='scale(1)';
      bold.style.backgroundColor='snow';
      italic.style.transform='scale(1.2)';
      italic.style.backgroundColor='#98c1d9 ';
      document.getElementById(target).style.fontWeight='normal';
    }
    if(style=='bold'){
      fstyle = "bold";
      document.getElementById(target).style.fontStyle='normal';
      document.getElementById(target).style.fontWeight='bold';
      bold.style.transform='scale(1.2)';
      bold.style.backgroundColor='#98c1d9 ';
      italic.style.transform='scale(1)';
      italic.style.backgroundColor='snow';
    }
  }

function fontstyle2(id,targetid){
  console.log('working');
  var ele=document.getElementById(id);
  var target=document.getElementById(targetid);
  target.style.fontFamily=ele.value;
  target.style.fontStyle=ele.value;
}
  function fmove(dir,id){
    var target = document.getElementById(id);
    var currentTop = target.offsetTop;
    var currentLeft = target.offsetLeft;
    var step = 5;
    switch (dir) {
        case 'up':
            target.style.top = (currentTop - step) + "px";
            break;
        case 'down':
            target.style.top = (currentTop + step) + "px";
            break;
        case 'left':
            target.style.left = (currentLeft - step) + "px";
            break;
        case 'right':
            target.style.left = (currentLeft + step) + "px";
            break;
        default:
            break;
    }
  }
  document.getElementById('name').addEventListener('load',()=>{
    console.log('done');
    document.getElementById('name').style.fontSize=document.getElementById('name').offsetHeight+'px';
  })
  const contrastInput = document.getElementById('contrast');
  const brightnessInput = document.getElementById('brightness');
  const photo = document.getElementById('photo');

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

const container = document.getElementById('img-container');
var circle=document.getElementById('circle');
circle.addEventListener('click',()=>{
  if(circle.checked)
  {
    container.style.borderRadius='100%';
  }
  else{
    container.style.borderRadius='0%';
  }
  container.style.border='none';
})
const border = document.getElementById('imgborder');
border.addEventListener('click',()=>{
  if(border.checked){
    container.style.border='3px solid';
  }
  else{
    container.style.border='none';
  }
})

const imgcolor = document.getElementById('imgColorPicker');
imgcolor.addEventListener('input',async ()=>{
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
  photo1.style.backgroundColor=imgcolor.value;
}
);


var labelstyle='normal';
var normal=document.getElementById('normal');
var glossy=document.getElementById('glossy');
normal.addEventListener('click',()=>{
  normal.style.backgroundColor= "#13aa52";
  normal.style.color='#fff';
  normal.style.transform='scale(1.2)';
  glossy.style.backgroundColor='snow'
  glossy.style.borderRadius='0px'
  normal.style.borderRadius='15px'
  glossy.style.color='black';
  glossy.style.transform='scale(1)'
  normal.style.transition='.4s'
  glossy.style.transition='.4s'
  labelstyle='normal';
  var size = document.getElementById('selectsize').value;
  calprice(qtn,sizevalue,labelstyle);
})

glossy.addEventListener('click',()=>{
  glossy.style.backgroundColor= "#13aa52";
  glossy.style.color='#fff';
  glossy.style.transform='scale(1.2)';
  normal.style.backgroundColor= "snow";
  normal.style.borderRadius='0px'
  glossy.style.borderRadius='15px'
  normal.style.color='black';
  normal.style.transform='scale(1)';
  normal.style.transition='.4s'
  glossy.style.transition='.4s'
  labelstyle='glossy';
  var size = document.getElementById('selectsize').value;
  calprice(qtn,sizevalue,labelstyle);
})

var qtn=1;
let id = localStorage.getItem('keyid');
var sizevalue = Data[id].medium;
var selectsize=document.getElementById('selectsize');
selectsize.addEventListener('click',()=>{
  document.getElementById('qtn').innerHTML=1;
  var qtn = document.getElementById('qtn').value;
  var size = document.getElementById('selectsize').value;
  if(size=='small'){
    sizevalue = Data[id].small;
    document.getElementById('labeldetails').innerHTML='Small 16 labels in A4 sheet - Size of Lable 100 mm x 34 mm) 16 labels in A4 Sheet (32nos)';
  }
  else if (size == 'medium'){
    sizevalue = Data[id].medium;
    document.getElementById('labeldetails').innerHTML='Medium 12 labels in A4 sheet - Size of Lable 100 mm x 44 mm) 12 labels in A4 Sheet (36nos)';
  }
  else if(size == 'large'){
    sizevalue = Data[id].large;
    document.getElementById('labeldetails').innerHTML='Large 10 labels in A4 sheet - Size of Lable 100 mm x 58 mm) 10 labels in A4 Sheet (40nos)';
  }
  else if(size == 'jumbo'){
   sizevalue=Data[id].jumbo;
   document.getElementById('labeldetails').innerHTML='Jumbo 10 labels in A4 sheet - Size of Lable 100 mm x 68 mm)  8 labels in A4 Sheet (48nos)';
  }
  calprice(qtn,sizevalue,labelstyle)
})

document.getElementById('qtn').addEventListener('input',()=>{
  calprice(document.getElementById('qtn').value,sizevalue,labelstyle);
})

function calprice(qtn,size,type){
  var price=size*qtn;
  if(type === 'glossy'){
    price+=Data[id].glossy*qtn;
  }
  document.getElementById('price').innerHTML='Rs. '+price;
}

document.getElementById('cartbtn').addEventListener('click',async ()=>{

  let cart = JSON.parse(localStorage.getItem('cart'))

  var size = document.getElementById('selectsize').value;
  var price = document.getElementById('price').innerHTML;
  var qtn = document.getElementById('qtn').innerHTML;
  var name = document.getElementById('stdname').value;
  var school = document.getElementById('stdschool').value;
  var sclass = document.getElementById('stdclass').value;
  var section = document.getElementById('stdsec').value;
  var rollno = document.getElementById('stdrollno').value;
  var subject = document.getElementById('stdsub').value;

  if(cart===null){
    cart={"count":1};
  }
  else{
    cart=cart;
    console.log(cart);
  }
  var count = cart["count"];
  var imgname = "image"+count
  cart[count]={"name":Data[id].name,"image":imgname,"size":size,"price":price,"qtn":qtn,"type":labelstyle,
  "std name":name,
  "std school":school,
  "std class":sclass,
  "std section":section,
  "std rollno":rollno,
  "std subject":subject,
  "namefontsize":document.getElementById('textSizePicker').value,
  "namefontcolor":document.getElementById('textColorPicker').value,
  "namefontstyle":fstyle,
  "namefontfamily":document.getElementById('fontStylePicker').value,
  "schoolfontsize":document.getElementById('textSizePicker2').value,
  "schoolfontcolor":document.getElementById('textColorPicker2').value,
  "schoolfontstyle":fstyle,
  "schoolfontfamily":document.getElementById('fontStylePicker2').value,
  "classfontsize":document.getElementById('textSizePicker3').value,
  "classfontcolor":document.getElementById('textColorPicker3').value,
  "classfontstyle":fstyle,
  "classfontfamily":document.getElementById('fontStylePicker3').value,
  "sectionfontsize":document.getElementById('textSizePicker4').value,
  "sectionfontcolor":document.getElementById('textColorPicker4').value,
  "sectionfontstyle":fstyle,
  "sectionfontfamily":document.getElementById('fontStylePicker4').value,
  "rollnofontsize":document.getElementById('textSizePicker5').value,
  "rollnofontcolor":document.getElementById('textColorPicker5').value,
  "rollnofontstyle":fstyle,
  "rollnofontfamily":document.getElementById('fontStylePicker5').value,
  "subjectfontsize":document.getElementById('textSizePicker6').value,
  "subjectfontcolor":document.getElementById('textColorPicker6').value,
  "subjectfontstyle":fstyle,
  "subjectfontfamily":document.getElementById('fontStylePicker6').value,
  "imageborder":document.getElementById('imgborder').value,
  "imagecircle":document.getElementById('circle').value,
  "imagebrightness " : document.getElementById('brightness').value,
  "imagecontrast":document.getElementById('contrast').value,
  "productcode":Data[id].productcode
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

document.getElementById('orderbtn').addEventListener('click', async ()=>{
  await localStorage.setItem("Data",JSON.stringify(Data));
  await loadScript("nameslip_order.js");
})

document.getElementById('name').addEventListener('click',()=>{
  document.getElementById('stdname').focus();
})

document.getElementById('school').addEventListener('click',()=>{
  document.getElementById('stdschool').focus();
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


const img = document.getElementById('image-section');
const nav = document.getElementById('header');
const n= document.getElementById('name');
const s = document.getElementById('school');
        let lastScrollTop = 2000;

function scroll(){
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
  if (currentScroll > lastScrollTop) {
      // Scrolling down
      img.style.width='65%';
      img.style.height='65%';
      img.style.marginLeft='60px';
      console.log('down');
      n.style.fontSize='56%';
      s.style.fontSize='56%';
  } else {
      // Scrolling up
      img.classList.remove('minimized');
      img.style.width='100%';
      img.style.height='100%';
      img.style.marginLeft='20px';
      n.style.fontSize='59%';
      s.style.fontSize='59%';
      console.log('up');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling

}

  window.addEventListener('scroll', () => {
    if(window.screen.width<=500){
      scroll()
    }
   
}, false);

function sendToWhatsApp() {

  var message = " ";
  var phoneNumber = "919498088659";
  var whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
  window.location.href=whatsappLink;
  // window.open() = Window.prototype.open();
  // window.open(whatsappLink);
  }

