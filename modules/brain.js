// Shared Brain Library

function load(api) {
  api.events.subscribe([
    { id: "brain.open",         handler: onBrainOpen },
    { id: "brain.thought.load", handler: onBrainThoughtLoadOrCreate },
    { id: "brain.thought.new",  handler: onBrainThoughtLoadOrCreate }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainOpen(event) {
  thoughtById = {}
}

function onBrainThoughtLoadOrCreate(event) {
  thoughtById[event.thought._id] = event.thought
}

function getThoughts() {
  return thoughtById
}

function getThoughtById(id) {
  return thoughtById[id]
}

var thoughtById = {}

module.exports = {
  info: {
    id:      "digitalBrain.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load:           load,
  unload:         unload,
  getThoughtById: getThoughtById,
  getThoughts:    getThoughts
}
