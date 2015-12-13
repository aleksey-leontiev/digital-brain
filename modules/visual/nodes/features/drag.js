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
  var circle    = event.node.path
  var group     = event.node.group
  var selection = event.node.selectionHighlight
  var segments  = event.node.segments
  var thought   = event.thought
  var point     = event.point

  // move node
  group.position = point
  group.position.x += (group.bounds.width / 2) - (selection.bounds.width / 2)

  // move links
  if (segments != null) {
    segments.forEach(function (s) { s.point = circle.position })
  }

  // update thought
  layerOffset = shared.getLayerOffset()
  thought.x = point.x + layerOffset.x
  thought.y = point.y + layerOffset.y

  // set dragged flag
  isDragged = true
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
