window.addEventListener('load',async ()=>{

    var cart = await JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    let iname;
    Object.keys(cart).forEach( async key=>{
        if(key!="count"){
        
        let div1 = document.createElement('div');
        div1.className='sub-items';
        document.getElementById("items").appendChild(div1);
        let img = document.createElement('img');
        img.id="image";
        img.className="img";
        img.src= JSON.parse(localStorage.getItem(cart[key].image));
        // iname= cart[key].image;
        div1.appendChild(img);
        let name = document.createElement('h3');
        name.innerHTML="Name :"+cart[key].name;
        div1.appendChild(name);
        let price = document.createElement('h3');
        price.innerHTML="Price :"+cart[key].price;
        div1.appendChild(price);
        let qtn = document.createElement('h3');
        qtn.innerHTML="Quantity :"+cart[key].qtn;
        div1.appendChild(qtn);
        div2 = document.createElement('div');
        div2.className="divbtn";
        div1.appendChild(div2);
        var order = document.createElement('button');
        order.innerHTML="Order Now";
        order.id="order";
        order.className='order';
        div2.appendChild(order);
        order.onclick=async ()=>{
            localStorage.setItem("Image",JSON.stringify(localStorage.getItem("Image")))
            var data = cart[key];
            let imagefile;

            await html2canvas(img, {
            onrendered: async function(canvas) {
                let imgData = await canvas.toDataURL('image/png');
                await localStorage.setItem('Image', JSON.stringify(imgData));
                console.log('stored');

                await canvas.toBlob( function(blob){
                    imagefile = new File([blob],fileName,{type:"image/png"});
                } ,'image/png');
            }
            });

            var date = new Date();
            var newdate =String(String(date.getFullYear()+String(date.getMonth())+String(date.getDate())+String(date.getHours())+String(date.getMinutes())+date.getSeconds()));

            let fileName = cart[key].productcode+"_" +newdate+ '_'+Math.random().toString(36).substring(7) + '.csv';

            Object.defineProperty(data,'filename',{value:fileName});

            console.log(data);

            await localStorage.setItem("Data",JSON.stringify(data))

            const file = await new File([data], fileName, {type: 'text/json'});

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
            let fileNameimg = cart[key].productcode+"_" +newdate+ '_' + Math.random().toString(36).substring(7) + '.png';
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
                alert("Product ordered successfully!");
                }
            });
        }
        var removecart = document.createElement('button');
        removecart.innerHTML="Remove";
        removecart.className='removecart';
        removecart.onclick= async ()=>{
            await delete cart[key];
            // localStorage.removeItem(iname);
            localStorage.setItem("cart",JSON.stringify(cart));
            location.replace("cart.html");
        }
        div2.appendChild(removecart);
        }
    })
})