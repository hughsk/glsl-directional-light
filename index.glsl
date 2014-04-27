/**
 * Directional Light.
 *
 * One of the simplest forms of dynamic lighting – casts
 * a light across a surface from a particular direction,
 * but not a particular point. Generally useful for rendering
 * daylight.
 *
 * Adapted for glslify from implementation in three.js:
 * http://git.io/u7FWKw
 *
 * @param {vec3} normal   This point's normal vector.
 * @param {vec3} light    The light color.
 * @param {vec3} surface  The color of the material/surface being drawn.
 *
 * @param {vec3} lightDirection The direction of the light to cast – normalized.
 * @param {mat4} modelMatrix    The model matrix.
 * @param {mat4} viewMatrix     The view matrix.
 * @param {vec3} viewPosition   The position of the camera in world space.
 *
 * The following parameters are optional, but must be specified together:
 *
 * @param {float} shininess   Set to lower values for matte, higher for gloss.
 * @param {float} specularity The amount by which to scale the specular light
 *                            cast on the object.
 *
 * @return {vec3} The color of the light to cast on this point.
 */
vec3 directional_light(
    vec3 normal
  , vec3 light
  , vec3 surface
  , vec3 lightDirection

  , mat4 modelMatrix
  , mat4 viewMatrix
  , vec3 viewPosition

  , float shininess
  , float specularity
) {
  vec3 direction = normalize((
    vec4(lightDirection, 1.0)
  ).xyz);

  vec3 halfDirection = normalize(
    direction + viewPosition
  );

  vec3 tNormal = normalize((
    modelMatrix * vec4(normal, 1.0)
  ).xyz);

  float diffuse = max(dot(tNormal, direction), 0.0);
  float halfDot = max(dot(tNormal, halfDirection), 0.0);
  float specular = max(pow(halfDot, shininess), 0.0);

  return max(light * (
    diffuse * surface +
    diffuse * specular * specularity
  ), vec3(0.0));
}

vec3 directional_light(
    vec3 normal
  , vec3 light
  , vec3 surface
  , vec3 lightDirection

  , mat4 modelMatrix
  , mat4 viewMatrix
  , vec3 viewPosition
) {
  vec3 direction = normalize((
    modelMatrix * vec4(lightDirection, 1.0)
  ).xyz);

  float diffuse = max(
    dot(normal, direction)
  , 0.0);

  return max(
    light * diffuse * surface
  , vec3(0.0));
}

#pragma glslify: export(directional_light)
