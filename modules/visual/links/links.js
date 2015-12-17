// Visual Module :: Links

function load(mapi, config) {
  api = mapi

  api.events.subscribe([
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "key.down",             handler: onKeyDown },
  ])

  api.module.request("links/features/load.js")
  api.module.request("links/features/create.js")
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

var api
var selectedThought
var isLinking = false

module.exports = {
  info: {
    id:          "digitalBrain.visual.links",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },
  load: load, unload: unload
}
