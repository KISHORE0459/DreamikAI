
let ProductData;
async function fetchData() {
const url = './products.json';
try {
    const response = await fetch(url);
    if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    localStorage.setItem('ProductData',JSON.stringify(data));
                // console.log('Data fetched and stored in globalData:', globalData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
function loadScript(url){
    var ms = document.querySelectorAll('.ms');
    if(ms.length>0){
      return
    }
    var MyScript = document.createElement('script');
    MyScript.src=url;
    MyScript.className="ms";
    document.body.appendChild(MyScript);
    console.log('done');
}

async function clearstorage(){
    await localStorage.removeItem('Productdata');
    await localStorage.removeItem('BagTagData');
    await localStorage.removeItem('StickerData');
    await localStorage.removeItem("ProductData");
    await localStorage.removeItem('data');
    await localStorage.removeItem('keyid');
}

window.addEventListener('load',async ()=>{
    await clearstorage();
    await fetchData();
    ProductData = await JSON.parse(localStorage.getItem('ProductData'));
    Object.keys(ProductData).forEach(key=>{
        var psample = document.getElementById('productsample');
        if(ProductData[key].status==1){
            var prod = document.createElement('div');
            prod.className="sampleprod";
            prod.onclick=()=>{
                window.location.href=ProductData[key].targetpage;
                localStorage.setItem("Productdata",JSON.stringify(ProductData[key]))
            }
            psample.appendChild(prod);
            var logoimg = document.createElement('img');
            logoimg.className="logoimg";
            logoimg.src= ProductData[key].logo;
            logoimg.loading="lazy";
            prod.appendChild(logoimg);
            var title = document.createElement('h5');
            title.innerHTML=key
            prod.appendChild(title)
            var sampleimg = document.createElement('img');
            sampleimg.src=ProductData[key].image;
            sampleimg.style.display="none";
            sampleimg.className="sampleimg";
            prod.appendChild(sampleimg);
            prod.addEventListener("mouseover",()=>{
                logoimg.style.display="none";
                title.style.display="none";
                sampleimg.style.display="block";
            })
            prod.addEventListener('mouseleave',()=>{
                logoimg.style.display="block";
                title.style.display="block";
                sampleimg.style.display="none";
            })
        }
    })

    Object.keys(ProductData).forEach( key => {
        if(ProductData[key].status!=-1){
            let products = document.getElementById('products');
            var product = document.createElement('div');
            product.className="product";
            product.onclick=()=>{
                window.location.href=ProductData[key].targetpage;
                localStorage.setItem("Productdata",JSON.stringify(ProductData[key]))
            }
            products.appendChild(product);
            var image = document.createElement('img');
            image.src = ProductData[key].image;
            image.className="productimg";
            image.loading="lazy";
            product.appendChild(image);
            var name = document.createElement('h3');
            name.innerHTML = ProductData[key].name;
            name.className="productname";
            product.appendChild(name);
            var price = document.createElement('h3');
            price.innerHTML ="Rs ."+ ProductData[key].price;
            price.className="productprice";
            product.appendChild(price);
            if(ProductData[key].status==0){
                image.style.opacity='0.8'
                product.style.backgroundImage="url('image/notavailable.jpg')";
                product.style.backgroundRepeat="no-repeat"
                product.style.backgroundSize="cover";
                product.style.opacity='0.5';
                product.onclick=()=>{
                }
            }
        }
    })
})

document.getElementById('search').addEventListener('click',()=>{
    loadScript('searchProduct.js');
})

