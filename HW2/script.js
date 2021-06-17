
class GoodsItem {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goodsItem"><h3>${this.title}</h3><div class="goodsImgContainer"><img src="${this.img}" class="goodsImg"></div><p>${this.price}</p><button class="btnGoodsItem" onclick="onBtnGoodsItem('${this.title}', '${this.price}')">В корзину</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150, img: "img/shirt.jpg" },
      { title: 'Socks', price: 50, img: "img/socks.jpg" },
      { title: 'Jacket', price: 350, img: "img/jacket.jpg" },
      { title: 'Shoes', price: 250, img: "img/shoes.jpg" },
      // { title: undefined, price: undefined, img: undefined }
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector('.goodsList').innerHTML = listHtml;
  }
}

class Basket {
  constructor() {
    this.goodsBasket = [];
  }
  //Для собственного интереса реализовала невозможность повторного добавления товара в корзину.
  //Позже думаю поппробовать сделать счетчик количества каждого товара.
  addItem(title, price) { 
    let item = this.goodsBasket.find(item => item.getTitle() == title);
    if(item) {
      return;
    }
    let basketItem = new BasketItem (title, price);
    this.goodsBasket.push(basketItem);
  }
  render() {
    let innerHtml = "";
    // let counter = 0;
    this.goodsBasket.forEach(good => {
      innerHtml += good.render();
      // counter += good.getPrice();
    });
    let counter = this.goodsBasket.reduce((accum, currentValue) => accum + currentValue.getPrice(), 0);

    document.getElementsByClassName("basketList")[0].innerHTML = innerHtml + `<div class="sumBasket"><p>${counter}</p></div>`;
  }
}

class BasketItem extends GoodsItem {
  constructor(title, price) {
    super(title, price);
  }
  getPrice() {
    return Number(this.price);
  }
  getTitle() {
    return this.title;
  }
  render() {
    return `<div class="basketItem"><h3>${this.title}</h3><p>${this.price}</div>`;
  }
}


let list = new GoodsList();
list.fetchGoods();
list.render();

let basketList = new Basket();


const modal = document.getElementsByClassName("modal")[0];

onBasketClick = () => {
  modal.style.display = "block";
  basketList.render();
}

onCloseBasketClick = () => {
  modal.style.display = "none";
}

onBtnGoodsItem = (title, price) => {
  basketList.addItem(title, price);
}
