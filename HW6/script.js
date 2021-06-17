
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
      console.log(this.searchLine);
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    buyGood(name, price) {
      console.log("buyGood");
      this.basketGoods.push({product_name: name, price: price});
    },

    btnBasket() {
      console.log(this.isVisibleCart);
      this.isVisibleCart = !this.isVisibleCart;
    },

    deleteBasketItem(good) {
      let index = this.basketGoods.indexOf(good);
      this.basketGoods = [...this.basketGoods.slice(0, index),...this.basketGoods.slice(index + 1)];
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

Vue.component('search', {
  props: ['value'],
  template: 
    `<div class="searchContainer">
      <input type="text" class="goodsSearch" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"/>
      <button class="searchButton" type="button" @click="$emit('filter')">Искать</button>
    </div>`
})

Vue.component('goods-item', {
  props: ['good'],
  template: 
    `<div class="goodsItem">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button class="buy" @click="$emit('buyGood')">Купить</button>      
    </div>`
});

Vue.component('goods-list', {
  props: ['goods', 'buyItem'],
  template: 
    `<div class="goodsList">
      <goods-item v-for="good in goods" :good="good" v-if="goods.length !== 0" @buyGood="$emit('buyItem')"></goods-item>
      <div class="emptyGoods" v-else>Нет данных</div>
    </div>`
});



Vue.component('basket', {
  props: ['basketGoods'],
  template: 
    `<div class="modalContainer">
      <button class="closeBasket" @click="$emit('closeBasket')">&times;</button>
      <h1 class="titleBasket">Корзина</h1>
      <div class="basketList" v-for="good in basketGoods" v-if="basketGoods.length !== 0">
          <h3>{{ good.product_name }}</h3>
          <p> {{ good.price }} </p>
          <button @click="$emit('delete')">Удалить</button>
      </div>
    </div>`
});


{/* <buttton class="cartButton" type="button" @click="$emit('btnBasket')">Корзина</buttton> */}