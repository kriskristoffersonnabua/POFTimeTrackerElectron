const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const showHomePage = function () {
    $("#root").html(home_page);
}

var home_page = heredoc.strip(function() {/*
    <div>
        <div class="left-sidebar">
            <div id="user_info">
            </div><br/>
            <div id="projects">
            </div>
        </div>
        <div class="right-sidebar">
            <div id="current">
                <div class="task"></div>
                <div class="timer">
                    <span id="time">00:00:00</span>
                    <button type="button" disabled class="btn-start">Start</button>
                    <button type="button" disabled class="btn-pause">Pause</button>
                    <button type="button" disabled class="btn-stop">Stop</button>
                </div>
            </div>
            <div id="tasks">
            </div>
        </div>
    </div>
*/})


module.exports = {
    showHomePage
}

