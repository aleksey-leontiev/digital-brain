// Details Panel
// shows details of selected thought

function init(app) {
  commitView("modules/details_panel/view.html", "Details")

  thoughtTitle       = $("#thought-title")
  thoughtDescription = $("#thought-description")

  subscribe([
    { id: "brain.thought.select",   handler: onBrainThoughtSelect },

    { view: "#thought-title",       id: "change", handler: onThoughtChanged },
    { view: "#thought-description", id: "change", handler: onThoughtChanged },

    { view: "#thought-title",       id: "input",  handler: onThoughtChanging },
    { view: "#thought-description", id: "input",  handler: onThoughtChanging }
  ])
}

function onThoughtChanged() {
  updateThoughtDataFromFields()
  notify("brain.thought.changed", activeThought)
}

function onThoughtChanging() {
  updateThoughtDataFromFields()
  notify("brain.thought.changing", activeThought)
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
  thoughtTitle.val(thought.title || "")
  thoughtDescription.val(thought.description || "")
}

function updateThoughtDataFromFields() {
  activeThought.title       = thoughtTitle.val()
  activeThought.description = thoughtDescription.val()
}

var activeThought = null
var thoughtTitle  = null
var thoughtDescription = null

module.exports = { init: init }
