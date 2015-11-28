// Shared Library

function load(api) {
  layer = api.events.request("visual.layer", "links")
}

function createVisualLink(fromNode, toNode, type) {
  var linkNode         = new Path();
  linkNode.strokeColor = 'LightSteelBlue';
  linkNode.strokeWidth = 5
  linkNode.opacity     = .5

  if (type == "ref") {
    linkNode.strokeColor = "green"
    linkNode.strokeWidth = .1
  }

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
  info: {
    id:      "digitalBrain.visual.links.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load:             load,
  createVisualLink: createVisualLink
}
