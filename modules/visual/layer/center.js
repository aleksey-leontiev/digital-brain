// Move Layer Module
// allows to move layer

function load(mapi, config) {
  api = mapi

  api.events.subscribe([
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "visual.frame", handler: onVisualFrame }
  ])

  shared = api.module.request("shared", config)
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  if (module.exports.config.speed == 1) move();
}

function onVisualFrame() {
  if (selectedThought == null) return;
  if (module.exports.config.speed == 1) return;

  move()
}

function move() {
  var layerOffset = shared.getLayerOffset()
  var centerX     = view.center.x + 100
  var centerY     = view.center.y

  var dx = (selectedThought.x - layerOffset.x - centerX)
  var dy = (selectedThought.y - layerOffset.y - centerY)

  if (isNumeric(dx) && isNumeric(dy)) {
    if (Math.abs(dx) + Math.abs(dy) < 5) {
      selectedThought = null
      return
    }

    var speed = module.exports.config.speed
    api.events.notify("visual.layer.move", {delta: {x:dx*speed, y:dy*speed}})
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var api
var shared = null
var selectedThought = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.layer.center",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  config: {
    speed: .5
  }
}
