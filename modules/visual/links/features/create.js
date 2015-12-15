// Visual Module :: Links :: Create

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "brain.links.created", handler: onBrainLinksCreated }
  ])

  t      = api.l10n.get("links/assets/translation.json")
  links  = api.module.request("links/shared.js")
}

function unload(api) {
  api.events.unsubscribe()
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

module.exports = {
  info: {
    id:          "digitalBrain.visual.links.create",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },

  load: load, unload: unload
}
