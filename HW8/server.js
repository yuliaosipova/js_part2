
import handlers from './server_handlers'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalog', handlers.catalog);

app.get('/basket', handlers.basket);

app.post('/removeFromCart', handlers.removeFromCart);

app.post('/addToCart', handlers.addToCart);

app.listen(4200, () => { console.log('express server started on 4200 port') });