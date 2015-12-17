// Notifications Module

function load(api) {
  api.events.subscribe([
    { id: "notification", handler: onNotification }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onNotification(event) {
  UIkit.notify(event.message, { status: event.status, pos: 'top-left' })
  console.log(event)
}

module.exports = {
  load: load, unload,

  info: {
    id:      "digitalBrain.notification",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
