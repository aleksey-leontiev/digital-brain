// Brain Visualization Module

function load(mapi, config) {
  api = mapi

  // install paper.js
  paper = api.assets.loadJSSync("bower_components/paper/dist/paper-full.js");
  paper.install(window);
  paper.setup('canvas');

  // subscribe for events
  api.events.subscribe([
    { id: "brain.thought.new",   handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load",  handler: onBrainThoughtNewOrLoad },
    { id: "visual.get",          handler: onVisualGet },
    { id: "visual.layer",        handler: onVisualLayerRequest }
  ])

  layer  = api.events.request("visual.layer", "nodes")

  view.onFrame     = onFrame
  view.onMouseDown = onMouseDown

  shared = api.module.request("shared", config)
  api.module.request("nodes/nodes", config)
  api.module.request("links/links", config)
  api.module.request("layer/move", config)
  api.module.request("layer/center", config)
  api.module.request("zoom/zoom", config)
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtNewOrLoad(event) {
  var layerOffset = shared.getLayerOffset()
  var node = {};

  node.group = new Group();
  layer.bringToFront() // TODO: bring to front

  api.events.notify("visual.thought.create", { node: node, thought: event.thought })

  node.path = new Path.Circle({
    radius: 15,
    fillColor: "LightSlateGray"
  });

  node.text = new PointText({
    point: [20, 0],
    justification: 'left',
    fontSize: 16,
    content: event.thought.title
  });

  node.group.addChildren([node.path, node.text])
  node.group.position = new Point(event.thought.x - layerOffset.x, event.thought.y - layerOffset.y);

  node.group.onMouseDown = function() {
    api.events.notify("brain.thought.select", event.thought)
    api.events.notify("visual.thought.select", node)
  };
  node.group.onMouseDrag = function(e) {
    api.events.notify("visual.thought.drag",
    {node: node, thought: event.thought, point:e.point})
  }
  node.group.onMouseUp = function(e) {
    api.events.notify("visual.thought.mouse.up",
    {node: node, thought: event.thought, point:e.point})
  }

  api.events.notify("visual.thought.created", { node: node, thought: event.thought })

  hash[event.thought._id] = node

  layer.addChild(node.group)
}

function onFrame(event) {
  api.events.notify("visual.frame")
}

function onMouseDown(event) {
  api.events.notify("visual.mouse.down", event)
}

function onVisualGet(thoughtId) {
  return hash[thoughtId]
}

function onVisualLayerRequest(layerId) {
  l = layers[layerId]
  if (l == null) {
    layers[layerId] = l = new paper.Layer()
  }
  return l
}

var api
var hash   = {}
var paper  = null
var layers = {}
var layer  = null
var shared = null

module.exports = {
  load: load,
  unload: unload,

  info: {
    id:      "digitalBrain.visual",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
