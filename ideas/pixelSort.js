// #Genuary2025 #Genuary31
// https://genuary.art/
// Prompt: Pixel sorting

let img;
let w = 400; 
let h = 400; 

function preload() {
  // img = loadImage(`https://picsum.photos/id/${Math.floor(random(1, 500))}/${w}/${h}`);
  img = loadImage('../assets/IMG_0431.jpeg');
}

function setup() {
  createCanvas(400, 400);

  // Resize the image so it fits on the screen.
  // We make it 100x100 so we can see individual pixels.
  img.resize(300, 300);

  noSmooth();
}

function draw() {
  img.loadPixels();

  // Loop 100 times to speed up the animation.
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
  // Get a random pixel.
  const x = random(img.width);
  const y = random(img.height - 1);

  // Get the color of the pixel.
  const colorOne = img.get(x, y);

  // Get the color of the pixel below the first one.
  const colorTwo = img.get(x, y + 1);

  // Get the total R+G+B of both colors.
  const totalOne = red(colorOne) + green(colorOne) + blue(colorOne);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  const brightnessOne = brightness(colorOne);
  const brightnessTwo = brightness(colorTwo);

  const hueOne = hue(colorOne);
  const hueTwo = hue(colorTwo);

  // If the first total is less than the second total, swap the pixels.
  // This causes darker colors to fall to the bottom,
  // and light pixels to rise to the top.
  if (brightnessOne < 100 &&  brightnessTwo < 100) {
    img.set(x, y, colorTwo);
    img.set(x, y + 1, colorOne);
  }
}
