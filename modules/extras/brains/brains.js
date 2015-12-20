// Brains Module

function load(api) {
  var name = (app.config.appRootPath == "/Users/aleontiev/Projects/digital-brain/") ?
    "digitalBrain-debug" : "digitalBrain";

  api.events.notify("brain.open", { path: api.app.config.userDataPath + name })
}

module.exports = {
  info: {
    id:      "digitalBrain.extras.brains",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load
}
