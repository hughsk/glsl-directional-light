# glsl-directional-light [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A reusable GLSL directional light function.

The simplest case is to simply use:

``` glsl
dot(normal, direction) * light
```

But this module also takes into account specualrity as well.

[view demo](http://hughsk.io/glsl-directional-light)

[![glsl-directional-light]()](http://hughsk.io/glsl-directional-light)

## Usage ##

[![glsl-directional-light](https://nodei.co/npm/glsl-directional-light.png?mini=true)](https://nodei.co/npm/glsl-directional-light)

Exports `vec3 directional_light()`, which takes the following arguments:

* `vec3 normal`: This point's normal vector.
* `vec3 light`: The light color.
* `vec3 surface`: The color of the material/surface being drawn.
* `vec3 lightDirection`: The direction of the light to cast – normalized.
* `mat4 modelMatrix`: The model matrix.
* `mat4 viewMatrix`: The view matrix.
* `vec3 viewPosition`: The position of the camera in world space.

If you wish to include specular lighting too, simply add these two extra
parameters when calling the function:

* `float shininess`: Set to lower values for matte, higher for gloss.
* `float specularity`: The amount by which to scale the specular light cast on
  the object.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/glsl-directional-light/blob/master/LICENSE.md) for details.
