// Link Nodes
// draw links between nodes

function init(app) {
  subscribe([
    { id: "brain.open.completed",  handler: onBrainOpenCompleted }
  ])
  shared      = app.modules.load("./modules/visual/shared/shared.js")
  sharedLinks = app.modules.load("./modules/visual/links/shared.js")
  layer       = request("visual.layer", "links")
}

function onBrainOpenCompleted(brainThoughts) {
  brainThoughts.forEach(function(thought) {
    if (thought.doc.links != null) {
      thought.doc.links.forEach(function(link) {
        firstNode =  shared.getVisualNodeByThoughtId(thought.doc._id)
        secondNode = shared.getVisualNodeByThoughtId(link)
        sharedLinks.createVisualLink(firstNode, secondNode)
      })
    }
  })
}

var layer = null
var shared = null
var sharedLinks = null

module.exports = { init: init }
