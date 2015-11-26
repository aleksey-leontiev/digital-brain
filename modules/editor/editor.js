
function load(mapi, config) {
  api = mapi

  // Subscribe for events
  api.events.subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.open",   handler: onBrainThoughtOpen },
    { id: "brain.thought.close",  handler: onBrainThoughtClose },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "window.resize",        handler: onWindowResize }
  ])

  // Load dependencies
  api.assets.loadJSAsync("bower_components/ckeditor/ckeditor.js", configureEditor)

  // Create overlay
  view = {
    overlay: api.views.createOverlay("view.html")
  }
}

function unload(api) {
  api.events.unsubscribe()
  view.overlay.remove()
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (isShortcutPressed(event)) {
    isThoughtOpen = !isThoughtOpen

    if (isThoughtOpen) {
      api.events.notify("brain.thought.open", activeThought)
    } else {
      api.events.notify("brain.thought.close", activeThought)
    }
  }
}

function onBrainThoughtOpen(thought) {
  view.overlay.show()
  view.editor.setData(activeThought.content || "")
}

function onBrainThoughtClose(thought) {
  save()
  view.overlay.hide()
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

function onWindowResize() {
  view.editor.resize(
    view.overlay.width(),
    view.overlay.height())
}

function isShortcutPressed(event) {
  return (event.char == "O") && event.ctrlKey
}

function save() {
  activeThought.content = view.editor.getData()
  api.events.notify("brain.thought.changed", activeThought)
}

function configureEditor(argument) {
  CKEDITOR.replace('em_ThoughtEditor', { width:"100%", height: "100%"});
  view.editor = CKEDITOR.instances.em_ThoughtEditor
}

var api
var view
var activeThought = null
var isThoughtOpen = false

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.editor",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
