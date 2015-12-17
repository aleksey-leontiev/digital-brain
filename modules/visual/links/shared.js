// Visual Module :: Links :: Shared

function load(api) {
}

function create(nodeFrom, nodeTo, type) {
  // create node
  var nodeLink = new Path({
    strokeColor: 'LightSteelBlue',
    strokeWidth: 5,
    opacity:    .5,
  })

  // apply style based on link type
  if (type == "ref") {
    nodeLink.strokeColor = "green"
    nodeLink.strokeWidth = .1
  }

  // add path points
  nodeLink.add(nodeFrom.target.position)
  nodeLink.add(nodeTo.target.position)
  nodeFrom.root.layer.addChild(nodeLink)
  nodeLink.sendToBack()

  // add segments property if required
  if (nodeFrom.segments == null) nodeFrom.segments = []
  if (nodeTo.segments   == null)   nodeTo.segments = []
  nodeFrom.segments.push(nodeLink.firstSegment)
  nodeTo.segments.push(nodeLink.lastSegment)
}

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load:   load,
  create: create
}
