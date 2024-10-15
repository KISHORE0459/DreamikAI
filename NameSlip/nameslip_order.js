async function order(){

  let Data = JSON.parse(localStorage.getItem('Data'));
  let key = localStorage.getItem('keyid');
  console.log(Data);
  

  var date = new Date();
  let newdate =String(String(date.getFullYear()+String(date.getMonth())+String(date.getDate())+String(date.getHours())+String(date.getMinutes())+date.getSeconds()));

  let fileName = Data[key].productcode+"_" +newdate+ '_'+Math.random().toString(36).substring(7)+'.txt';

  var price = document.getElementById('price').innerHTML;
  var size = document.getElementById('selectsize').value;
  var name = document.getElementById('stdname').value;
  var school = document.getElementById('stdschool').value;
  var sclass = document.getElementById('stdclass').value;
  var section = document.getElementById('stdsec').value;
  var rollno = document.getElementById('stdrollno').value;
  var subject = document.getElementById('stdsub').value;

  var data = await {
    "Name":Data[key].name,
    "price":price,
    "size":size,
    "quantity":document.getElementById('qtn').value,
    "labeltype":labelstyle,
    "name":name,
    "name font size":document.getElementById('textSizePicker').value,
    "name font color":document.getElementById('textColorPicker').value,
    "name font style":fstyle,
    "name font family":document.getElementById('fontStylePicker').value,
    "school":school,
    "school font size":document.getElementById('textSizePicker2').value,
    "school font color":document.getElementById('textColorPicker2').value,
    "school font style":fstyle,
    "school font family":document.getElementById('fontStylePicker2').value,
    "class":sclass,
    "class font size":document.getElementById('textSizePicker3').value,
    "class font color":document.getElementById('textColorPicker3').value,
    "class font style":fstyle,
    "class font family":document.getElementById('fontStylePicker3').value,
    "section":section,
    "section font size":document.getElementById('textSizePicker4').value,
    "section font color":document.getElementById('textColorPicker4').value,
    "section font style":fstyle,
    "section font family":document.getElementById('fontStylePicker4').value,
    "rollno":rollno,
    "roll no  font size":document.getElementById('textSizePicker5').value,
    "roll no font color":document.getElementById('textColorPicker5').value,
    "roll no font style":fstyle,
    "roll no font family":document.getElementById('fontStylePicker5').value,
    "subject":subject,
    "subject font size":document.getElementById('textSizePicker6').value,
    "subject font color":document.getElementById('textColorPicker6').value,
    "subject font style":fstyle,
    "subject font family":document.getElementById('fontStylePicker6').value,
    "image border":document.getElementById('imgborder').value,
    "image circle":document.getElementById('circle').value,
    "image brightness " : document.getElementById('brightness').value,
    "image contrast":document.getElementById('contrast').value,
    "label orderded time ":newdate,
    "brwoser details ":navigator.userAgent
  }

  // AWS.config.region = "ap-south-1";
  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: "ap-south-1:f6f8d75b-560d-4a11-8b37-67906ac38e41",      });

  //   const s3 = new AWS.S3();

  //   const params = {
  //   Bucket: "dreamik-web-customize-v1",
  //   Key: "temp/"+fileName,
  //   Body: JSON.stringify(data),
  //   ContentType:'application/json'
  //   };
    
  //   s3.putObject(params, (err, data) => {   if (err) {
  //       console.error("Error uploading file:", err);
  //       alert("An error occurred while uploading the file.");
  //       } else {
  //       console.log("File uploaded successfully:", data);
  //       }
  //   });
  SendToAws(JSON.stringify(data),fileName,'application/json');


  await localStorage.setItem("Data",JSON.stringify(data));
  await localStorage.setItem("orderData", JSON.stringify(data));

  let scalevalue=2
  if(window.innerWidth<=500){
    scalevalue=4
  }
  var mask = document.getElementById('cmp_watermark')
  document.getElementById('image-section').removeChild(mask)
  await html2canvas(document.getElementById("image-section"),{
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
    let fileNameimg = Data[key].productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7)+'.png';
    SendToAws(file,fileNameimg,'image/png');
  });
  
 window.location.href="/address2.html"; 
}
order();

