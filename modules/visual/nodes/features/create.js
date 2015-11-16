// Brain visualization module

function init(app, config) {
  subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown }
  ])

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared"
  ], config)
  shared = modules[0]
}

function onMouseDown(event) {
  if (event.event.ctrlKey) {
    id = Math.random().toString(36).substr(2)
    layerOffset = shared.getLayerOffset()

    notify("brain.thought.new", { thought: {
      _id: id, title: "new",
      x: event.point.x + layerOffset.x,
      y: event.point.y + layerOffset.y,
      links: [] }})
  }
}

var shared = null

module.exports = { init: init }
