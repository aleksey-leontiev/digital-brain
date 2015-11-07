var app = require('app');
var BrowserWindow = require('browser-window');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

global.app = app
global.userDataPath = app.getPath("userData") + "/"

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/app.html');

  //mainWindow.webContents.on('dom-ready', function() {
  //  mainWindow.webContents.executeJavaScript("window.userDataPath = '" + app.getPath("userData") + "/'")
  //})
  //mainWindow.webContents.executeJavaScript("window.test = 123")
  //mainWindow.toggleDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
