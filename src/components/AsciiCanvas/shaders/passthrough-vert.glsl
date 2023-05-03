#version 300 es

precision highp float;

in vec2 a_position;

out vec2 v_position;

void main() {
  v_position = (a_position + vec2(1, 1)) / 2.0;
  gl_Position = vec4(a_position, 0, 1);
}
