
const fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/' + process.argv[2]);


var bitmapData = {};
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
console.log(bitmap.readUInt32LE(2));
var colors ={};


colors.getTheColors = function(){
  for (var i = 54; i<74; i++){
    console.log('colors: ' + bitmap[i]);
  };
};

colors.alterColors = function(){
  var x = bitmap[58];
  for (var i = 58; i<1078; i=i+3){
    bitmap[i] = x;
    return bitmap;
  };
};

colors.getTheColors();

colors.changeTheColors = function(){
  for(var i = 58;i<1078; i=i+3){
    bitmap.writeUInt32LE(255, i++);
    console.log('break');
    // colors.getTheColors();
    colors.alterColors();
    colors.getTheColors();
    return(bitmap);
  };

};

colors.changeTheColors();
fs.writeFile('adjusted_image2.bmp', bitmap, (err)=>{
  if (err) throw err;
  console.log('done');
});
