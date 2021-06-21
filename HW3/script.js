const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
  return new Promise((response, reject) => {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.responseText !== null) {
          response(xhr.responseText);
        } else {
          reject("error");
        }
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
  });
}



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
    return makeGETRequest(`${API_URL}/catalogData.json`)
    .then ((goods) => {
      this.goods = JSON.parse(goods);
    })
    .catch((string) => {
      console.log(string);
    });
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goodsList').innerHTML = listHtml;
  }
}

class Basket {
  constructor() {
    this.goodsBasket = [];
    this.counter = 0;
  }

  fetchBasket() {
    makeGETRequest(`${API_URL}/getBasket.json`)
    .then((good) => {
      let rawBasket = JSON.parse(good);
      this.counter = rawBasket.countGoods;
      this.goodsBasket = rawBasket.contents;
      this.amount = rawBasket.amount;
      this.render();
    })
    .catch(() => console.log("error"));
  }
  render() {
    let innerHtml = '';
    this.goodsBasket.forEach(item => {
      innerHtml += new BasketItem(item.product_name, item.price).render();
    });
    document.getElementsByClassName("basketList")[0].innerHTML = innerHtml + `<div class="sumBasket"><p>${this.counter}</p><p>${this.amount}</p></div>`;
  }
  addItem() {
    //Добавление элемента в корзину
  }
  removeItem() {
    //Удаление элемента из корзины
  }
}

class BasketItem extends GoodsItem {
  constructor(title, price) {
    super(title, price);
  }
  render() {
    return `<div class="basketItem"><h3>${this.title}</h3><p>${this.price}</div>`;
  }
}


let list = new GoodsList();
list.fetchGoods().then(() => list.render());


let basketList = new Basket();


const modal = document.getElementsByClassName("modal")[0];

onBasketClick = () => {
  modal.style.display = "block";
  basketList.fetchBasket();
}

onCloseBasketClick = () => {
  modal.style.display = "none";
}




