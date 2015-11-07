// Persistence Module

function init(app) {
  var PouchDB = require('pouchdb');
  db = new PouchDB(app.config.userDataPath + "_brain");

  subscribe([
    { id: "brain.thought.new",     handler: onBrainThoughtNew },
    { id: "brain.thought.find",    handler: onBrainThoughtFind },
    { id: "brain.open",            handler: onBrainOpen },
    { id: "brain.thought.changed", handler: onBrainThoughtChanged }
  ])
}

function onBrainThoughtNew(thought) {
  db.put(thought).then(function(result) {
    thought._id  = result.id
    thought._rev = result.rev
  }).catch(function(err) {
    notifyError("Unable to save thought", err)
  });
}

function onBrainThoughtFind(query) {
  var val = query.query.toLowerCase()
  db.query(queryFunc).then(function(result) {
    notify("brain.thought.find:response", result.rows)
  }).catch(function(error) {
    notifyError("Unable to search", error)
  })
}

function onBrainOpen(event) {
  options = { include_docs: true }

  db.allDocs(options).then(function(result) {
    result.rows.forEach(function(row) {
      notify("brain.thought.load", row.doc)
    })
    notify("brain.open.completed", result.rows)
  }).catch(function (err) {
    notifyError("Unable to open brain", err)
  })
}

function onBrainThoughtChanged(thought) {
  db.put(thought).then(function(result) {
    thought._rev = result.rev
  }).catch(function(error) {
    notifyError("Unable to save changes", error)
  })
}

function queryFunc(doc) {
  if (doc.title.toLowerCase().indexOf(val) != -1 ||
      (doc.description || "").toLowerCase().indexOf(val) != -1)
    emit(doc)
}

function notifyError(message, err) {
  notify("notification", {
    message: message + ": " + err.message,
    status:  "danger",
    data: err })
}

db = null

module.exports = { init: init }
