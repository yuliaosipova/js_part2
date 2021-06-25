//const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const postResponse = (url, data) => {
  return new Promise((resolve) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.response);
        resolve(xhr.responseText);
      }
    }
  
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const json = JSON.stringify(data);
    console.log(json);
    xhr.send(json);
  });
}

const app = new Vue({
  el: '#app',
  data: {
    allGoods: [],
    filteredGoods: [],
    searchLine: '',
    cartGoods: [],
    isVisibleCart: false

  },
  methods: {
    filter(searchLine) {
      this.filteredGoods = searchLine ?
        this.allGoods.filter(product => product.product_name.toLowerCase().includes(searchLine.toLowerCase())) :
        this.allGoods;
    },
    addToCart(prod) {
      console.log('TEST');
      postResponse('/addToCart', prod).then(resp => this.cartGoods.push(prod));
    },
    removeFromCart(index) {
      postResponse('/removeFromCart', this.cartGoods[index])
      .then(respt => this.cartGoods = [...this.cartGoods.slice(0, index), ...this.cartGoods.slice(index+1)]);
    },
    async getBasket() {
      this.isVisibleCart=!this.isVisibleCart;
      await fetch('/basket')
      .then(resp => resp.json())
      .then(data => {
        this.cartGoods = data;
      });
    }
  },
  mounted: async function fetchGoods() {
    return await fetch(`/catalog`)
      .then(resp => resp.json())
      .then(data => {
        this.allGoods = data;
        this.filteredGoods = data;
      });
  },
});