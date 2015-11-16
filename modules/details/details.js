// Details Panel
// Allows to modify title and description fields of selected thought

function init(app) {
  commitView("view.html", __dirname)

  thoughtTitle       = $("#thought-title")
  thoughtDescription = $("#thought-description")
  thoughtStyle       = $("#thought-style")

  subscribe([
    { id: "brain.thought.select",   handler: onBrainThoughtSelect },

    { view: "#thought-title",       id: "change", handler: onThoughtChanged },
    { view: "#thought-description", id: "change", handler: onThoughtChanged },
    { view: "#thought-style",       id: "change", handler: onThoughtChanged },

    { view: "#thought-title",       id: "input",  handler: onThoughtChanging },
    { view: "#thought-description", id: "input",  handler: onThoughtChanging }
  ])
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  updateFieldsFromThought(selectedThought)
}

function onThoughtChanged() {
  if (selectedThought == null) return;
  updateThoughtFromFields(selectedThought)
  notify("brain.thought.changed", selectedThought)
}

function onThoughtChanging() {
  if (selectedThought == null) return;
  updateThoughtFromFields(selectedThought)
  notify("brain.thought.changing", selectedThought)
}

function updateFieldsFromThought(thought) {
  thoughtTitle.val(thought.title || "")
  thoughtDescription.val(thought.description || "")
  thoughtStyle.val(thought.style || "")
}

function updateThoughtFromFields(thought) {
  thought.title       = thoughtTitle.val()
  thought.description = thoughtDescription.val()
  thought.style       = thoughtStyle.val()
}

var selectedThought    = null
var thoughtTitle       = null
var thoughtDescription = null
var thoughtStyle       = null

module.exports = { init: init }
