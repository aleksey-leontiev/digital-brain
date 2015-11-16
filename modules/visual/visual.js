// Brain Visualization Module

function init(app, config) {
  // install paper.js
  paper = loadJSSync(config.moduleRootPath + "bower_components/paper/dist/paper-full.js");

  paper.install(window);
  paper.setup('canvas');

  subscribe([
    { id: "brain.thought.new",   handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load",  handler: onBrainThoughtNewOrLoad },
    { id: "visual.get",          handler: onVisualGet },
    { id: "visual.layer",        handler: onVisualLayerRequest }
  ])

  layer  = request("visual.layer", "nodes")

  view.onFrame     = onFrame
  view.onMouseDown = onMouseDown

  var loaded = loadModules(config.moduleRootPath, [
    "shared", "nodes/nodes", "links/links", "layer/move", "layer/center", "zoom/zoom"
  ], config)
  shared = loaded[0]
}

function onBrainThoughtNewOrLoad(event) {
  var layerOffset = shared.getLayerOffset()
  var node = {};

  node.group = new Group();
  layer.bringToFront() // TODO: bring to front

  notify("visual.thought.create", { node: node, thought: event.thought })

  node.path = new Path.Circle({
    radius: 15,
    fillColor: "green"
  });

  node.text = new PointText({
    point: [20, 5],
    justification: 'left',
    fontSize: 16,
    fillColor: 'red',
    content: event.thought.title
  });

  node.group.addChildren([node.path, node.text])
  node.group.position = new Point(event.thought.x - layerOffset.x, event.thought.y - layerOffset.y);

  node.group.onMouseDown = function() {
    notify("brain.thought.select", event.thought)
    notify("visual.thought.select", node)
  };
  node.group.onMouseDrag = function(e) {
    notify("visual.thought.drag",
    {node: node, thought: event.thought, point:e.point})
  }
  node.group.onMouseUp = function(e) {
    notify("visual.thought.mouse.up",
    {node: node, thought: event.thought, point:e.point})
  }

  hash[event.thought._id] = node

  layer.addChild(node.group)
}

function onFrame(event) {
  notify("visual.frame")
}

function onMouseDown(event) {
  notify("visual.mouse.down", event)
}

function onVisualGet(thoughtId) {
  notify("visual.get:response", hash[thoughtId])
}

function onVisualLayerRequest(layerId) {
  l = layers[layerId]
  if (l == null) {
    layers[layerId] = l = new paper.Layer()
  }
  return l
}

var hash   = {}
var paper  = null
var layers = {}
var layer  = null
var shared = null

module.exports = {
  init: init,
  moduleInfo: {
    id: "digitalBrain.visual"
  }
}
