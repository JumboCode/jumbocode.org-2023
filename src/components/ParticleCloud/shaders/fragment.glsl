precision highp float;

void main() {
    vec3 color = vec3(20., 235., 185.) / 255.;
    gl_FragColor = vec4(color, 1.) * 0.1;
}
