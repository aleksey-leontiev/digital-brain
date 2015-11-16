// Shared Library

function init(app) {
  subscribe([
    { id: "brain.thought.load", handler: onBrainThoughtLoadOrCreate },
    { id: "brain.thought.new",  handler: onBrainThoughtLoadOrCreate }
  ])
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
  init:                     init,
  getThoughtById:           getThoughtById,
  getThoughts : getThoughts
}
