(()=>{const t=(t,e)=>new Promise((o=>{let s;window.XMLHttpRequest?s=new XMLHttpRequest:window.ActiveXObject&&(s=new ActiveXObject("Microsoft.XMLHTTP")),s.onreadystatechange=function(){4===s.readyState&&(console.log(s.response),o(s.responseText))},s.open("POST",t,!0),s.setRequestHeader("Content-Type","application/json");const a=JSON.stringify(e);console.log(a),s.send(a)}));new Vue({el:"#app",data:{allGoods:[],filteredGoods:[],searchLine:"",cartGoods:[],isVisibleCart:!1},methods:{filter(t){this.filteredGoods=t?this.allGoods.filter((e=>e.product_name.toLowerCase().includes(t.toLowerCase()))):this.allGoods},addToCart(e){console.log("TEST"),t("/addToCart",e).then((t=>this.cartGoods.push(e)))},removeFromCart(e){t("/removeFromCart",this.cartGoods[e]).then((t=>this.cartGoods=[...this.cartGoods.slice(0,e),...this.cartGoods.slice(e+1)]))},async getBasket(){this.isVisibleCart=!this.isVisibleCart,await fetch("/basket").then((t=>t.json())).then((t=>{this.cartGoods=t}))}},mounted:async function(){return await fetch("/catalog").then((t=>t.json())).then((t=>{this.allGoods=t,this.filteredGoods=t}))}})})();