// Visual Module :: Layer :: Move

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.frame",      handler: onVisualFrame },
    { id: "key.down",          handler: onKeyDown },
    { id: "key.up",            handler: onKeyUp },
    { id: "visual.layer.move", handler: onVisualLayerMove }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onKeyDown(event) {
  if (event.target.id != "body") return

  pressed[event.which] = true
}

function onKeyUp(event) {
  pressed[event.which] = false
}

function onVisualFrame(event) {
  var speed = module.exports.config.speed

  if (pressed[37]) { dx -= speed } // left
  if (pressed[39]) { dx += speed } // right
  if (pressed[38]) { dy -= speed } // up
  if (pressed[40]) { dy += speed } // down

  if (!isNear(dx, dy)) {
    api.events.notify("visual.layer.move", { delta: { x:dx, y:dy } })
  }

  dx *= .9; dy *= .9
}

function isNear(dx, dy) {
  return Math.abs(dx) + Math.abs(dy) < .1
}

function onVisualLayerMove(event) {
  project.layers.forEach(function (layer) {
    layer.position.x -= event.delta.x
    layer.position.y -= event.delta.y
  })

  layerOffset.x += event.delta.x
  layerOffset.y += event.delta.y

  api.events.notify("visual.layer.moved", { offset: layerOffset })
}

var api
var layerOffset = { x:0, y:0 }
var dx = 0
var dy = 0
var pressed = {}

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer.move",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  config: {
    speed: 2
  },

  load: load, unload: unload
}
