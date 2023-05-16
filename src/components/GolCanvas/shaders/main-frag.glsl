#version 300 es

precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_gameState;

out vec4 fragColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  ivec2 board_size = textureSize(u_gameState, 0);

  ivec2 gridPos = ivec2(gl_FragCoord.xy) * board_size / ivec2(u_resolution);
  vec2 posWithinGrid = fract(gl_FragCoord.xy * vec2(board_size) / u_resolution);

  float cellColor = texture(u_gameState, (vec2(gridPos) + vec2(0.5, 0.5)) / vec2(board_size)).r;

  int checker = (gridPos.x % 2) ^ (gridPos.y % 2);

  fragColor = vec4(vec3(cellColor), 1.);
}
