// Visual Module :: Style Nodes
// Highlights throughts

function init(app) {
  subscribe([
    { id: "visual.thought.created", handler: onVisualThoughtCreated }
  ])
}

function onVisualThoughtCreated(event) {
  styles = event.thought.style
  node   = event.node

  if (styles == null) return

  styles.split(' ').forEach(function (s) {
    if (s == "big") {
      node.group.scale(2)
    }
    if (s == "small") {
      node.group.scale(.75)
    }
    if (s == "important") node.path.fillColor = "red"
  })
}

module.exports = { init: init }
