// Events Module
// subscribe/unsubscribe on events

function subscribe(eventId, eventHandler) {
  h = eventHandlers[eventId]
  if (h == null) { eventHandlers[eventId] = [] }
  eventHandlers[eventId].push(eventHandler)
}

function subscribeList(events) {
  events.forEach(function (event) {
    if (event.view == null) {
      subscribe(event.id, event.handler)
    } else {
      $(event.view).on(event.id, function() { event.handler() })
    }
  })
}

function unsubscribe(handler) {
}

function notify(eventId, eventData) {
  handler = eventHandlers[eventId]
  if (handler == null) return

  handler.forEach(function(h) { h(eventData) })
}

function request(eventId, eventData) {
  result  = null
  handler = eventHandlers[eventId]
  if (handler == null) return

  handler.forEach(function(h) { result = h(eventData) })

  return result
}

var eventHandlers = {}

module.exports = {
  subscribe: subscribe,
  subscribeList: subscribeList,
  unsubscribe: unsubscribe,
  request: request,
  notify: notify
}
