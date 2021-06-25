const fs = require('fs');

const catalog = (req, res) => fs.readFile('./catalog.json', (err, data) => {
        if (err) {
          throw Error(err);
        } else {
          res.send(data);
        }
});

const basket = (req, res) => fs.readFile('./cart.json', (err, data) => {
    if (err) {
      throw Error(err);
    } else {
      res.send(data);
    }
});

const removeFromCart = (req, res) => fs.readFile('cart.json', 'utf8', (err, data) => {
    var carts = JSON.parse(data);
    const item = req.body;
    var index = carts.findIndex(prod => prod.product_name === item.product_name);
    if(index > -1) {
    carts = [...carts.slice(0, index), ...carts.slice(index+1)];
    fs.writeFile('cart.json', JSON.stringify(carts), (err) => {
      if (!err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1, "error": err}');
      }
    });
  } else {
    res.send('{"result": 1}')
  }
});

const addToCart = (req, res) => fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      
      cart.push(item);

      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (!err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1, "error": err}');
        }
      });
    }
});

export default {
    catalog: catalog,
    basket: basket,
    removeFromCart: removeFromCart,
    addToCart: addToCart
}
