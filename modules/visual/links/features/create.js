// Visual Module :: Links :: Create

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "brain.links.created",  handler: onBrainLinksCreated }
  ])

  t      = api.l10n.get("links/assets/translation.json")
  links  = api.module.request("links/shared")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  if (isLinking) {
    api.events.notify("brain.links.create", { from: selectedThought, to: thought })
  }
  selectedThought = thought
  setLinkingState(false)
}

function onKeyDown(event) {
  if (event.char == "L" && event.ctrlKey && selectedThought != null)
    setLinkingState(true)
}

function setLinkingState(value) {
  isLinking = value
}

function onBrainLinksCreated(event) {
  nodeFrom = shared.getVisualNode(event.from._id)
  nodeTo   = shared.getVisualNode(event.to._id)
  links.create(nodeFrom, nodeTo)

  if (event.forwardLinkCreated && event.backwardLinkCreated) {
    api.events.notify("notification", { message: t.linkCreated })
  } else if (!event.forwardLinkCreated && !event.backwardLinkCreated) {
    api.events.notify("notification", { message: t.linkAlreadyExists })
  } else {
    api.events.notify("notification", { message: t.linkUpdated })
  }
}

var t
var api
var links
var selectedThought
var isLinking = false

module.exports = {
  info: {
    id:          "digitalBrain.visual.links.create",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },

  load: load, unload: unload
}
