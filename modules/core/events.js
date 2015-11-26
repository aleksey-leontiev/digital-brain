// Events Module
// subscribe/unsubscribe on events

function load(api, config) { }
function unload(api) { }

// events: { id: "eventId", handler: callbackFunction }
// group : group name
function subscribe(events, group) {
  saveMeta(group, events) // save metas for future usages

  events.forEach(function (event) {
    if (event.view == null) {
      saveHandler(event.id, event.handler, group)
    } else {
      $(document).on(event.id, event.view, function(d) { event.handler(d) })
    }
  })
}

function unsubscribe(group) {
  // delete handlers
  for (key in handlers) {
    handlers[key].forEach(function (h, idx) {
      if (h.group == group) { deleteHandler(key, idx) }
    })
  }

  // delete view handlers
  metas[group].forEach(function (meta) {
    meta.forEach(function (event) {
      if (event.view) { $(document).off(event.id, event.view) }
    })
  })

  // delete metas
  deleteMeta(group)
}

function notify(eventId, eventData) {
  handler = handlers[eventId]
  if (handler == null) return

  handler.forEach(function(h) { h.handler(eventData) })
}

function request(eventId, eventData) {
  result  = null
  handler = handlers[eventId]
  if (handler == null) return

  handler.forEach(function(h) { result = h.handler(eventData) })

  return result
}

function commitToApi(data) {
  return {
    events: {
      subscribe:    function (list) { return subscribe(list, data.moduleId) },
      unsubscribe:  function (list) { return unsubscribe(data.moduleId) },
      notify:       notify,
      request:      request
    }
  }
}

// private memebers:

// find meta of specified events group
// caches if no meta found
function saveMeta(group, events) {
  var meta = metas[group]
  if (meta == null) metas[group] = []
  metas[group].push(events)
  return meta
}

// deletes meta from cache
function deleteMeta(group) {
  delete metas[group]
}

function saveHandler(id, handler, group) {
  if (handlers[id] == undefined) {
    handlers[id] = []
  }

  handlers[id].push({ handler: handler, group: group })
}

function deleteHandler(id, idx) {
  handlers[id].splice(idx, 1)
}

var handlers = {} // event handlers map
var metas    = {} // metas for view handlers

module.exports = {
  info: {
    id:          "digitalBrain.core.events",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "It provides event-driven application model. It allows you to " +
                 "subscribe and unsubscribe from events, as well as notification " +
                 "of events."
  },

  load:        load,
  unload:      unload,
  commitToApi: commitToApi
}
