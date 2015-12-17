
function load(mapi) {
  api = mapi

  // Subscribe for events
  api.events.subscribe([
    { id: "brain.open.completed", handler: onBrainOpenCompleted }
  ])

  // Create overlay
  view = {
    overlay: api.views.createOverlay("view.html")
  }
  view.overlay.show()
}

function unload(mapi) {
  mapi.events.unsubscribe()
  view.overlay.remove()
}

function onBrainOpenCompleted(event) {
  view.overlay.delay(500).fadeOut(1500)
}

var api
var view

module.exports = {
  info: {
    id:      "digitalBrain.extras.loading",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  config: {
    delay: 500,
    speed: 1500
  },

  load: load, unload: unload
}
