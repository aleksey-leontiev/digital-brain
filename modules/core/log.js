
function load(api, config) {
}

function unload(api) {
}

function commitToApi(argument) {
  return {
    log: {
      write: log
    }
  }
}

function write(msg) {
  console.log(msg)
}

global.log = write

module.exports = {
  info: {
    id:          "digitalBrain.core.log",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "It provides logging functionality."
  },

  load:        load,
  unload:      unload,
  commitToApi: commitToApi,

  write: write
}
