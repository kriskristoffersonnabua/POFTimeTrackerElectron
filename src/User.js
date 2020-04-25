const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')
const remote = electron.remote
const user = remote.getGlobal('user')

const displayUserInfo = function ( ) {
    $("#user_info").html(
        user_info.replace('%name%', user['firstname'] + ' ' + user['lastname'])
    );
}


var user_info = heredoc.strip(function() {/*
    <div>
        <div><img src="user-icon"/></div>
        <div>%name%</div>
    </div>
*/})

module.exports = {
    displayUserInfo
}

