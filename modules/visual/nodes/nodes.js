// Visual Nodes Module

function init(app, config) {
  app.modules.loadModules(config.moduleRootPath, [
    "nodes/features/create",
    "nodes/features/drag",
    "nodes/features/select",
    "nodes/features/update",
    "nodes/features/description",
    "nodes/features/style"
  ], config)
}

module.exports = { init: init }
