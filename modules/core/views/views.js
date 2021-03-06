// Views Module
// Provides functionality to manipulate UI

function load(api, config) {
  fs      = require("fs")
  shortid = require("shortid")
  npath   = require('path')
  handlebars = require('handlebars');
}

function template(path) {
  var view = fs.readFileSync(path, 'utf8')
  return handlebars.compile(view)
}

function commitToPanel(path, templateData) {
  var view = fs.readFileSync(path, 'utf8')
  var dom = ""

  if (templateData) {
    var template = handlebars.compile(view)
    dom          = $(template(templateData))
  } else {
    dom = $(view)
  }

  dom.appendTo("#panel")
  return dom
}

function createOverlay(path) {
  var id   = shortid.generate()
  var view = processView(fs.readFileSync(path, 'utf8'), {path: path})

  $("body").append(
    "<div id='" + id + "' class='overlay'></div>"
  )

  return $("#" + id).append(view)
}

function appendView(path, root) {
  var view = fs.readFileSync(path, 'utf8')
  var p = npath.parse(npath.normalize(path)).dir
  view = view.replace(/{{root}}/g, p)

  $(root).append(view)
}

function processView(view, data) {
  var p = npath.parse(npath.normalize(data.path)).dir

  view = view.replace(/{{module.rootPath}}/g, p)

  return view
}

function commitToApi(data) {
  return {
    views: {
      createOverlay: function(path)       { return createOverlay(data.rootPath+path) },
      commitToPanel: function(path, templateData) { return commitToPanel(data.rootPath+path, templateData) },
      appendView:    function(path, root) { return appendView(data.rootPath + path, root ) },
      template:      function(path) { return template(data.rootPath + path ) }
    }
  }
}

var fs
var shortid
var npath
var handlebars

module.exports = {
  info: {
    id:          "digitalBrain.core.views",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Provides functionality to manipulate UI.",
    core:        true
  },

  load: load,
  commitToApi: commitToApi
}
