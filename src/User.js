const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayUserInfo = function ( user ) {
    console.log(user)
    $("#user_info").html(
        user_info.replace('%name%', user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase())
    );
}

var user_info = heredoc.strip(function() {/*
    <img src="assets/img/logo-small.png" alt="..." class="img-circle profile_img" style="width: 30px; height: 30px; padding: 0px; margin: 0px"> 
    <span class="user-name">%name%</span>
*/})

module.exports = {
    displayUserInfo
}

