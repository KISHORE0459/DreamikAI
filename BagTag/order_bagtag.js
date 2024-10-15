async function order(){
      let data = JSON.parse(localStorage.getItem('Productdata'));

      var date = new Date();
      var newdate =String(String(date.getFullYear()+String(date.getMonth())+String(date.getDate())+String(date.getHours())+String(date.getMinutes())+date.getSeconds()));

      let fileName = data.productcode+"_" +newdate+ '_'+Math.random().toString(36).substring(7) + '.csv';
      data = await {
          "Name":data.name,
          "price":document.getElementById('price').innerHTML,
          "name":document.getElementById('stdname').value,
          "quantity":document.getElementById('qtn').value,
          "size":"6 x 4",
          "class":document.getElementById('stdclass').value,
          "image border":document.getElementById('imgborder').value,
          "image circle":document.getElementById('circle').value,
          "image brightness " : document.getElementById('brightness').value,
          "image contrast":document.getElementById('contrast').value,
          "label orderded time ":newdate,
          "brwoser details ":navigator.userAgent
      }
      SendToAws(JSON.stringify(data),fileName,'application/json');
      await localStorage.setItem("Data",JSON.stringify(data));
      await localStorage.setItem("orderData", JSON.stringify(data));
      let scalevalue=2
      if(window.innerWidth<=500){
        scalevalue=3
      }

      console.log(scalevalue)
      let fileNameimg = data.productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7) + '.png';

      var mask = document.getElementById('cmp_watermark')
      document.getElementById('image-section').removeChild(mask)

      await html2canvas(document.getElementById("image-section"),{scale:scalevalue}).then( async canvas => {
        let link = document.createElement('a');
        link.download = 'div-image.png';
        link.href = canvas.toDataURL();
        link.click();
        let imgData = await canvas.toDataURL();
        await localStorage.setItem('Image', JSON.stringify(imgData));
        console.log('stored')
        alert('Select The Downloaded Image To Proceed The Order');
        
      // window.location.href = "/address2.html";
        const [fileHandle] = await window.showOpenFilePicker();          
        const file = await fileHandle.getFile();
        await SendToAws(file,fileNameimg,'image/png');
      });
         
 window.location.href="/address2.html"; 
}
order();