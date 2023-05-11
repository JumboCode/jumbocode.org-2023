#version 300 es

precision highp float;
precision highp sampler2D;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_headingSdf;
uniform float u_headingSdfRadius;
uniform sampler2D u_subheadingSdf;
uniform float u_subheadingSdfRadius;

out vec4 fragColor;

const int MAX_STEPS = 500;


// https://iquilezles.org/articles/distfunctions2d/
float sdBox(in vec2 p, in vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}


// “Combined” SDF for all text
// “Fast” (zero-texture-access) path for when the coordinate is outside the “text boxes”
float sdf(
  in vec2 p,  // the coordinate at which to evaluate the SDF
  // avoid recomputing these
  in vec2 headingTopLeft, in vec2 headingSize,
  in vec2 subheadingTopLeft, in vec2 subheadingSize
) {
  vec2 posWithinHeading = (p - headingTopLeft) / headingSize;
  vec2 posWithinSubheading = (p - subheadingTopLeft) / subheadingSize;
  // SDF “boxes” around text texture boundaries
  float headingBoxSdfValue = sdBox((p - headingTopLeft - headingSize / 2.), headingSize / 2.);
  float subheadingBoxSdfValue = sdBox((p - subheadingTopLeft - subheadingSize / 2.), subheadingSize / 2.);

  float dist = 0.0; // infinity
  float boundary = 30.0; // how far from the text boxes to use the texture distance
                        // we want >0 so that we don’t “stop” before we get into the text boxes
  if (headingBoxSdfValue < boundary && subheadingBoxSdfValue < boundary) {
    float headingSdfValue = (1. - (texture(u_headingSdf, posWithinHeading).r / 0.75)) * u_headingSdfRadius;
    float subheadingSdfValue = (1. - (texture(u_subheadingSdf, posWithinSubheading).r / 0.75)) * u_subheadingSdfRadius;
    dist = min(headingSdfValue, subheadingSdfValue);
  } else if (headingBoxSdfValue < boundary) {
    float headingSdfValue = (1. - (texture(u_headingSdf, posWithinHeading).r / 0.75)) * u_headingSdfRadius;
    dist = headingSdfValue;
  } else if (subheadingBoxSdfValue < boundary) {
    float subheadingSdfValue = (1. - (texture(u_subheadingSdf, posWithinSubheading).r / 0.75)) * u_subheadingSdfRadius;
    dist = subheadingSdfValue;
  } else {
    dist = min(headingBoxSdfValue, subheadingBoxSdfValue);
  }

  return dist;
}


void main() {
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 st = coord / u_resolution;


  // Draw text

  vec2 headingSize = vec2(textureSize(u_headingSdf, 0));
  vec2 subheadingSize = vec2(textureSize(u_subheadingSdf, 0));

  vec2 allTextSize = vec2(
    max(headingSize.x, subheadingSize.x),
    headingSize.y + subheadingSize.y * 0.5
  );

  vec2 center = u_resolution * 0.5 - vec2(0, allTextSize.y * 0.1);
  vec2 headingTopLeft = center + vec2(-0.5 * headingSize.x, -0.5 * allTextSize.y);
  vec2 subheadingTopLeft = center + vec2(-0.49 * subheadingSize.x, 0.5 * allTextSize.y - subheadingSize.y);

  float sdfValue = sdf(coord, headingTopLeft, headingSize, subheadingTopLeft, subheadingSize);


  // Draw light

  vec2 lightPos = u_mouse;
  vec2 toLight = normalize(lightPos - coord);

  vec2 marchPos = coord;
  float hitLight = 0.0;
  float hitText = 0.0;

  int steps = 0;
  for (int i = 0; i < MAX_STEPS; i++) {
    steps++;
    float marchDist = sdf(marchPos, headingTopLeft, headingSize, subheadingTopLeft, subheadingSize);
    marchPos += toLight * marchDist;
    if (marchDist < 1.) {
      hitText = 1.;
      break;
    }
    vec2 currentToLight = normalize(lightPos - marchPos);
    vec2 passedLight = currentToLight / toLight; // negative if we passed the light
    if (passedLight.x < 0. && passedLight.y < 0.) {
      hitLight = 1.;
      break;
    }
  }



  fragColor = vec4(vec3(hitLight), 1.);
}
