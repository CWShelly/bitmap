'use strict';
const fs = require('fs');
// let bitmap = fs.readFileSync(__dirname + '/duck.bmp');
let bitmap = fs.readFileSync(__dirname + '/' + process.argv[2]);


let bitmapData = {};
bitmapData.headField = bitmap.toString('ascii',0,2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArrayStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.thing = 'yes';
bitmapData.compressionMethod = bitmap.readUInt32LE(30);
bitmapData.maybeColors = bitmap.readUInt32LE(46);
bitmapData.height = bitmap.readUInt32LE(22);
bitmapData.width = bitmap.readUInt32LE(18);
bitmapData.bpp = bitmap.readUInt32LE(28);
bitmapData.theSize= bitmap.readUInt32LE(34);
bitmapData.vip = bitmap.readUInt32LE(54);

console.dir(bitmapData);
console.log(bitmap[1078]);
console.log(bitmap[1080]);

// fs.writeFileSync('x.bmp', bitmap);
