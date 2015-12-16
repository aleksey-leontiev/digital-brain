// Visual Module :: Layer :: Center

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.thought.mouse.up",   handler: onVisualThoughtMouseUp },
    { id: "visual.thought.mouse.down", handler: onVisualThoughtMouseDown },
    { id: "brain.thought.select",      handler: onBrainThoughtSelect },
    { id: "visual.frame",              handler: onVisualFrame }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  if (module.exports.config.speed == 1) move();
}

function onVisualThoughtMouseDown(event) {
  preventCentering = true
}

function onVisualThoughtMouseUp(event) {
  preventCentering = false
}

function onVisualFrame() {
  if (selectedThought == null) return;
  if (module.exports.config.speed == 1) return;

  move()
}

function move() {
  if (preventCentering) return

  var speed    = module.exports.config.speed
  var offset   = shared.getLayerOffset()
  var centerX  = view.center.x
  var centerY  = view.center.y

  var dx = (selectedThought.location.x - offset.x - centerX)
  var dy = (selectedThought.location.y - offset.y - centerY)

  if (isNear(dx, dy)) {
    preventCentering = false
    selectedThought = null
  } else {
    api.events.notify("visual.layer.move", {delta: {x:dx*speed, y:dy*speed}})
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function isNear(dx, dy) {
  if (isNumeric(dx) && isNumeric(dy)) {
    if (Math.abs(dx) + Math.abs(dy) < 5) {
      return true
    }
  }
  return false
}

var api
var shared = null
var selectedThought = null
var preventCentering = false

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer.center",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  config: {
    speed: .1
  },

  load: load, unload: unload
}
