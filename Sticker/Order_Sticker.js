async function order() {
  // Retrieve and parse the data from localStorage
  let Data = JSON.parse(localStorage.getItem('StickerData'));

  // Generate a unique filename
  let date = new Date();
  let newdate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  let fileName = `${Data.productcode}_${newdate}_${Math.random().toString(36).substring(7)}.csv`;

  // Collect data from the DOM
  let data = {
      "Name":Data.name,
      "quantity":document.getElementById('qtn').value,
      "price": document.getElementById('price').innerHTML,
      "size":'2 x 2',
      "image border": document.getElementById('imgborder').value,
      "image circle": document.getElementById('circle').value,
      "image brightness": document.getElementById('brightness').value,
      "image contrast": document.getElementById('contrast').value,
      "image width": document.getElementById('sticker').offsetWidth,
      "image height": document.getElementById('sticker').offsetHeight,
      "image color": document.getElementById('imgColorPicker').value,
      "label orderded time": newdate,
      "browser details": navigator.userAgent
  };

  // Save data to localStorage
  localStorage.setItem("Data", JSON.stringify(data));
  localStorage.setItem("orderData", JSON.stringify(data));

  // Send data to AWS
  await SendToAws(JSON.stringify(data), fileName, 'application/json');

  // Prepare the image filename
  let fileNameimg = `${Data.productcode}_${newdate}_${Math.random().toString(36).substring(7)}.png`;

  // Determine the scale value based on window width
  let scalevalue = window.innerWidth <= 500 ? 4 : 2;

  // Create a canvas from the HTML element and save the image
await html2canvas(document.getElementById("sticker"),{
    scale:scalevalue,
    useCORS: true,
    allowTaint: true}).then( async canvas => {
    
    let imgData = await canvas.toDataURL('image/png');
    await localStorage.setItem('Image', JSON.stringify(imgData));
    console.log('stored')

    let link = document.createElement('a');
    link.download = 'div-image.png';
    link.href = canvas.toDataURL();
    link.click();

    alert('Select The Downloaded Image To Proceed The Order');
    
    // window.location.href = "/address2.html";
    const [fileHandle] = await window.showOpenFilePicker(); 
    const file = await fileHandle.getFile();

    // window.location.href="/address2.html"; 
    // let fileNameimg = Data[key].productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7)+'.png';
    SendToAws(file,fileNameimg,'image/png');
  });
  window.location.href = "/address2.html";
}

// Call the order function
order();
