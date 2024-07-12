attribute vec3 aPosition; // (x,y,z)
  attribute vec4 aColor; // (r,g,b,a)
  attribute vec2 aTexCoord; // (u,v)

  varying vec2 vTexCoord;
  varying vec4 vColor;
  varying vec2 pos;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    vec4 project = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    gl_Position = project;
    pos = project.xy; // Pass the position to the fragment shader
    vColor = aColor;
    vTexCoord = aTexCoord;
  }