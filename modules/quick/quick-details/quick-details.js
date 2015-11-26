// Quick Details Module
// Allows to modify common fields like title, description, style or image of
// selected thought

function load(mapi, config) {
  api = mapi

  view = {
    root:        api.views.commitToPanel("view.html"),
    title:       $("#qd-thought-title"),
    description: $("#qd-thought-description"),
    style:       $("#qd-thought-style"),
    image:       $("#qd-thought-image")
  }

  api.events.subscribe([
    { id: "brain.thought.select",      handler: onBrainThoughtSelect },
    { id: "visual.thought.created",    handler: onVisualThoughtCreated },

    { view: "#qd-thought-title",       id: "change", handler: onFieldsChanged },
    { view: "#qd-thought-description", id: "change", handler: onFieldsChanged },
    { view: "#qd-thought-style",       id: "change", handler: onFieldsChanged },
    { view: "#qd-thought-image",       id: "change", handler: onFieldsChanged },

    { view: "#qd-thought-title",       id: "input",  handler: onFieldsChanging },
    { view: "#qd-thought-description", id: "input",  handler: onFieldsChanging },

    { view: ".thought-style",          id: "click",  handler: onStyleItemClicked }
  ])
}

function unload(api) {
  api.events.unsubscribe()
  view.root.remove()
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  updateFieldsFromThought(selectedThought)
}

function onVisualThoughtCreated(event) {
  applyStyle(event.thought, event.node)
}

function onFieldsChanged() {
  if (selectedThought == null) return;
  updateThoughtFromFields(selectedThought)
  api.events.notify("brain.thought.changed", selectedThought)
}

function onFieldsChanging() {
  if (selectedThought == null) return;
  updateThoughtFromFields(selectedThought)
  api.events.notify("brain.thought.changing", selectedThought)
}

function onStyleItemClicked(event) {
  var style = $(event.target).data("style-name")
  view.style.data("thought-style", style)

  updateThoughtFromFields(selectedThought)
  api.events.notify("brain.thought.changed", selectedThought)
}

function updateFieldsFromThought(thought) {
  view.title.val(thought.title || "")
  view.description.val(thought.description || "")
  view.style.data(thought.style || "")
  view.image.val(thought.image || "")
}

function updateThoughtFromFields(thought) {
  thought.title       = view.title.val()
  thought.description = view.description.val()
  thought.style       = view.style.data("thought-style")
  thought.image       = view.image.val()

  var node = request("visual.get", thought._id)
  applyStyle(thought, node)
}

function applyStyle(thought, node) {
  styles = thought.style

  if (styles == null) return

  styles.split(' ').forEach(function (s) {
    if (s == "big") {
      node.group.scaling = new Point(2, 2)
    }
    if (s == "normal") {
      node.group.scaling = new Point(1, 1)
    }
    if (s == "small") {
      node.group.scaling = new Point(.75, .75)
    }
    if (s == "important") {
      node.path.fillColor = "red"
      node.text.fillColor = "red"
      if (node.description) node.description.fillColor = "darkred"
    }
  })
}

var selectedThought = null
var view = {}
var api

module.exports = {
  load: load,
  unload: unload,
  info: {
    id: "digitalBrain.quick.details",
    version: "0.1",
    author: "Alexey Leontiev",
    description: "Allows to modify common fields like title, description, style or image of selected thought"
  }
}
