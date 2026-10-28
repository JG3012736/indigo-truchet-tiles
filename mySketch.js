let hexSize; //size of each hexagon
let largeHexSize; //size of the large containing hexagon
let n = 3; //number of small hexagons across the large hexagon

let i, j, a, b, c, x, y; //vars for geometry
let n1, n2; //noise variables

let rez1 = 0.001; //type of tile
let rez2 = 0.001; //rotation of tile

let indigoLight;
let clipGraphics;

function setup() {
    // Explicitly specify SVG renderer
    let canvas = createCanvas(800, 800, SVG);
    
    // Set initial values
    largeHexSize = min(width, height) * 0.9;
    hexSize = largeHexSize / (n * 2);
    
    // Calculate hexagon geometry
    a = hexSize / 2;
    b = a * tan(PI/6);
    c = sqrt(a**2 + b**2);
    
    angleMode(RADIANS);
    rectMode(CENTER);
    noFill();
    strokeWeight(3);
    indigoLight = color(74, 121, 234);
    
    // Remove clipGraphics as it's not needed for SVG
    background(8, 14, 51);
}

function draw() {
    // Draw only once
    noLoop();
    
    push();
    translate(width/2, height/2);
    
    // Draw the tiles directly without masking
    let rowCount = ceil(n * 1.2);
    for (let row = -rowCount; row <= rowCount; row++) {
        let rowWidth = n - abs(row/2);
        for (let col = -rowWidth; col <= rowWidth; col++) {
            let x = col * (hexSize * 1.5);
            let y = row * (c + b);
            
            if (isPointInHex(x, y, largeHexSize/2)) {
                push();
                translate(x, y);
                n1 = noise(x*rez1, y*rez1)-0.2;
                n2 = noise(x*rez2+10000, y*rez2+10000)-0.2;
                drawCurve();
                drawStaggeredLines(125);
                drawStaggeredLines(75);
                pop();
            }
        }
    }
    
    // Draw the outer boundary
    stroke(255, 50);
    strokeWeight(2);
    drawLargeHex();
    
    pop();
}

function createTiles() {
    background(8, 14, 51);
    
    push();
    translate(width/2, height/2);
    
    // Draw the large hexagon boundary first
    stroke(255, 50);
    strokeWeight(2);
    drawLargeHex();
    
    // Calculate bounds for perfect tiling
    let rowCount = ceil(n * 1.2);
    
    // Use SVG clipPath for masking
    let clipId = "hexClip";
    let svg = document.querySelector("svg");
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("id", clipId);
    
    // Add the clipping path
    let clipHex = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = createHexPath(largeHexSize/2);
    clipHex.setAttribute("d", pathData);
    clipPath.appendChild(clipHex);
    defs.appendChild(clipPath);
    svg.appendChild(defs);
    
    // Create a group for the patterns and apply the clip-path
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("clip-path", `url(#${clipId})`);
    svg.appendChild(g);
    
    // Draw the patterns
    for (let row = -rowCount; row <= rowCount; row++) {
        let rowWidth = n - abs(row/2);
        for (let col = -rowWidth; col <= rowWidth; col++) {
            let x = col * (hexSize * 1.5);
            let y = row * (c + b);
            
            if (isPointInHex(x, y, largeHexSize/2)) {
                push();
                translate(x, y);
                n1 = noise(x*rez1, y*rez1)-0.2;
                n2 = noise(x*rez2+10000, y*rez2+10000)-0.2;
                drawCurve();
                drawStaggeredLines(125);
                drawStaggeredLines(75);
                pop();
            }
        }
    }
    
    pop();
}

function isPointInHex(px, py, size) {
    let q = (sqrt(3)/3 * px - 1/3 * py) / size;
    let r = (2/3 * py) / size;
    let s = -q - r;
    return (abs(q) <= 1 && abs(r) <= 1 && abs(s) <= 1);
}

function drawLargeHex() {
    let R = largeHexSize/2;
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = i * PI/3;
        vertex(R * cos(angle), R * sin(angle));
    }
    endShape(CLOSE);
}

function drawLargeHexOnMask(g) {
    let R = largeHexSize/2;
    g.beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = i * PI/3;
        g.vertex(R * cos(angle), R * sin(angle));
    }
    g.endShape(CLOSE);
}

function drawCurve() {
    stroke(255, 125);
    strokeWeight(3);
    let curveType = min(n1*10.6,5.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (curveType < 1) {
        // Heart pattern with overlapping arcs
        for (let i = 0; i < 3; i++) {
            push();
            rotate(i * PI/3);
            arc(-b, 0, b*2, b*2, 0, PI*2/3, CHORD);
            arc(b, 0, b*2, b*2, PI*4/3, TWO_PI, CHORD);
            pop();
        }
        // Central flower pattern
        for (let i = 0; i < 6; i++) {
            push();
            rotate(i * PI/3);
            arc(0, b/2, b, b, 0, PI);
            pop();
        }
    }
    else if (curveType < 2) {
        // Overlapping star pattern with central flower
        for (let i = 0; i < 4; i++) {
            push();
            rotate(i * PI/2);
            arc(a, 0, b*2, b*2, PI*0.8, PI*1.7);
            circle(0, a, b*0.5);
            pop();
        }
        // Diamond enclosure
        beginShape();
        vertex(0, -b*1.5);
        vertex(b*1.5, 0);
        vertex(0, b*1.5);
        vertex(-b*1.5, 0);
        endShape(CLOSE);
    }
    else if (curveType < 3) {
        // Flower pattern with overlapping ellipses
        for (let i = 0; i < 6; i++) {
            push();
            rotate(i * PI/3);
            ellipse(0, -b/2, b*0.2, b*0.5);
            ellipse(0, b/2, b*0.2, b*0.5);
            arc(a, -b, b*2, b*2, PI*0.5, PI);
            arc(-a, b, b*2, b*2, -PI*0.5, 0);
            pop();
        }
    }
    else if (curveType < 4) {
        // Mandala pattern with overlapping arcs
        for (let i = 0; i < 8; i++) {
            push();
            rotate(i * PI/4);
            arc(0, -c, a*1.5, b*2, 0, PI);
            arc(0, c, a*1.5, b*2, PI, TWO_PI);
            pop();
        }
        // Diamond frame
        quad(-a, -a, 0, -b*1.5, a, -a, 0, 0);
        quad(-a, a, 0, b*1.5, a, a, 0, 0);
    }
    else {
        // Star burst with heart patterns
        for (let i = 0; i < 6; i++) {
            push();
            rotate(i * PI/3);
            line(-a, 0, 0, 0);
            arc(0, 0, a*2, a*2, -PI*0.5, PI*0.5);
            arc(a, 0, b*2, b*2, -PI/2, PI/2);
            // Additional heart shape
            arc(a/2, -b/4, b, b, 0, PI);
            arc(a/2, -b/4, b, b, PI, TWO_PI);
            pop();
        }
    }
}

function drawStaggeredLines(alpha) {
    stroke(255, alpha);
    strokeWeight(3);
    let lineType = min(n1*10.6,6.3);
    rotate(floor(n2*12)*(PI/3));
    
    if (lineType < 1) {
        // Overlapping flower patterns
        for (let i = 0; i < 4; i++) {
            push();
						// stroke(255, 105);
            rotate(i * PI/2);
            beginShape();
            vertex(-b*1.2, -b/2);
            bezierVertex(-b, -b/4, b, -b/4, b*1.2, -b/2);
            endShape();
            beginShape();
            vertex(-b*1.2, b/2);
            bezierVertex(-b, b/4, b, b/4, b*1.2, b/2);
            endShape();
            pop();
        }
    }
    else if (lineType < 2) {
        // Layered circular patterns
        for (let i = 0; i < 3; i++) {
            push();
						// stroke(255, 85);
            rotate(i * TWO_PI/3);
            noFill();
            arc(a, 0, b*2.5, b*2.5, PI*0.8, PI*1.7);
            circle(0, a, b*0.8);
            beginShape();
            for(let t = 0; t <= 1; t += 0.1) {
                let x = lerp(-a, a, t);
                let y = sin(t * PI) * b/2;
                vertex(x, y);
            }
            endShape();
            pop();
        }
    }
    else if (lineType < 3) {
        // Diamond-enclosed star pattern
        for (let i = 0; i < 6; i++) {
            push();
            rotate(i * PI/3);
            beginShape();
            for(let t = -PI/2; t <= PI/2; t += PI/12) {
                let x = cos(t) * b;
                let y = sin(t) * b * 1.5;
                vertex(x, y);
            }
            endShape();
            line(-a, -b, a, b);
            line(-a, b, a, -b);
            pop();
        }
        // Diamond frame
        quad(-b, 0, 0, -b, b, 0, 0, b);
    }
    else if (lineType < 4) {
        // Overlapping wave patterns
        for (let i = 0; i < 4; i++) {
            push();
            rotate(i * PI/2);
            beginShape();
            for(let t = 0; t <= PI; t += PI/12) {
                let x = cos(t) * a;
                let y = sin(t*2) * b/2;
                vertex(x, y);
            }
            endShape();
            pop();
        }
    }
    else if (lineType < 5) {
        // Complex radial pattern
        for(let i = 0; i < 6; i++) {
            push();
            rotate(i * PI/3);
            beginShape();
            for(let t = 0; t < PI; t += PI/12) {
                let r = map(t, 0, PI, a, a/3);
                let x = cos(t) * r;
                let y = sin(t) * r;
                vertex(x, y);
            }
            endShape();
            // Additional flower pattern
            arc(0, a/2, b/2, b/2, 0, PI);
            arc(0, -a/2, b/2, b/2, PI, TWO_PI);
            pop();
        }
    }
    else {
        // Enhanced star pattern with heart shapes
        for(let i = 0; i < 8; i++) {
            push();
            rotate(i * PI/4);
            line(0, 0, a/2, 0);
            arc(a/2, 0, b, b, PI*0.8, PI*1.2);
            // Additional heart pattern
            arc(a/3, -b/6, b/2, b/2, 0, PI);
            arc(a/3, -b/6, b/2, b/2, PI, TWO_PI);
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

// Helper function to create SVG path data for hexagon
function createHexPath(R) {
    let points = [];
    for (let i = 0; i < 6; i++) {
        let angle = i * PI/3;
        points.push(`${R * cos(angle)},${R * sin(angle)}`);
    }s
    return `M${points.join('L')}Z`;
}

// Save the SVG
function keyPressed() {
    if (key === 's' || key === 'S') {
        save('myPattern.svg');
    }
}

//references: 
//https://www.youtube.com/watch?v=Qwb2VYrN-us
//Perplexity Pro