// Shared Library

function init(app) {
  layer = request("visual.layer", "links")
}

function createVisualLink(fromNode, toNode) {
  var linkNode         = new Path();
  linkNode.strokeColor = 'black';
  linkNode.strokeWidth = 1

  linkNode.add(fromNode.path.position);
  linkNode.add(toNode.path.position);

  layer.addChild(linkNode)

  if (fromNode.segments == null) fromNode.segments = []
  if (toNode.segments == null)   toNode.segments = []

  fromNode.segments.push(linkNode.firstSegment)
  toNode.segments.push(linkNode.lastSegment)
}

var layer = null

module.exports = {
  init:             init,
  createVisualLink: createVisualLink
}
