precision highp float;

uniform float pointSize;

void main() {
    // Basic color of our particle
    vec3 color = vec3(20., 235., 185.) / 255.;

    // gl_PointCoord - (0, 0) to (1, 1)
    // st - (-pointSize / 2, pointSize / 2)
    vec2 st = (gl_PointCoord.xy - 0.5) * pointSize;
    float radius = pointSize / 2.;
    float distanceFromCenter = distance(vec2(0), st);
    float inCircle = 1. - smoothstep(radius - 1., radius + 1., distanceFromCenter);
    float alpha = 0.1 * inCircle;
    gl_FragColor = vec4(color, 1.) * alpha;
}
