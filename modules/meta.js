// Shared Library

function load(api) {}
function unload(api) {}

function get(thoughtId, metaKey) {
  return meta[thoughtId + ":" + metaKey]
}

function set(thoughtId, metaKey, value) {
  meta[thoughtId + ":" + metaKey] = value
}

var meta = {}

module.exports = {
  info: {
    id:      "digitalBrain.visual.shared.meta",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load:    load,
  unload:  unload,
  get: get,
  set: set
}
