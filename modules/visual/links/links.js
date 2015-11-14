// Link Nodes
// draw links between nodes

function init(app, config) {
  commitView("view.html", __dirname)

  subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "key.down",              handler: onKeyDown },
    { id: "brain.links.create",    handler: onBrainLinksCreate }
  ])

  layer = request("visual.layer", "links")

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared", "links/shared", "links/features/create", "links/features/load",
    "links/features/list", "links/features/open"
  ], config)
  shared = modules[0]
  sharedLinks = modules[1]
}

function onBrainThoughtSelect(thought) {
  var underscore = require('underscore');

  if (isLinking) {
    var result = false

    // create forward link
    if (selectedThought.links == null) {
      selectedThought.links = {}
    }

    var linksToIds = underscore.map(selectedThought.links, function(link) {
      return link.to
    })
    if (!underscore.contains(linksToIds, thought._id)) {
      selectedThought.links.push({
        to: thought._id,
        type: "forward"
      })
      result = true
    } else {
      notify("notification", { message: "Already linked" })
    }

    // create backward link
    backwardThougth = shared.getThoughtById(thought._id)
    if (backwardThougth.links == null) {
      backwardThougth.links = {}
    }

    var linksToIds = underscore.map(thought.links, function(link) {
      return link.to
    })
    if (!underscore.contains(linksToIds, selectedThought._id)) {
      backwardThougth.links.push({
        to: selectedThought._id,
        type: "backward",
        description: "Backward link"
      })
      result = true
    } else {
      notify("notification", { message: "Backward link already exist" })
    }

    if (result) {
      notify("brain.links.create", { from: selectedThought, to: thought })
    }
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

function onKeyDown(event) {
  if (event.char == "L" && event.ctrlKey && selectedThought != null)
    setLinkingState(true)
}

function setLinkingState(value) {
  isLinking = value
}

var selectedThought = null
var isLinking = false
var layer = null

module.exports = {
  info: {
    id: "digitalBrain.visualization.links"
  },
  init: init
}
