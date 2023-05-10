#version 300 es

precision highp float;
precision highp sampler2D;

uniform vec2 u_resolution;

uniform sampler2D u_headingSdf;
uniform sampler2D u_subheadingSdf;

out vec4 fragColor;


void main() {
  vec2 flippedCoord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 st = flippedCoord / u_resolution;
  vec2 headingSize = vec2(textureSize(u_headingSdf, 0));
  vec2 subheadingSize = vec2(textureSize(u_subheadingSdf, 0));

  vec2 allTextSize = vec2(
    max(headingSize.x, subheadingSize.x),
    headingSize.y + subheadingSize.y * 0.3
  );

  vec2 center = u_resolution * 0.5 - vec2(0, allTextSize.y * 0.1);
  vec2 headingTopLeft = center + vec2(-0.5 * headingSize.x, -0.5 * allTextSize.y);
  vec2 subheadingTopLeft = center + vec2(-0.49 * subheadingSize.x, 0.5 * allTextSize.y - subheadingSize.y);

  vec2 posWithinHeading = (flippedCoord - headingTopLeft) / headingSize;
  vec2 posWithinSubheading = (flippedCoord - subheadingTopLeft) / subheadingSize;

  float headingSdfValue = texture(u_headingSdf, posWithinHeading).r;
  float subheadingSdfValue = texture(u_subheadingSdf, posWithinSubheading).r;

  float sdfValue = max(headingSdfValue, subheadingSdfValue);
  float text = smoothstep(0.74, 0.76, sdfValue);

  fragColor = vec4(vec3(text), 1.);
}
