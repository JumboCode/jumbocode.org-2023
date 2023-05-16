#version 300 es

precision mediump float;
precision mediump sampler2D;

uniform sampler2D u_previousState;

out vec4 fragColor;

#define is_live(coord) dot(texture(u_previousState, coord / game_size).rgb, vec3(1.0)) > 0.1

void main() {
  vec2 game_size = vec2(textureSize(u_previousState, 0));
  vec2 self_pos = gl_FragCoord.xy; // gl_FragCoord is already centered, i.e. (0.5, 0.5) at bottom left
  bool self_live = is_live(self_pos);

  // Count live neighbors
  int live_neighbors = 0;
  for (int i = -1; i <= 1; i++) {
    for (int j = -1; j <= 1; j++) {
      if (i != 0 || j != 0) {
        vec2 sample_pos = self_pos + vec2(i, j);
        live_neighbors += int(is_live(sample_pos));
      }
    }
  }

  // Judge pixel state
  int new_live = int(
    // Live cells with 2 or 3 live neighbors survive
    (self_live && (live_neighbors == 2 || live_neighbors == 3))
    // Dead cells with 3 live neighbors come to life
    || (!self_live && live_neighbors == 3)
  );

  fragColor = vec4(vec3(float(new_live)), 1.);
}
