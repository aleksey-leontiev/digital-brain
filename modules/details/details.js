// Details Panel
// Allows to modify title and description fields of selected thought

function init(app) {
  commitView("modules/details/view.html")

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

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  updateFieldsFromThought()
}

function onThoughtChanged() {
  updateThoughtFromFields()
  notify("brain.thought.changed", selectedThought)
}

function onThoughtChanging() {
  updateThoughtFromFields()
  notify("brain.thought.changing", selectedThought)
}

function updateFieldsFromThought() {
  thoughtTitle.val(thought.title || "")
  thoughtDescription.val(thought.description || "")
}

function updateThoughtFromFields() {
  selectedThought.title       = thoughtTitle.val()
  selectedThought.description = thoughtDescription.val()
}

var selectedThought    = null
var thoughtTitle       = null
var thoughtDescription = null

module.exports = { init: init }
