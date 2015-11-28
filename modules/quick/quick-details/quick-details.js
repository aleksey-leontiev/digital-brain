// Quick Details Module
// Allows to modify common fields like title, description, style or image of
// selected thought

function load(mapi, config) {
  api = mapi

  modifiers = api.module.request("features/styles", config)

  view = {
    root:        api.views.commitToPanel("view.html", {
                   predefined: modifiers.getPredefinedStyles()
                 }),
    title:       $("#qd-thought-title"),
    description: $("#qd-thought-description"),
    style:       $("#qd-thought-style"),
    image:       $("#qd-thought-image")
  }

  api.events.subscribe([
    { id: "brain.thought.select",      handler: onBrainThoughtSelect },
    { id: "visual.thought.created",    handler: onVisualThoughtCreated },

    { view: "#qd-thought-title",       id: "change",   handler: onFieldsChanged },
    { view: "#qd-thought-description", id: "change",   handler: onFieldsChanged },
    { view: "#qd-thought-style",       id: "change",   handler: onFieldsChanged },
    { view: "#qd-thought-image",       id: "change",   handler: onFieldsChanged },

    { view: "#qd-thought-title",       id: "input",    handler: onFieldsChanging },
    { view: "#qd-thought-description", id: "input",    handler: onFieldsChanging },

    { view: ".thought-style",          id: "click",    handler: onStyleItemClicked },

    { view: "#qd-thought-image",       id: "dragover",  handler: onImageDragOver },
    { view: "#qd-thought-image",       id: "dragleave", handler: onImageDragLeave },
    { view: "#qd-thought-image",       id: "drop",      handler: onImageDrag },
  ])
}

function unload(api) {
  api.events.unsubscribe()
  view.root.remove()
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
  updateFieldsFromThought(selectedThought)

  var node = api.events.request("visual.get", thought._id)
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
  view.image.attr("src", thought.image || "assets/placeholder.jpg")
}

function updateThoughtFromFields(thought) {
  thought.title       = view.title.val()
  thought.description = view.description.val()
  thought.style       = view.style.data("thought-style")
  thought.image       = view.image.attr("src")

  var node = api.events.request("visual.get", thought._id)
  applyStyle(thought, node)
}

function applyStyle(thought, node) {
  var styles = thought.style
  if (styles == null) return

  styles.split(' ').forEach(function (s) {
    var m = modifiers.getPredefinedStyles()[s]
    if (m) {
      node.group.scaling  = new Point(m.scaling, m.scaling)
      node.path.fillColor = m.thoughtColor
      node.text.fillColor = m.textColor
      node.description.fillColor = m.descriptionColor
    }
  })
}

function onImageDragOver(event) {
  event = event.originalEvent
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  view.image.addClass('dragging');
}

function onImageDragLeave(event) {
  event = event.originalEvent
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'none';
  view.image.removeClass('dragging');
}

function onImageDrag(event) {
  event = event.originalEvent
  event.stopPropagation();
  event.preventDefault();

  var files = event.dataTransfer.files;
  for (var i = 0, f; f = files[i]; i++) {
    view.image.attr("src", "file://" + f.path)
  }
  updateThoughtFromFields(selectedThought)
  api.events.notify("brain.thought.changed", selectedThought)
  view.image.removeClass('dragging');
}

var selectedThought = null
var modifiers
var view = {}
var api

module.exports = {
  info: {
    id:          "digitalBrain.quick.details",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Allows to modify common fields like title, description, style or image of selected thought"
  },

  load: load, unload: unload,
}
