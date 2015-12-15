// Shared Brain Library

function load(mapi) {
  api = mapi

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

function hasLinkTo(thought, thoughtToId) {
  var underscore = require("underscore")
  var ids = underscore.map(thought.links, function(link) { return link.to })
  return underscore.contains(ids, thoughtToId)
}

function linkThoughts(thoughtFrom, thoughtTo, type) {
  if (thoughtFrom.links == null) { thoughtFrom.links = {} }

  var linkAlreadyExists = hasLinkTo(thoughtFrom, thoughtTo._id)
  if (!linkAlreadyExists) {
    thoughtFrom.links.push({ to: thoughtTo._id, type: type || "forward" })
    api.events.notify("brain.thought.changed", thoughtFrom)
    return true
  } else {
    return false
  }
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
  getThoughts:    getThoughts,
  linkThoughts: linkThoughts,
  hasLinkTo: hasLinkTo
}
