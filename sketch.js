let img;
let sqs = [];
let lastThreshold = -1;
let fileInput;
let thresholdSlider;
let thresholdDisplay;

function preload() {
  img = loadImage('data/1.jpg');
}

function setup() {
  createCanvas(1000, 1000);
  img.resize(width, height);

  // Create file input for easy image changing
  fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  // Create slider for threshold control
  thresholdSlider = createSlider(5, 50, 25, 1);
  thresholdSlider.position(10, 40);
  thresholdSlider.style('width', '200px');

  // Create threshold display
  thresholdDisplay = createP('Threshold: 25');
  thresholdDisplay.position(220, 25);
  thresholdDisplay.style('color', 'white');
  thresholdDisplay.style('background-color', 'rgba(0,0,0,0.7)');
  thresholdDisplay.style('padding', '5px');

  // Initial calculation
  calculateQuadtree(thresholdSlider.value());
}

function draw() {
  let threshold = thresholdSlider.value();

  // Only recalculate if threshold changed
  if (threshold !== lastThreshold) {
    calculateQuadtree(threshold);
    lastThreshold = threshold;
    thresholdDisplay.html('Threshold: ' + threshold);
  }

  // Just draw the cached squares
  for (let i = 0; i < sqs.length; i++) {
    let s = sqs[i];
    fill(s.c);
    noStroke();
    rect(s.x, s.y, s.w, s.h);
  }
}

function calculateQuadtree(threshold) {
  sqs = [];
  img.loadPixels(); // Load pixels once before processing
  adaptiveSubdivision(0, 0, width, height, threshold);
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      img.resize(width, height);
      calculateQuadtree(thresholdSlider.value());
    });
  }
}

// Square class
class Square {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
}

// Adaptive subdivision function
function adaptiveSubdivision(x, y, w, h, threshold) {
  let avgColor = getAverageColor(x, y, w, h);
  let variation = getColorVariation(x, y, w, h, avgColor);

  if (variation > threshold && w > 6 && h > 6) {
    let halfW = w / 2;
    let halfH = h / 2;

    adaptiveSubdivision(x, y, halfW, halfH, threshold);
    adaptiveSubdivision(x + halfW, y, halfW, halfH, threshold);
    adaptiveSubdivision(x, y + halfH, halfW, halfH, threshold);
    adaptiveSubdivision(x + halfW, y + halfH, halfW, halfH, threshold);
  } else {
    sqs.push(new Square(x, y, w, h, avgColor));
  }
}

// Get average color of a region
function getAverageColor(x, y, w, h) {
  let rSum = 0, gSum = 0, bSum = 0;
  let count = 0;

  // Pixels already loaded in calculateQuadtree()
  for (let i = int(x); i < x + w; i++) {
    for (let j = int(y); j < y + h; j++) {
      if (i < img.width && j < img.height) {
        let index = (i + j * img.width) * 4;
        rSum += img.pixels[index];
        gSum += img.pixels[index + 1];
        bSum += img.pixels[index + 2];
        count++;
      }
    }
  }

  return color(rSum / count, gSum / count, bSum / count);
}

// Get color variation in a region
function getColorVariation(x, y, w, h, avgColor) {
  let variation = 0;

  // Pixels already loaded in calculateQuadtree()
  let avgR = red(avgColor);
  let avgG = green(avgColor);
  let avgB = blue(avgColor);

  for (let i = int(x); i < x + w; i++) {
    for (let j = int(y); j < y + h; j++) {
      if (i < img.width && j < img.height) {
        let index = (i + j * img.width) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        variation += dist(r, g, b, avgR, avgG, avgB);
      }
    }
  }

  return variation / (w * h);
}
