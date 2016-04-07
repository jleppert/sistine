var electron = require('electron');
var express = require('express');
var browserify = require('browserify-middleware');
var livereload = require('livereload');

var electronApp = electron.app;
var web = express();

web.use('/', express.static(__dirname + '/static'));
web.use('/client', browserify(__dirname + '/client'));

web.listen(9000, function () {
  console.log('Started listening on port 9000!');
});

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + '/client');
liveReloadServer.watch(__dirname + '/static');

var BrowserWindow = electron.BrowserWindow;

var mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/static/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

electronApp.on('ready', createWindow);
electronApp.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

electronApp.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
