const goods = [
    { title: 'Shirt', price: 150, img: "img/shirt.jpg" },
    { title: 'Socks', price: 50, img: "img/socks.jpg" },
    { title: 'Jacket', price: 350, img: "img/jacket.jpg" },
    { title: 'Shoes', price: 250, img: "img/shoes.jpg" },
    // { title: undefined, price: undefined, img: undefined }
  ];
  
  const renderGoodsItem = (title = "untitled", price = 0, img = "") => `<div class="goods-item"><h3>${title}</h3><img src="${img}" class="good-img"><p>${price}</p></div>`;
  
  const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
  }
  
  window.onload = () => renderGoodsList(goods);