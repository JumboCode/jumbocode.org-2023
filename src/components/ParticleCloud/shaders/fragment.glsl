precision highp float;

uniform float pointSize;

void main() {
    vec3 color = vec3(20., 235., 185.) / 255.;
    vec2 st = (gl_PointCoord.xy - 0.5) * pointSize;
    float radius = pointSize / 2.;
    float distanceFromCenter = distance(vec2(0), st);
    float inCircle = 1. - smoothstep(radius - 0.5, radius, distanceFromCenter);
    float alpha = 0.1 * inCircle;
    gl_FragColor = vec4(color, 1.) * alpha;
}
