'use strict'

const IO = require('koa-socket');
const io = new IO();

io.on( 'card-created', ( ctx, data ) => {
  console.log('card-created', data);
})

class BoardIO {

  init(app){
    io.attach(app);
  }

}

module.exports = new BoardIO();
