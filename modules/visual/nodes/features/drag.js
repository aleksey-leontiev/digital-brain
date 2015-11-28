// Brain visualization module

function load(_api, config) {
  api = _api
  
  api.events.subscribe([
    { id: "visual.thought.drag",     handler: onVisualThoughtDrag },
    { id: "visual.thought.mouse.up", handler: onVisualThoughtMouseUp }
  ])

  shared = api.module.request("shared", config)
}

function unload(api) {
  api.events.unsubscribe()
}

function onVisualThoughtDrag(event) {
  startDragFrom(event.point)

  // move node
  event.node.group.position = event.point
  event.node.group.position.x +=
    (event.node.text.position.x - event.node.path.position.x) - 35

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
  if (!isDragged(event.point)) return

  api.events.notify("brain.thought.changed", event.thought) // TODO: don't save if was no drag
  clearOriginalPosition()
}

function startDragFrom(point) {
  if (originalPosition == null)
    originalPosition = point
}

function isDragged(point) {
  if (originalPosition != null) {
    if (point.x != originalPosition.x || point.y != originalPosition.y) {
      return true
    }
  }
  return false
}

function clearOriginalPosition() {
  originalPosition = null
}

var api
var originalPosition = null
var isDirty = false
var shared = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.drag",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
