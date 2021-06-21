const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalog', (req, res) => {
  fs.readFile('./catalog.json', (err, data) => {
    if (err) {
      throw Error(err);
    } else {
      res.send(data);
    }
  })
});

app.get('/basket', (req, res) => {
  fs.readFile('./cart.json', (err, data) => {
    if (err) {
      throw Error(err);
    } else {
      res.send(data);
    }
  })
});

app.post('/removeFromCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
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
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
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
});

app.listen(4200, () => { console.log('express server started on 4200 port') });