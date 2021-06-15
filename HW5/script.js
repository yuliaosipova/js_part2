
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',

  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    searchLine: '',
    isVisibleCart: false,
  },

  methods: {
    makeGETRequest(url) {
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
    },

    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    buyGood(name, price) {
      this.basketGoods.push({product_name: name, price: price});
    },

    btnBasket() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`).then ((goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = this.goods;
    }).catch((string) => {
      console.log(string);
    });
  }
});

