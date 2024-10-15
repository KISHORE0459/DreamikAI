var open = 1;
document.getElementById('menubar').addEventListener('click',()=>{
    if(open%2!=0){
        document.getElementById('nav1').style.display="flex";
        document.getElementById('menubar').style.backgroundColor='rgb(175, 175, 219)';
        open +=1
    }
    else{
        document.getElementById('nav1').style.display="none";
        document.getElementById('menubar').style.backgroundColor='white'
        open+=1
    }
})

document.getElementById('other_product').addEventListener('click',()=>{
    if(!document.getElementById('list_products').checkVisibility()){
        document.getElementById('list_products').style.display='block';
    }
    else{
        document.getElementById('list_products').style.display='none';
    }
})

document.getElementById('other_product_m').addEventListener('click',()=>{
    if(!document.getElementById('list_products_m').checkVisibility()){
        document.getElementById('list_products_m').style.display='block';
    }
    else{
        document.getElementById('list_products_m').style.display='none';
    }
})