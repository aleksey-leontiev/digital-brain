// Brain visualization module

function init(app) {
  app.events.subscribeList([
    { id: "visual.thought.drag",     handler: onVisualThoughtDrag },
    { id: "visual.thought.mouse.up", handler: onVisualThoughtMouseUp }
  ])
  shared = app.modules.load("modules/visual/shared/shared")
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

  notify("brain.thought.changed", event.thought) // TODO: don't save if was no drag
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

var originalPosition = null
var isDirty = false
var shared = null

module.exports = { init: init }
