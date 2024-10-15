html2canvas(document.getElementById('image-section'), {
    onrendered: function(canvas) {
        let imgData = canvas.toDataURL('image/png');
        localStorage.setItem('capturedImage', JSON.stringify(imgData));
        console.log('stored');
    }
});

var img = JSON.parse(localStorage.getItem("Image"));
console.log(img)
if (img) {
document.getElementById('testimg').src = img;
console.log('set');
} else {
alert('No image found in local storage.');
}



function order(){
    html2canvas(document.getElementById('image-section')).then(function(canvas) {

       // Convert the image data to a Blob
        canvas.toBlob(function(blob) {
          // Generate a unique file name
          const imagefile = new File([blob],fileName,{type:"image/png"});
          const file = new File([data], fileName, {type: 'text/json'});
          // const file = new File([data], fileName, {type: 'text/txt'});
          AWS.config.region = "ap-south-1";
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "ap-south-1:f6f8d75b-560d-4a11-8b37-67906ac38e41",      });
    
      const s3 = new AWS.S3();
      const params = {
     Bucket: "dreamik-web-customize-v1",
     Key: fileName,
      Body: file,
    };
    
    s3.putObject(params, (err, data) => {   if (err) {
       console.error("Error uploading file:", err);
        alert("An error occurred while uploading the file.");
       } else {
         console.log("File uploaded successfully:", data);
       }
     });
     let fileNameimg = data.productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7) + '.png';
     const paramsimg = {
      Bucket: "dreamik-web-customize-v1",
      Key: fileNameimg,
       Body: imagefile,
     };
     s3.putObject(paramsimg, (err, data) => {   if (err) {
      console.error("Error uploading file:", err);
       alert("An error occurred while uploading the file.");
      } else {
        console.log("File uploaded successfully:", data);
        alert("Image Poster ordered successfully!");
      }
    });
           }, 'image/png');
           
     })
     
}
order();


let data = JSON.parse(localStorage.getItem('Productdata'));
console.log(data);

var date = new Date();
var newdate =String(String(date.getFullYear()+String(date.getMonth())+String(date.getDate())+String(date.getHours())+String(date.getMinutes())+date.getSeconds()));
let fileName =newdate+ '_'+data.productcode+"_" +Math.random().toString(36).substring(7) + '.csv';
data = {
  "price":data.price,
  "image border":document.getElementById('imgborder').value,
  "image circle":document.getElementById('circle').value,
  "image brightness " : document.getElementById('brightness').value,
  "image contrast":document.getElementById('contrast').value,
  "label orderded time ":newdate,
  "brwoser details ":navigator.userAgent
}