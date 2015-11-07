// Notifications Module

function init(app) {
  subscribe([
    { id: "notification", handler: onNotification }
  ])
}

function onNotification(event) {
  UIkit.notify(event.message, { status: event.status, pos: 'top-right' })
  console.log(event.data)
}

module.exports = { init: init }
