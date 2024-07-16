precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uBlurSize;

void main() {
  vec2 tex_offset = 1.0 / uResolution; // gets size of single texel
  vec4 color = vec4(0.0);

  // Gaussian kernel weights
  float kernel[9];
  kernel[0] = 1.0 / 16.0;
  kernel[1] = 2.0 / 16.0;
  kernel[2] = 1.0 / 16.0;
  kernel[3] = 2.0 / 16.0;
  kernel[4] = 4.0 / 16.0;
  kernel[5] = 2.0 / 16.0;
  kernel[6] = 1.0 / 16.0;
  kernel[7] = 2.0 / 16.0;
  kernel[8] = 1.0 / 16.0;

  // sample from texture offsets
  for (int i = -1; i <= 1; i++) {
    for (int j = -1; j <= 1; j++) {
      vec2 offset = vec2(float(i), float(j)) * uBlurSize * tex_offset;
      color += texture2D(uSampler, vTexCoord + offset) * kernel[(i+1) * 3 + (j+1)];
    }
  }

  gl_FragColor = color;
}
