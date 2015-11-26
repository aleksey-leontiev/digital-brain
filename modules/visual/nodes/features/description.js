// Visual :: Nodes :: Description
// Adds description to the node

function load(api, config) {
  api.events.subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate }
  ])
}

function unload(api) {
  api.events.unsubscribe()
  // TODO: remove description nodes
}

function onVisualThoughtCreate(event) {
  event.node.description = new PointText({
    point: [20, 12],
    justification: 'left',
    fontSize: 12,
    fillColor: 'slategray',
    content: (event.thought.description || "").substring(0, 50)
  });

  event.node.group.addChild(event.node.description);
}

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.description",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
