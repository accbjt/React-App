import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom';
import { match, RouterContext } from 'react-dom';

const app = new Express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(Express.static(__dirname + '/build'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

app.listen(8080, function(){
  console.log('working');
});
