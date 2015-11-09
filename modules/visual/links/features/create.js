// Link Nodes
// draw links between nodes
/*
function init(app) {
  subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.frame",          handler: onVisualFrame },
    { id: "brain.links.create",    handler: onBrainLinksCreate }
  ])

  shared = app.modules.load("./modules/visual/shared/shared.js")

  layer = request("visual.layer", "links")
}

function onBrainThoughtSelect(thought) {
  if (isLinking) {
    selectedThought.links.push(thought._id)
    notify("brain.thought.changed", selectedThought)
    notify("brain.links.create", { from: selectedThought, to: thought })
  }
  selectedThought = thought
}

function onBrainLinksCreate(link) {
  node1 = shared.getVisualNodeByThoughtId(link.from._id)
  node2 = shared.getVisualNodeByThoughtId(link.to._id)
  shared.createVisualLink(node1, node2)
  setLinkingState(false)
  notify("brain.thought.changed", link.from)
}

function setLinkingState(value) {
  isLinking = value
  $("#links").html(value)
}

function onVisualFrame(event) {
  if (Key.isDown("l") && selectedThought != null)
    isLinking = true
}

var selectedThought = null
var isLinking = false
var layer = null
var sharedLinks = null

module.exports = { init: init }
*/
