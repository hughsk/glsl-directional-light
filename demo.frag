precision mediump float;

uniform mat4 uModel;
uniform mat4 uView;
uniform vec3 uEye;
varying vec3 vNormal;

#pragma glslify: directional = require(./index)

void main() {
  vec3 sky = vec3(1.0, 1.0, 0.9);
  vec3 gnd = vec3(0.1, 0.1, 0.35);

  vec3 direction1 = normalize(vec3(0.0, 1.0, 0.0));
  vec3 direction2 = normalize(vec3(-0.5, -0.7, 0.0));
  vec3 surface = vec3(1.0);
  vec3 light1 = vec3(0.1, 0.5, 1.0);
  vec3 light2 = vec3(0.8, 0.35, 0.2);

  vec3 lighting = directional(
      vNormal, light1, surface, direction1
    , uModel, uView, uEye
    , 100.0, 2.0
  ) + directional(
      vNormal, light2, surface, direction2
    , uModel, uView, uEye
    , 100.0, 2.0
  );

  gl_FragColor = vec4(lighting, 1.0);
}
