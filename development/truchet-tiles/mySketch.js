let hexSize; //size of each hexagon

let totalHexW = 12; //total hexagons width-wise
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
	// filter(ERODE, 5);
	createTiles();
}

function drawCurve() {
    stroke(255);
    strokeWeight(2);
    let curveType = min(n1*10.6,5.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (curveType < 1) {
        // Corner arcs
        arc(a, -b, b * 1.5, b * 1.5, PI * 0.5, PI * 1.2);
        arc(-a, b, b * 1.5, b * 1.5, -PI * 0.5, PI * 0.2);
    }
    else if (curveType < 2) {
        // Edge-following arc with corner line
        arc(-a, 0, b * 2, b * 2, -PI * 0.3, PI * 0.3);
        line(a, -b, a, b);
    }
    else if (curveType < 3) {
        // Corner-to-corner arcs
        arc(a, -b, b * 2, b * 2, PI * 0.5, PI);
        arc(-a, b, b * 2, b * 2, -PI * 0.5, 0);
    }
    else if (curveType < 4) {
        // Edge-hugging curves
        arc(0, -c, a * 1.5, b * 2, 0, PI);
        arc(0, c, a * 1.5, b * 2, PI, TWO_PI);
    }
    else {
        // Tangent transition with edge arc
        line(-a, 0, 0, 0);
        arc(0, 0, a * 2, a * 2, -PI * 0.5, PI * 0.5);
    }
}

function drawStaggeredLines() {
    stroke(255, 125);
    strokeWeight(2);
    
    let lineType = min(n1*10.6,6.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (lineType < 1) {
        // Corner connections with curved path
        beginShape();
        vertex(-a, -b);
        bezierVertex(-a/2, -b/2, -a/3, b/3, 0, 0);
        bezierVertex(a/3, -b/3, a/2, -b/2, a, -b);
        endShape();
        arc(0, b/2, a, a, -PI*0.8, -PI*0.2);
    }
    else if (lineType < 2) {
        // Edge-to-edge flowing curves
        beginShape();
        for(let t = -PI; t <= 0; t += PI/8) {
            let x = cos(t) * a;
            let y = sin(t) * b + sin(t*3) * b/3;
            vertex(x, y);
        }
        endShape();
        arc(0, -b, a, a, 0, PI);
    }
    else if (lineType < 3) {
        // Complex corner pattern
        arc(-a, -b, b, b, 0, PI * 0.5);
        beginShape();
        for(let x = -a; x <= a; x += a/8) {
            let y = sin(x/a * PI) * b/2;
            vertex(x, y);
        }
        endShape();
        arc(a, b, b, b, PI, PI * 1.5);
    }
    else if (lineType < 4) {
        // Interwoven curves
        beginShape();
        for(let t = 0; t <= TWO_PI; t += PI/12) {
            let x = cos(t) * a/2;
            let y = sin(t*2) * b/2;
            vertex(x, y);
        }
        endShape();
        line(-a, -b, a, b);
    }
    else if (lineType < 5) {
        // Spiral pattern to edges
        beginShape();
        for(let t = 0; t < TWO_PI; t += PI/12) {
            let r = map(t, 0, TWO_PI, a, a/4);
            let x = cos(t) * r;
            let y = sin(t) * r;
            vertex(x, y);
        }
        endShape();
        line(-a, -b, 0, c);
        line(a, -b, 0, c);
    }
    else {
        // Complex star with curves
        for(let i = 0; i < 3; i++) {
            push();
            rotate(i * TWO_PI/3);
            beginShape();
            vertex(0, 0);
            bezierVertex(-a/4, -b/3, -a/2, -b/2, -a/3, -b/2);
            bezierVertex(-a/6, -b/2, a/6, -b/2, a/3, -b/2);
            endShape(CLOSE);
            pop();
        }
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