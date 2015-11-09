// Link Nodes
// draw links between nodes

var moduleInfo = {
  id: "digitalBrain.visualization.links"
}

function init(app, config) {
  commitView("view.html", __dirname)

  subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "visual.frame",          handler: onVisualFrame },
    { id: "brain.links.create",    handler: onBrainLinksCreate }
  ])

  layer = request("visual.layer", "links")

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared", "links/shared", "links/features/create", "links/features/load"
  ], config)
  shared = modules[0]
  sharedLinks = modules[1]
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

module.exports = {
  info: moduleInfo,
  init: init
}
