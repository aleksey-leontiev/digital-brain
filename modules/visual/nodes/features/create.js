// Brain visualization module

function load(mapi, config) {
  api = mapi
  api.events.subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown }
  ])

  shared = api.module.request("shared", config)
}

function unload(api) {
  api.events.unsubscribe()
}

function onMouseDown(event) {
  if (event.event.ctrlKey) {
    id = Math.random().toString(36).substr(2)
    layerOffset = shared.getLayerOffset()

    api.events.notify("brain.thought.new", { thought: {
      _id: id, title: "new",
      x: event.point.x + layerOffset.x,
      y: event.point.y + layerOffset.y,
      links: [] }})
  }
}

var api
var shared = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.create",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
