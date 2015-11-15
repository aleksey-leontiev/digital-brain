
function init(app, config) {
  subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.open",   handler: onBrainThoughtOpen },
    { id: "brain.thought.close",  handler: onBrainThoughtClose },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
  ])

  // Configure ckeditor
  CKEDITOR.config.toolbarCanCollapse = true;

  // Create overlay
  overlay = createOverlay(
    "editor-overlay",
    config.moduleRootPath + "view.html")
  editor = CKEDITOR.instances.em_ThoughtEditor
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (isShortcutPressed(event)) {
    isThoughtOpen = !isThoughtOpen

    if (isThoughtOpen) {
      notify("brain.thought.open", activeThought)
    } else {
      notify("brain.thought.close", activeThought)
    }
  }
}

function onBrainThoughtOpen(thought) {
  overlay.show()
  editor.setData(activeThought.content || "")
}

function onBrainThoughtClose(thought) {
  save()
  overlay.hide()
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

function isShortcutPressed(event) {
  return (event.char == "O") && event.ctrlKey
}

function save() {
  activeThought.content = editor.getData()
  notify("brain.thought.changed", activeThought)
}

var activeThought = null
var overlay = null
var editor = null
var isThoughtOpen = false

module.exports = { init: init }
