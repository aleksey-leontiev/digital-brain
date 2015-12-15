// Visual Module :: Links

function load(mapi, config) {
  api = mapi

  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "key.down",              handler: onKeyDown },
    { id: "brain.links.create",    handler: onBrainLinksCreate }
  ])

  layer  = api.events.request("visual.layer", "links")

  brain  = api.module.request("app:brain.js")
  shared = api.module.request("shared.js")
  links  = api.module.request("links/shared.js")
  api.module.request("links/features/load.js")
}

function unload(api) {
  api.events.unsubscribe()
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
      api.events.notify("notification", { message: "Already linked" })
    }

    // create backward link
    backwardThougth = brain.getThoughtById(thought._id)
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
      api.events.notify("notification", { message: "Backward link already exist" })
    }

    if (result) {
      api.events.notify("brain.links.create", { from: selectedThought, to: thought })
    }
  }
  selectedThought = thought
}

function onBrainLinksCreate(link) {
  node1 = shared.getVisualNode(link.from._id)
  node2 = shared.getVisualNode(link.to._id)
  links.create(node1, node2)
  setLinkingState(false)
  api.events.notify("brain.thought.changed", link.from)
  api.events.notify("brain.thought.changed", link.to)
}

function onKeyDown(event) {
  if (event.char == "L" && event.ctrlKey && selectedThought != null)
    setLinkingState(true)
}

function setLinkingState(value) {
  isLinking = value
}

var api
var selectedThought = null
var isLinking = false
var layer = null
var brain
var links

module.exports = {
  info: {
    id:          "digitalBrain.visual.links",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },
  load: load, unload: unload
}
