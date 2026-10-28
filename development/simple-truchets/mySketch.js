let hexSize; //size of each hexagon

let totalHexW = 13; //total hexagons width-wise
let totalHexH; //total hexagons height-wise

let i, j, a, b, c, x, y; //vars for geometry
let n1, n2; //noise variables

let rez1 = 0.001; //type of tile
let rez2 = 0.001; //rotation of tile

let indigoLight;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(8, 14, 51); //indigo background
	
	hexSize = width / totalHexW;
	
	angleMode(RADIANS);
	rectMode(CENTER);
	noFill();
	strokeWeight(3);
	
	indigoLight = color(74, 121, 234);
}

function createTiles(){
	a = hexSize / 2;
	b = a * tan(PI/6);
	c = sqrt(a**2 + b**2);
	d = (b + c) / 2;
	
	totalHexH = height/(2 * b + 2 * c);
	
	for (i = 0; i < totalHexW+1; i++) { //draws main rows from top of page
		for (j = 0; j < totalHexH; j++) {
			push();
			
			x = i * hexSize; //curent x position
			y = j * (2 * b + 2 * c); //how far to the next tile
			
			translate(x, y);
			
			n1 = noise(x*rez1, y*rez1)-0.2;
      n2 = noise(x*rez2+10000, y*rez2+10000)-0.2;
			
			// drawHex();
      drawCurve();
			drawStaggeredLines();
      pop();
		}
	}
	
	for (i = 0; i < totalHexW+1; i++) { //draws alternating rows
		for (j = 0; j < totalHexH; j++) {
      push();
      x = i * hexSize + a;
      y = j * (c * 2 + b * 2) + b + c;
      translate(x,y);
      n1 = noise(x*rez1, y*rez1)-0.2;
      n2 = noise(x*rez2+10000, y*rez2+10000)-0.2;
      // drawHex();
      drawCurve();
			drawStaggeredLines();
      pop();
    }
  }
}

function draw() {
	noLoop();
	createTiles();
}

function drawCurve() {
    stroke(255);
    strokeWeight(2);
    let curveType = min(n1*10.6,5.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (curveType < 1) {
        arc(a, -b, b * 2, b * 2, PI * 0.5, PI * 1.1667);
        arc(-a, b, b * 2, b * 2, PI * 1.5, PI * 0.1667);
    }
    else if (curveType < 2) {
        line(-a, 0, a, 0);
        arc(0, -c, b * 2, b * 2, PI * 0.1667, PI * 0.8333);
    }
    else if (curveType < 3) {
        arc(a, -b, b * 2, b * 2, PI * 0.5, PI * 1.1667);
        arc(-a, b, b * 2, b * 2, PI * 1.5, PI * 0.1667);
        line(-a/2, -d, a/2, d);
    }
    else if (curveType < 4) {
        arc(0, c, b * 2, b * 2, PI * 1.1667, -PI * 0.1667);
        arc(0, -c, b * 2, b * 2, PI * 0.1667, PI * 0.8333);
    }
    else if (curveType < 5) {
        arc(-a, 0, b * 2.6, b * 4, PI * 1.67, PI * 0.33);
        arc(a, 0, b * 2.6, b * 4, PI * 0.67, PI * 1.33);
    }
    else if (curveType < 6) {
        arc(a, -b, b * 2, b * 2, PI * 0.5, PI * 1.1667);
        arc(-a, -b, b * 2, b * 2, -PI * 0.1667, PI * 0.5);
        arc(0, c, b * 2, b * 2, PI * 1.1667, -PI * 0.1667);
    }
}

function drawStaggeredLines() {
    stroke(255);
    strokeWeight(2);
		
    let lineType = min(n1*10.6,5.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (lineType < 1) {
        // Three staggered parallel lines
        line(-a, -b, a/2, 0);
        line(-a, -b+12, a/2, 12);
        line(-a, -b+24, a/2, 24);
    }
    else if (lineType < 2) {
        // Four staggered parallel lines
        line(-a/4, 0, a/2, 0);
        line(-a/4, 10, a/2, 10);
        line(-a/4, 20, a/2, 20);
        line(-a/4, 30, a/2, 30);
    }
    else if (lineType < 3) {
        // Random stopping points
        line(-a, -b, random(-a/2, a/2), random(-b/2, b/2));
        line(0, -c, random(-a/2, a/2), 0);
    }
    else if (lineType < 4) {
        // Diagonal variations
        line(-a, -b, 0, c/2);
        line(0, -c/2, a, b);
        line(-a/2, 0, a/2, c);
    }
    else if (lineType < 5) {
        // Mixed straight and diagonal
        line(-a, 0, 0, 0);
        line(0, b, a, -b);
        line(-a/2, -d, a/2, 0);
    }
    else if (lineType < 6) {
        // Partial crossings
        line(-a, -b, random(-a/3, a/3), 0);
        line(0, c, random(-a/2, a/2), 0);
        line(a, b, random(0, a), random(-b/2, b/2));
    }
}

function drawHex() {
  strokeWeight(1);
  stroke(255,0,0);
  beginShape();
  vertex(0, -c);
  vertex(a, -b);
  vertex(a, b);
  vertex(0, c);
  vertex(-a, b);
  vertex(-a, -b);
  endShape();
}

//references: 
//https://www.youtube.com/watch?v=Qwb2VYrN-us