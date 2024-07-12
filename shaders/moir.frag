 precision mediump float;

  varying vec2 pos;
  varying vec2 vTexCoord;
  varying vec4 vColor;

  uniform float stripeWidth;
  uniform vec2 offset; // Additional offset to create the moiré effect

  void main() {
    // Create stripes based on the x-coordinate with an additional offset
    float stripe = mod(floor((pos.x + offset.x) / stripeWidth), 2.0);
    vec4 color = mix(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0), stripe); // White is transparent, black is opaque
    gl_FragColor = color * vColor; // Apply the color
  }