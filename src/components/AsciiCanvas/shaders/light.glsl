#version 300 es

precision highp float;
precision highp sampler2D;

uniform vec2 u_resolution;

out vec4 fragColor;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  fragColor = vec4(st, 1., 1.);
}
