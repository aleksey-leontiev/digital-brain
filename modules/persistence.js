// Persistence Module
// Stores the thoughts in the database.

function init(app) {
  var PouchDB = require('pouchdb');
  dataBase    = new PouchDB(app.config.userDataPath + "_brain");

  subscribe([
    { id: "brain.thought.new",     handler: onBrainThoughtNew },
    { id: "brain.thought.search",  handler: onBrainThoughtSearch },
    { id: "brain.open",            handler: onBrainOpen },
    { id: "brain.thought.changed", handler: onBrainThoughtChanged }
  ])
}

function onBrainThoughtNew(event) {
  dataBase.put(event.thought).then(function(result) {
    event.thought._id  = result.id
    event.thought._rev = result.rev
  }).catch(function(err) {
    notifyError("Unable to save thought", err)
  });
}

function onBrainThoughtSearch(query) {
  var val = query.query.toLowerCase()
  dataBase.query(queryFunc).then(function(result) {
    notify("brain.thought.search.response", result.rows)
  }).catch(function(error) {
    notifyError("Unable to search", error)
  })
}

function onBrainOpen(event) {
  options = { include_docs: true }

  dataBase.allDocs(options).then(function(result) {
    result.rows.forEach(function(row) {
      notify("brain.thought.load", { thought: row.doc })
    })
    notify("brain.open.completed", result.rows)
  }).catch(function (err) {
    notifyError("Unable to open brain", err)
  })
}

function onBrainThoughtChanged(thought) {
  dataBase.put(thought).then(function(result) {
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

dataBase = null

module.exports = { init: init }
