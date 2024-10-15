
async function order(){
  let Data = JSON.parse(localStorage.getItem('PosterData'));
  console.log(Data);
  let id = JSON.parse(localStorage.getItem('id'));

  var date = new Date();
  var newdate =String(String(date.getFullYear()+String(date.getMonth())+String(date.getDate())+String(date.getHours())+String(date.getMinutes())+date.getSeconds()));

  let fileName = Data.productcode+"_" +newdate+ '_'+Math.random().toString(36).substring(7) + '.csv';

  var data = await {
    "Name":Data.name,
    "price":document.getElementById('price').innerHTML,
    "quantity":document.getElementById('qtn').value,
    "size":document.getElementById('postersize').value,
    "image border":document.getElementById('imgborder').value,
    "image circle":document.getElementById('circle').value,
    "image brightness " : document.getElementById('brightness').value,
    "image contrast":document.getElementById('contrast').value,
    "image size":document.getElementById('postersize').innerHTML,
    "label orderded time ":newdate,
    "product code":Data.productcode,
    "brwoser details ":navigator.userAgent
  }
  
  SendToAws(JSON.stringify(data),fileName,'application/json');
  
  await localStorage.setItem("Data",JSON.stringify(data))
  await localStorage.setItem("orderData", JSON.stringify(data));
  
  let fileNameimg = data.productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7) + '.png';

  let scalecount=2;

  if(window.innerWidth<=500){
    scalecount=4;
  }

  var mask = document.querySelectorAll('.watermark')[id];
  (document.querySelectorAll('.image-section')[id]).removeChild(mask)

  // const img = document.querySelectorAll('.image-section')[id];

  // if (!img.complete) {
  //     img.onload = async () => await processImage(img);
  // } else {
  //     await processImage(img);
  // }

  // async function processImage(img){
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   ctx.drawImage(img, 0, 0);
  //   const dataURL = canvas.toDataURL('image/jpeg'); // Change 'image/jpeg' if your image is in a different format

  //   // Convert base64 to a file object
  //   const blob = await (await fetch(dataURL)).blob();
  //   const file = new File([blob], "image.jpg", { type: 'image/jpeg' });
  //   await SendToAws(file,fileNameimg,'image/jpeg');
  //   alert("uploaded success")
  // }

  await html2canvas(document.querySelectorAll(".image-section")[id],{
    scale:scalecount
  }).then( async canvas => {
    let link = document.createElement('a');
    link.download = 'div-image.png';
    link.href = canvas.toDataURL();
    link.click();
    let imgData = await canvas.toDataURL('image/png');
    await localStorage.setItem('Image', JSON.stringify(imgData));
    
    // window.location.href = "/address2.html";
    console.log('stored')
    await alert('Select The Downloaded Image To Proceed The Order');
    const [fileHandle] = await window.showOpenFilePicker();          
    const file = await fileHandle.getFile();

    await SendToAws(file,fileNameimg,'image/png');
  });
  
 window.location.href="/address2.html"; 
}
order();