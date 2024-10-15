
document.getElementById('search').addEventListener('input',()=>{
    console.log('input')
    let ProductData =JSON.parse(localStorage.getItem('ProductData'));
    let search = document.getElementById('search').value;
    if(search==""){
        location.href='index.html';
    }
    search=search.toString();
    search=search.toLowerCase();
    Object.keys(ProductData).forEach(key=>{
        let props = ProductData[key].props;
        console.log(props);
        props.forEach(prop=>{
            if(prop == search){
                var product = document.getElementById('products');
                product.innerHTML="";
                var product = document.createElement('div');
                product.className="product";
                product.onclick=()=>{
                    window.location.href=ProductData[key].targetpage;
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

})