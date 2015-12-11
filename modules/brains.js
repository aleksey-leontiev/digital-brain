// Shared Library

function load(api) {
  api.events.notify("brain.open", { path: app.config.userDataPath + "_brain" })
}

module.exports = {
  info: {
    id:      "digitalBrain.brains",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load
}
