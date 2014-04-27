var createCamera = require('game-shell-orbit-camera')
var dragon       = require('bunny')
var pack         = require('array-pack-2d')
var eye          = require('eye-vector')
var createBuffer = require('gl-buffer')
var createShader = require('glslify')
var createShell  = require('gl-now')
var createVAO    = require('gl-vao')
var norm         = require('normals')

var mat4 = require('gl-matrix').mat4

var shader
var camera
var mesh
var gl

var shell = createShell({
  clearColor: [0, 0, 0, 1]
})

shell.on('gl-init', init)
shell.on('gl-render', render)

function init() {
  gl = shell.gl

  camera = createCamera(shell)
  camera.distance = 20

  center(dragon.positions)

  var normals = norm.vertexNormals(
      dragon.cells
    , dragon.positions
  )

  var index = createBuffer(gl
    , pack(dragon.cells, 'uint16')
    , gl.ELEMENT_ARRAY_BUFFER
  )

  mesh = createVAO(gl, [{
      size: 3
    , buffer: createBuffer(gl, pack(dragon.positions))
  }, {
      size: 3
    , buffer: createBuffer(gl, pack(normals))
  }], index)

  shader = createShader({
      vertex: './demo.vert'
    , fragment: './demo.frag'
  })(gl)
}

var projection = new Float32Array(16)
var eyevec = new Float32Array(3)
var model = new Float32Array(16)

function render() {
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)

  shader.bind()

  var view = camera.view()
  eye(view, eyevec)

  mat4.perspective(projection
    , Math.PI / 4
    , shell.width / shell.height
    , 0.001
    , 1000
  )

  mat4.identity(model)
  mat4.rotateY(model, model, 0.001 * Date.now())

  shader.uniforms.uProjection = projection
  shader.uniforms.uView = view
  shader.uniforms.uModel = model
  shader.uniforms.uEye = eyevec
  shader.attributes.aPosition.location = 0
  shader.attributes.aNormal.location = 1

  mesh.bind()
  mesh.draw(gl.TRIANGLES, dragon.cells.length * 3)
  mesh.unbind()
}

function center(positions) {
  for (var j = 0; j < 3; j++) {
    var l = positions.length
    var min = +Infinity
    var max = -Infinity

    for (var i = 0; i < l; i++) {
      var p = positions[i][j]
      if (p > max) max = p
      if (p < min) min = p
    }

    var avg = (min + max) / 2

    for (var i = 0; i < l; i++) {
      positions[i][j] -= avg
    }
  }

  return positions
}
