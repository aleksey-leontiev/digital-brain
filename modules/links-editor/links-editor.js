
function init(app, config) {
  // Create overlay
  overlay = createOverlay(
    "links-editor-overlay",
    config.moduleRootPath + "view.html")

  subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "brain.open.completed",           handler: buildAutocomplete},

    { view: "#lem_link-title", id: "change", handler: onChnaged },
    { view: "#lem_link-description", id: "change", handler: onChnaged },

    { view: "#lem_add-new", id: "click", handler: onAddNew },


    { delegate: "#lem_links", view: ".lem_link-item", id: "click", handler: onLinkClick }
  ])

  // Load additional modules
  var loaded = loadModules(config.appRootPath, ["modules/shared"], config)
  shared = loaded[0]

  // prepare autocomplete
}

function buildAutocomplete(argument) {
  var e = document.getElementById("lem_link-to2")
  var s = shared.getThoughts()

  var _ = require("underscore")

  var s = _.map(s, function(z,x) { return {id:z._id, value:z.title, text:z.description} })
  UIkit.autocomplete(e, { source: s });

  UIkit.$('#lem_link-to2').on('selectitem.uk.autocomplete', function (e, data, ac) {
    $("#lem_link-id").val(data.id) //console.log(data)
    onChnaged(null)
  });
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (isShortcutPressed(event)) {
    isThoughtOpen = !isThoughtOpen

    if (isThoughtOpen) {
      onBrainThoughtOpen(activeThought)
      //notify("brain.thought.open", activeThought)
    } else {
      onBrainThoughtClose(activeThought)
      //notify("brain.thought.close", activeThought)
    }
  }
}

function onBrainThoughtOpen(thought) {
  $("#lem_links").html("")

  thought.links.forEach(function(link, index) {
    $("#lem_links").append(
      linkView(link, index)
    )
  })

  overlay.show()
}

function onBrainThoughtClose(thought) {
  save()
  overlay.hide()
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

function onLinkClick(event) {
  var linkId = $(event.target).closest(".lem_link-item").data("link-id")
  var link = activeThought.links[linkId]
  activeLink = link

  $("#lem_link-title").val(link.title)
  $("#lem_link-description").val(link.description)
}

function onChnaged(event) {
  activeLink.title = $("#lem_link-title").val()
  activeLink.description = $("#lem_link-description").val()
  if ($("#lem_link-id").val() != "") {
    activeLink.to = $("#lem_link-id").val()
  }

  notify("brain.thought.changed", activeThought)

  console.log(activeThought);
}

function onAddNew(event) {
  activeThought.links.push({
    type: "ref", title: "Untitled"
  })
  onBrainThoughtOpen(activeThought)
}

function isShortcutPressed(event) {
  return (event.char == "B") && event.ctrlKey
}

function save() {
  notify("brain.thought.changed", activeThought)
}

function linkView(link, id) {
  var linkTo = shared.getThoughtById(link.to) || { title: "?", description: "?" }

  return "" +
    "<div class='uk-panel uk-panel-box lem_link-item' data-link-id='" + id + "'>" +
    "  <div class='uk-panel-badge uk-badge'> " + (link.type || "") + "</div>" +
    "  <h3 class='uk-panel-title'>" + (linkTo.title || "") + "</h3>" +
    "  " + (link.description || "")+
    "</div>"
}

var activeThought = null
var overlay = null
var isThoughtOpen = false
var shared = null
var activeLink = null

module.exports = { init: init }
