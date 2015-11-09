// Move Layer Module
// allows to move layer

function init(app, config) {
  subscribe([
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "visual.frame", handler: onVisualFrame }
  ])

  var modules = loadModules(config.moduleRootPath, [
    "shared"
  ], config)
  shared = modules[0]
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
}

function onVisualFrame() {
  if (selectedThought == null) return;

  var layerOffset = shared.getLayerOffset()
  var centerX = view.center.x + 100
  var centerY = view.center.y

  var dx = (selectedThought.x - layerOffset.x - centerX)
  var dy = (selectedThought.y - layerOffset.y - centerY)

  if (isNumeric(dx) && isNumeric(dy)) {
    if (Math.abs(dx) + Math.abs(dy) < 5) {
      selectedThought = null
      return
    }
    
    notify("visual.layer.move", {delta: {x:dx*.03, y:dy*.03}})
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var shared = null;
var selectedThought = null;

module.exports = { init: init }
