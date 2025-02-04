// #Genuary2025 #Genuary31
// https://genuary.art/
// Prompt: Pixel sorting

let img;
let w = 400; 
let h = 400; 

function preload() {
  img = loadImage('../assets/IMG_0431.jpeg');
}

function setup() {
  createCanvas(400, 400);

  // Resize the image so it fits on the screen. smaller number = bigger pixels.
  img.resize(300, 300);
  noSmooth();
}

function draw() {
  img.loadPixels();
  for (let i = 0; i < 20000; i++) {
    sortPixels();
  }
  img.updatePixels();

  image(img, 0, 0, width, height);
}

mouseClicked = () => {
  saveCanvas('pixel-sorting', 'png');
}

function sortPixels() {
  const x = random(img.width);
  const y = random(img.height - 1);

  // Get pixel.
  const colorOne = img.get(x, y);

  // Get the pixel below the first one.
  const colorTwo = img.get(x, y + 1);

  // Get the total R+G+B of both colors.
  const totalColorOne = red(colorOne) + green(colorOne) + blue(colorOne);
  const totalColorTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  const brightnessOne = brightness(colorOne);
  const brightnessTwo = brightness(colorTwo);

  const hueOne = hue(colorOne);
  const hueTwo = hue(colorTwo);

  if (brightnessOne < 100 &&  brightnessTwo < 100) {
    img.set(x, y, colorTwo);
    img.set(x, y + 1, colorOne);
  }
}
