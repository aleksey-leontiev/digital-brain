// Link Nodes
// draw links between nodes

function init(app, config) {
  subscribe([
    { id: "brain.open.completed",  handler: onBrainOpenCompleted }
  ])

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared", "links/shared"
  ], config)
  shared = modules[0]
  sharedLinks = modules[1]

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
