// Visual :: Nodes :: Drag

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
  var root      = event.node.root
  var target    = event.node.target
  var selection = event.node.selectionHighlight
  var segments  = event.node.segments
  var thought   = event.thought
  var point     = event.point
  var offset    = shared.getLayerOffset()

  // move node
  root.position.x = point.x + offset.x
  root.position.y = point.y + offset.y

  // move links
  if (segments != null) {
    segments.forEach(function (s) {
      s.point = root.position
    })
  }

  // update thought
  thought.location.x = root.position.x
  thought.location.y = root.position.y

  // set dragged flag
  isDragged = true
}

function onVisualThoughtMouseUp(event) {
  if (!isDragged) return

  api.events.notify("brain.thought.changed", event.thought)
  isDragged = false
}

var api
var isDragged = false
var shared

module.exports = {
  info: {
    id:          "digitalBrain.visual.nodes.drag",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "It provides dragging functionality of thought."
  },

  load: load, unload: unload
}
