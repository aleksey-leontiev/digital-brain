// Link Nodes
// draw links between nodes

function init(app) {
  commitView("./modules/visual/links/view.html")

  subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "visual.frame",          handler: onVisualFrame },
    { id: "brain.links.create",    handler: onBrainLinksCreate }
  ])

  shared      = app.modules.load("./modules/visual/shared/shared.js")
  sharedLinks = app.modules.load("./modules/visual/links/shared.js")

  layer = request("visual.layer", "links")
}

function onBrainThoughtSelect(thought) {
  if (isLinking) {
    selectedThought.links.push(thought._id)
    notify("brain.links.create", {from: selectedThought, to: thought})
  }
  selectedThought = thought
}

function onBrainLinksCreate(link) {
  node1 = shared.getVisualNodeByThoughtId(link.from._id)
  node2 = shared.getVisualNodeByThoughtId(link.to._id)
  sharedLinks.createVisualLink(node1, node2)
  setLinkingState(false)
  notify("brain.thought.changed", link.from)
  notify("brain.thought.changed", link.to)
}

function onVisualFrame(event) {
  if (Key.isDown("l") && selectedThought != null)
    setLinkingState(true)
}

function setLinkingState(value) {
  isLinking = value
  $("#links").html(value)
}

var selectedThought = null
var isLinking = false
var layer = null

module.exports = { init: init }
