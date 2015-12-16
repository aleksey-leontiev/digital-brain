// Shared Brain Library

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "brain.open",         handler: onBrainOpen },
    { id: "brain.thought.load", handler: onBrainThoughtLoadOrCreate },
    { id: "brain.thought.new",  handler: onBrainThoughtLoadOrCreate },
    { id: "brain.links.create", handler: onBrainLinksCreate }
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

function onBrainLinksCreate(event) {
  var forwardLinkCreated  = linkThoughts(event.from, event.to)
  var backwardLinkCreated = linkThoughts(event.to,   event.from, "backward")

  api.events.notify("brain.links.created", {
    from: event.from, to: event.to,
    forwardLinkCreated:  forwardLinkCreated,
    backwardLinkCreated: backwardLinkCreated
  })
}

function getThoughts() {
  return thoughtById
}

function getThoughtsArray() {
  var underscore = require("underscore")
  return underscore.map(thoughtById)
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

function createThought(title, x, y) {
  var thought = {
    _id:      generateId(),
    title:    title,
    location: { x: x, y: y }
  }

  api.events.notify("brain.thought.new", { thought: thought })
}

function generateId() {
  return require("shortid").generate()
}

var api
var thoughtById = {}

module.exports = {
  info: {
    id:      "digitalBrain.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load:             load,
  unload:           unload,
  getThoughtById:   getThoughtById,
  getThoughts:      getThoughts,
  getThoughtsArray: getThoughtsArray,
  linkThoughts:     linkThoughts,
  hasLinkTo:        hasLinkTo,
  createThought:    createThought
}
