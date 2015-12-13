// Brain visualization module

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.thought.drag",     handler: onVisualThoughtDrag },
    { id: "visual.thought.mouse.up", handler: onVisualThoughtMouseUp }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onVisualThoughtDrag(event) {
  isDragged = true

  // move node
  event.node.group.position = event.point
  event.node.group.position.x +=
    (event.node.group.bounds.width / 2) -
    (event.node.selectionHighlight.bounds.width / 2)

  // move links
  if (event.node.segments != null) {
    event.node.segments.forEach(function (segment) {
      segment.point = event.node.path.position
    })
  }

  // update thought
  layerOffset = shared.getLayerOffset()
  event.thought.x = event.point.x + layerOffset.x
  event.thought.y = event.point.y + layerOffset.y
}

function onVisualThoughtMouseUp(event) {
  if (isDragged) {
    api.events.notify("brain.thought.changed", event.thought)
    isDragged = false
  }
}

var api
var isDragged = false
var shared    = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.drag",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
