let poem, poet;
let s = `since feeling is first
who pays any attention 
to the syntax of things
will never wholly kiss you;

wholly to be a fool
while Spring is in the world

my blood approves,
and kisses are a better fate 
than wisdom
lady i swear by all flowers. Don't cry
—the best gesture of my brain is less than
your eyelids' flutter which says

we are for each other: then
laugh, leaning back in my arms
for life's not a paragraph

And death i think is no parenthesis`;

n = "—E.E. Cummings";

function setup() {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER);
  textFont('Courier New');
  describe("[since feeling is first], by E.E. Cummings, revealed slowly from a string of random characters.");
  fill(255);
  noStroke();
  textSize(height / 30);
  poem = new CypherText(s, width / 2, height / 2,  width * 0.9, height * 0.9);
  poet = new CypherText(n, width * 0.75, height, width * 0.5, height * 0.2);
}

function draw() {
  background("#0F2027");
  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  rect(width / 2, height / 2, width * 0.95, height * 0.95);
  pop();
  poem.generateGuess();
  poem.print();
  if (poem.isSorted()) {
    poet.generateGuess();
    poet.print();
  }
}

class CypherText {
  constructor(str, cx, cy, w ,h) {
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.chars = str.split("");
    this.currentChars = [];
    this.alphabet = this.chars.filter((char) => char !== "\n");
    this.sorted = false;
    this.chars.map((char) => {
      if (char !== "\n") {
        this.currentChars.push(this.alphabet[Math.floor(Math.random() * this.alphabet.length)]);
      } else 
       this.currentChars.push(char);
    });
  }

  isSorted() {
    return this.sorted;
  }

  generateGuess() {
    if (!this.sorted) {
      let sortCount = 0;
      this.currentChars.map((char, i) => {
        if (char !== "\n" && char !== this.chars[i]) {
          this.currentChars[i] = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
        } else {
          sortCount++;
        }
      });
      if (sortCount === this.chars.length) {
        this.sorted = true;
      }
    }
  }

  print() {
    text(this.currentChars.join(""), this.cx, this.cy, this.w, this.h);
  }
}