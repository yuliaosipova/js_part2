const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (err, data) => {
  if (err) {
    throw Error('Error reading file');
  }

  const text = JSON.parse(data);
  text.third = 'THREE';

  fs.writeFile('./data.json', JSON.stringify({key: 'value'}), (err) => {
    if (err) {
      throw Error('Error writing file');
    }
  })
});