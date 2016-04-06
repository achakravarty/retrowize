'use strict';

const IO = require('koa-socket');
const io = new IO();

io.on( 'change', ( ctx, data ) => {
  console.log('broadcasting...');
  io.broadcast('change', data);
});

class BoardIO {
  init(app){
    io.attach(app);
  }
}

module.exports = new BoardIO();
