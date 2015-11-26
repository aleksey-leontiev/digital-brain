// Shared Library

function load(mapi, config) {
  api = mapi

  api.events.subscribe([
    { id: "brain.thought.load", handler: onBrainThoughtLoadOrCreate },
    { id: "brain.thought.new",  handler: onBrainThoughtLoadOrCreate }
  ])
}

function unload(mapi) {
  api.events.unsubscribe()
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

var api
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
