#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform ivec2 u_gridSize;

out vec4 fragColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  ivec2 gridPos = ivec2(gl_FragCoord.xy) * u_gridSize / ivec2(u_resolution);
  // vec2 posWithinGrid = fract(st * vec2(u_gridSize));

  int checker = (gridPos.x % 2) ^ (gridPos.y % 2);

  fragColor = vec4(vec3(float(checker)), 1.);
}
