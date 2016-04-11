
const fs = require('fs');
const bitmap = fs.readFileSync(__dirname + '/../' + process.argv[2]);

const bitmapData = module.exports = exports = {};
bitmapData.headField = bitmap.toString('ascii',0,2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArrayStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.compressionMethod = bitmap.readUInt32LE(30);
bitmapData.maybeColors = bitmap.readUInt32LE(46);
bitmapData.height = bitmap.readUInt32LE(22);
bitmapData.width = bitmap.readUInt32LE(18);
bitmapData.bpp = bitmap.readUInt32LE(28);
bitmapData.theSize= bitmap.readUInt32LE(34);
bitmapData.vip = bitmap.readUInt32LE(54);

console.dir(bitmapData);

const colorData = module.exports = exports = {};
var colors ={};


colors.getTheColors = function(){
  for (var i = 58; i<68; i++){
    console.log('colors: ' + bitmap[i]);
  };
};


colors.getTheColors();

colors.alter = function(){
  for(var i = 54; i<1078;i= i+4){
    var blue = bitmap.readUInt8(i);
    // var blue2 = bitmap.readUInt32LE(i);
    var green = bitmap.readUInt8(i=i+1);
    var red = bitmap.readUInt8(i=i+2);
    var alph = bitmap.readUInt8(i=i+3);
  //

    bitmap.writeUInt32LE((255 - bitmap.readUInt8(i)), i);
    // bitmap.writeUInt32LE((255 - bitmap.readUInt8(i)), 61);
    bitmap.writeUInt32LE((255 - bitmap.readUInt8(i=i+2)), i=i+1);
    bitmap.writeUInt32LE(255 - red, i=i+2);
    bitmap.writeUInt32LE(255 - alph, i=i+3);
    bitmap.writeUInt8(255 - (bitmap.readUInt8(i)), i);

    // bitmap.writeUInt8(255 - (bitmap.readUInt8(i)), i=i+1);


  };
  //  bitmap.writeUInt32LE(255 - blue, i);
  //   bitmap.writeUInt32LE(255 - green, i=i+1);
  //   bitmap.writeUInt32LE(255 - red, i=i+2);
  //   bitmap.writeUInt32LE(255 - alph, i=i+3);
  console.log('break');
  console.log(bitmap.readUInt8(i));
  console.log(bitmap[i=i+3]);
  console.log('red: ', red);
  console.log('blue: ', blue);
  // console.log('reds: ', (255 - (bitmap.readUInt8(i=i+1))));
  console.log(bitmap.readUInt8(i+2));
  / // console.log('blue2: ', 255 - (bitmap.readUInt32LE(i)));
  // console.log('greens: ', 255 - (bitmap.readUInt8(i+1)));
  colors.getTheColors();

};


colors.grey = function(){
  for(var i = 54; i<1078;i=i+4){
    var blue = bitmap.readUInt8(i);
    var green = bitmap.readUInt8(i=i+1);
    var red = bitmap.readUInt8(i=i+2);

      // var blue = 140;
      // var green =140;
      // var red = 140;
      // var alph = bitmap.readUInt8(i=i+3);

    var mean = (blue + green + red) /3;

    bitmap.writeUInt32LE(mean, i);
    bitmap.writeUInt32LE(mean, i=i+1);
    bitmap.writeUInt32LE(mean, i=i+2);
    bitmap.writeUInt32LE(mean, i=i+3);
      // // //
      // bitmap.writeUInt8(mean, i);
      // bitmap.writeUInt8(mean, i=i+1);
      // bitmap.writeUInt8(mean, i=i+2);
      // bitmap.writeUInt8(mean, i=i+3);


  };
  colors.getTheColors();
  console.log(green);
};


colors.changeTheColors = function(){
  for(var i = 58;i<1078; i=i+3){
    bitmap.writeUInt32LE(255, i+2);
    // bitmap.writeUInt32LE((bitmap[i]), i=i+1);
  };
  console.log('break');
  colors.getTheColors();
  // console.log('one thousand: ' + bitmap[89]);
};
// colors.changeTheColors();
colors.alter();
// colors.grey();

fs.writeFile('adjusted_image.bmp', bitmap, (err)=>{
  if (err) throw err;
  console.log('done');
});

const exportColor = module.exports = colors.alter();
// const alterColors = module.exports = exports = function(){
//   colors.alter();
// }
