'use strict';

var rS = 0;

var cCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

//adding a variable to change the alpha value, to reduce the opacity of the rectangles, allowing them to overlap
var aV = 27;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  noLoop();
  //As we are making transparent rectangles the black background makes it look nicer
  background(0);
  randomSeed(rS);

  for (var i = 0; i < cCount; i++) {
    if(i%2===0) {
      hueValues[i] = random(360);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    } else {
      hueValues[i] = 160;
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  var counter = 0;

  var rowCount = int(random(5,30));
  var rowHeight = height / rowCount;

  for(var i = 0; i <= rowCount; i++) {
    var partCount = i + 1;
    var parts = [];

    for(var ii = 0; ii < partCount;ii++) {
      if(random() < 0.075) {
        var fragments = int(random(2, 20));
        partCount = partCount + fragments;
        for(var iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2,20));
      }
    }

    var sumPartsTotal = 0;
    for(var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    var sumParts = 0;
    for(var ii = 0; ii < parts.length; ii++) {
      sumParts += parts[ii];

      var x = map(sumParts, 0, sumPartsTotal, 0, width);
      var y = rowHeight * i;
      var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
      //Make the rectangles overlap
      var h = rowHeight * 1.5;

      var index = counter % cCount;
      //We are creating gradients instead of rectangles, these start from black(same as badckground), and move to the colour we generated
      var col1 = color(0);
      var col2 = color(hueValues[index], saturationValues[index], brightnessValues[index], aV);
      gradient(x, y, w, h, col1, col2);

      counter++
    }

  }

}

//Gradient function used to create the rectangles, so they overlap and the colour moves from black to the generated colour
function gradient(x, y, w, h, c1, c2) {
  var ctx = drawingContext; // global canvas context p5.js var
  var grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
	ctx.fillStyle = grd;
	ctx.fillRect(x, y, w, h);
}

function mouseReleased() {
  rS = random(100);
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
