
const fs = require('fs');
//
// const bitmap = fs.readFileSync(__dirname + '/../' + process.argv[2]);
//
const bitmap = fs.readFileSync(__dirname + '/../palette.bmp');

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

var colors ={};


colors.getTheColors = function(){
  for (var i = 58; i<68; i++){
    console.log('colors: ' + bitmap[i]);

  };

};


// colors.getTheColors();

colors.alter = function(){
  for(var i = 0; i<1024; i+=4){
    var offSet = 54 + i;

    var blue = bitmap.readUInt8(offSet);
    var green = bitmap.readUInt8(offSet + 1);
    var red = bitmap.readUInt8(offSet + 2);
    // var alph = bitmap.readUInt8(i=i+3);

    bitmap.writeUInt8(255 - blue, offSet);
    bitmap.writeUInt8(255 - green, offSet+1);
    bitmap.writeUInt8(255 - red, offSet+2);

  };

  // colors.getTheColors();

};


colors.grey = function(){
  for(var i = 54; i<1078;i=i+4){
    var blue = bitmap.readUInt8(i);
    var green = bitmap.readUInt8(i=i+1);
    var red = bitmap.readUInt8(i=i+2);
    var mean = (blue + green + red) /3;

    bitmap.writeUInt8(mean, i);
    bitmap.writeUInt8(mean, i=i+1);
    bitmap.writeUInt8(mean, i=i+2);
    bitmap.writeUInt8(mean, i=i+3);

  };
  colors.getTheColors();
  console.log(green);
};


colors.alter();
// colors.grey();


fs.writeFile('adjusted_picture.bmp', bitmap, (err)=>{
  if (err) throw err;
  console.log('new file has been created');
});
