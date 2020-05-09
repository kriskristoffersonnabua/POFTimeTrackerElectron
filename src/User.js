const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayUserInfo = function ( user ) {
    console.log(user)
    $("#user_info").html(
        user_info.replace('%name%', user.first_name + ' ' + user.last_name)
    );
}

var user_info = heredoc.strip(function() {/*
    <div>
        <div><img alt="user-icon"/></div>
        <div>%name%</div>
    </div>
*/})

module.exports = {
    displayUserInfo
}

