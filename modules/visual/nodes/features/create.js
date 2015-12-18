// Visual :: Nodes :: Create

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown },
    { id: "brain.thought.new",  handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load", handler: onBrainThoughtNewOrLoad }
  ])

  meta   = api.module.request("app:meta.js")
  brain  = api.module.request("app:brain.js")
  shared = api.module.request("shared.js")
  layers = api.module.request("layer/shared")

  t      = api.l10n.get("nodes/assets/translation.json")
}

function unload(api) {
  api.events.unsubscribe()
}

function onMouseDown(event) {
  if (!event.event.ctrlKey) return
  var offset   = shared.getLayerOffset()
  var parentId = shared.getDigStackTopId()

  brain.createThought(t.newThought, event.point.x + offset.x, event.point.y + offset.y, parentId)
}

function onBrainThoughtNewOrLoad(event) {
  var offset   = shared.getLayerOffset()
  var thought  = event.thought
  var parentId = thought.location.parent || "root"
  var node     = {}

  node.root = new Group();
  node.root.pivot = new Point(0, 0)

  api.events.notify("visual.thought.create", { node: node, thought: thought })

  node.target = new Path.Circle({
    radius:    15,
    fillColor: "LightSlateGray"
  })

  node.text = new PointText({
    point:         [20, 0],
    justification: "left",
    fontSize:      16,
    content:       thought.title
  })

  node.root.addChildren([node.target, node.text])

  node.target.onClick = function() {
    api.events.notify("brain.thought.select", thought)
    api.events.notify("visual.thought.select", node)
  }
  node.target.onMouseDown = function(e) {
    api.events.notify("visual.thought.mouse.down", {
      node: node, thought: thought, point: e.point })
  }
  node.target.onMouseUp = function(e) {
    api.events.notify("visual.thought.mouse.up", {
      node: node, thought: thought, point: e.point })
  }
  node.target.onMouseDrag = function(e) {
    api.events.notify("visual.thought.drag", {
      node: node, thought: thought, point: e.point })
  }

  api.events.notify("visual.thought.created", {
    node: node, thought: thought
  })

  layers.getLayer("nodes:" + parentId).addChild(node.root)

  meta.set(thought._id, "visual", node)

  node.root.position = new Point(thought.location.x - offset.x, thought.location.y - offset.y)
}

var api
var shared
var meta
var brain
var t

module.exports = {
  info: {
    id:      "digitalBrain.visual.nodes.create",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
