const electron = window.require('electron')
const { desktopCapturer } = require('electron')
const $ = require('jquery')
const path = require('path')
const screenshot = require('screenshot-desktop')

$(document).ready(function() {
    $("#captureScreens").click(function() {
        let date_ = new Date();
        screenshot({ filename: path.join(__dirname, 'screenshots', date_.getTime() + ".png") })
    });
});