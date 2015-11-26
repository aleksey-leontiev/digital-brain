// Link Nodes
// draw links between nodes

function load(api, config) {
  api.events.subscribe([
    { id: "brain.open.completed",  handler: onBrainOpenCompleted }
  ])

  shared = api.module.request("shared")
  sharedLinks = api.module.request("links/shared")

  layer       = api.events.request("visual.layer", "links")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainOpenCompleted(brainThoughts) {
  brainThoughts.forEach(function(thought) {
    if (thought.doc.links != null) {
      thought.doc.links.forEach(function(link) {
        firstNode =  shared.getVisualNodeByThoughtId(thought.doc._id)
        secondNode = shared.getVisualNodeByThoughtId(link.to)

        if (firstNode != null && secondNode != null) {
          sharedLinks.createVisualLink(firstNode, secondNode, link.type)
        }

      })
    }
  })
}

var layer = null
var shared = null
var sharedLinks = null

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.load",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load: load, unload: unload
}
