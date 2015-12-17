// Visual Module :: Links :: Load

function load(api) {
  api.events.subscribe([
    { id: "brain.open.completed",  handler: onBrainOpenCompleted }
  ])

  shared = api.module.request("shared.js")
  links  = api.module.request("links/shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainOpenCompleted(brainThoughts) {
  brainThoughts.forEach(function(thought) {
    if (thought.doc.links == null) return;

    thought.doc.links.forEach(function(link) {
      createLink(thought, link)
    })
  })
}

function createLink(thought, link) {
  var nodeFrom = shared.getVisualNode(thought.doc._id)
  var nodeTo   = shared.getVisualNode(link.to)

  if (nodeFrom != null && nodeTo != null) {
    links.create(nodeFrom, nodeTo, link.type)
  }
}

var shared
var links

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.load",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
