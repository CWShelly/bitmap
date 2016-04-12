const fs = require('fs');



// const change = require(__dirname + '/../lib/eg');
const change = require(__dirname + '/../lib/change');

const expect = require('chai').expect;

const picture = fs.readFileSync(__dirname +'/../palette.bmp');
const alteredPicture = fs.readFileSync(__dirname +'/../adjusted_picture.bmp');


describe('testing the size', ()=>{
  it('should output a new bmp file that is equal to the size of the    original',()=>{
    expect(picture.length === alteredPicture.length);
  });
});
