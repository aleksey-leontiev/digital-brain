// Brains Module

function load(api) {
  api.events.notify("brain.open", { path: api.app.config.userDataPath + "_brain" })
}

module.exports = {
  info: {
    id:      "digitalBrain.extras.brains",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load
}
