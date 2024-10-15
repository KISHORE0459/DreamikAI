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


document.getElementById('search').addEventListener('input',async () => {
  await fetchData();
  Data = await JSON.parse(localStorage.getItem('data'))
  localStorage.removeItem('data');
  await search();
  console.log('input event triggered');
});

async function search() {
  var search = await document.getElementById('search').value;
  search = search.toString();
  search = search.toLowerCase();
  if(search==''){
    window.location.href="Name_Slip.html";
  }
  var searchItemContainer = await document.getElementById('search-item');
  searchItemContainer.innerHTML = ''; // Clear previous search results

  await Object.keys(Data).forEach(key => {
    let props = Data[key].props;
    props.forEach(prop => {
      if (prop == search) {
        let pdiv = document.createElement('div');
        pdiv.className = 'pro';
        pdiv.id = 'label' + Data[key].id;
        pdiv.onclick = () => {
          localStorage.setItem('keyid', key);
          window.location.href = 'product.html';
        };
        searchItemContainer.appendChild(pdiv);

        let img = document.createElement('img');
        img.src = Data[key].source;
        pdiv.appendChild(img);

        let div2 = document.createElement('div');
        div2.className = 'description';
        pdiv.appendChild(div2);

        let span = document.createElement('span');
        span.innerHTML = 'DreamiKAI Label';
        div2.appendChild(span);

        let name = document.createElement('h5');
        name.innerHTML = Data[key].name;
        div2.appendChild(name);

        let div3 = document.createElement('div');
        div3.className = 'star';
        for (let i = 0; i < 5; i++) {
          let star = document.createElement('i');
          star.className = 'fas fa-star';
          div3.appendChild(star);
        }
        div2.appendChild(div3);

        let price = document.createElement('h4');
        price.innerHTML = "Rs." + Data[key].price;
        div2.appendChild(price);

        let cart = document.createElement('a');
        let cartsymbol = document.createElement('i');
        cartsymbol.className = 'fa-solid fa-cart-shopping';
        cart.appendChild(cartsymbol);
        cart.href = "#";
        pdiv.appendChild(cart);
      }
    });
  });
}

