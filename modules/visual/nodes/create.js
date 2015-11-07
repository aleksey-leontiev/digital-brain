// Brain visualization module

function init(app) {
  subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown }
  ])
  shared = app.modules.load("modules/visual/shared/shared")
}

function onMouseDown(event) {
  if (event.event.ctrlKey) {
    id = Math.random().toString(36).substr(2)
    layerOffset = shared.getLayerOffset()

    notify("brain.thought.new", {
      _id: id, title: "new",
      x: event.point.x + layerOffset.x,
      y: event.point.y + layerOffset.y,
      links: [] })
  }
}

var shared = null

module.exports = { init: init }
