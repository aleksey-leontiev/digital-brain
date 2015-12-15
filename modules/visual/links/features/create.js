// Visual Module :: Links :: Create

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "brain.links.create", handler: onBrainLinksCreate }
  ])

  t      = api.l10n.get("links/assets/translation.json")
  brain  = api.module.request("app:brain.js")
  links  = api.module.request("links/shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}


function onBrainLinksCreate(event) {
  // TODO: MOVE TO BRAIN SHARED LIBRARY
  var forwardLinkCreated  = brain.linkThoughts(event.from, event.to)
  var backwardLinkCreated = brain.linkThoughts(event.to,   event.from, "backward")

  if (forwardLinkCreated && backwardLinkCreated) {
    api.events.notify("notification", { message: t.linkCreated })
  } else if (!forwardLinkCreated && !backwardLinkCreated) {
    api.events.notify("notification", { message: t.linkAlreadyExists })
  } else {
    api.events.notify("notification", { message: t.linkUpdated })
  }

  // create visual node
  nodeFrom = shared.getVisualNode(event.from._id)
  nodeTo   = shared.getVisualNode(event.to._id)
  links.create(nodeFrom, nodeTo)
}

var t
var api
var brain
var links

module.exports = {
  info: {
    id:          "digitalBrain.visual.links.create",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },
  load: load, unload: unload
}
